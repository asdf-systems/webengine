<?
	if(!isset($ROOT))
		$ROOT = getcwd()."/../../testCases/testCaseParser";
	chdir($ROOT);
	define(DEBUG, true);
	require_once("directory_operations.php");
	require_once("errorhandling.php");
	require_once("elements.php");
	require_once("ini.php");
	require_once("paths.php");

	debug("Starting main routine");
	$output = dieOnError(getOutputHandle(), "Could not open outputfie\n");
	$result = compile("./");
	$result = makePositionsRelative($result);
	$json = my_json_encode($result)."\n";
	debug("Result:\n".$json);
	fwrite($output, $json);
	fclose($output);

	/** Functions **/

	/**
	 * PHP's json_encode() has a bug which escapse
	 * slashes - which is wrong. This is handled here
	 * (poorly, though).
	 * @param $obj Object to convert into a json string
	 * @returns json string describing $obj
	 */
	function my_json_encode($obj) {
		$str = json_encode($obj);
		$str = str_replace("\\/", "/", $str);
		return $str;
	}

	/**
	 * Returns the handle to file, to which the output,
	 * i.e. the json tree is supposed to be written.
	 * @returns File handle or null on error
	 */
	function getOutputHandle() {
		$filename = "object.js";
		return fopen($filename, "w+");
	}

	/**
	 * Assumes all positions are given absolute, traverses
	 * the whole tree and converts to relative positions.
	 * Percent-positionings is ignored
	 */
	function makePositionsRelative($object, $pos_x = 0, $pos_y = 0) {
		$newx = 0;
		$newy = 0;
		debug("Positioning \"".$object["id"]."\" with x=".$pos_x." and y=".$pos_y);
		if(isPixelPosition($object["position_x"]) && isPixelPosition($object["position_y"])) {
			$extract_x = extractPosition($object["position_x"]);
			$object["position_x"] = sprintf("%dpx", $extract_x - $pos_x);
			$extract_y = extractPosition($object["position_y"]);
			$object["position_y"] = sprintf("%dpx", $extract_y - $pos_y);
			$newx = $pos_x + $extract_x;
			$newy = $pos_y + $extract_y;
		}
		if(count($object["children"]) > 0) {
			foreach($object["children"] as $child => $childobj) {
				$object["children"][$child] = makePositionsRelative($childobj, $newx, $newy);
			}
		}
		return $object;
	}

	function isPixelPosition($pos) {
		return preg_match("/^[0-9]+px$/", $pos);
	}

	function extractPosition($pos) {
		// I know... *cough cough*
		return str_replace("px", "", $pos);
	}

	/**
	 * Takes the path to a directory and
	 * recursively compiles it into a hash map, which
	 * keys correspond to the json.
	 * @param $path Path to traverse
	 * @returns The resulting hash map
	 */
	function compile($path) {
		debug("Compiling \"".$path."\"");
		$object = getDefaultObject($path);
		$compiled = readLayoutFile(simplifyPath($path, "layout.txt"));
		// With array_merge is left-associative
		// so for any duplicate keys, the value in
		// $compiled will be seen in the result.
		$object = array_merge($object, $compiled);
		$object["children"] = getChildren($path);
		debug("Done.");
		$object = checkForSpecialAttributes($path, $object);
		return $object;
	}

	/**
	 * Here, an object is being checked for special attributes,
	 * which need special handling, like EventHandler definitions etc
	 * @param $object Object to investigate
	 * @param $path Path to which references might be relative to.
	 * @returns The object, where special attributes have been handled.
	 */
	function checkForSpecialAttributes($path, $object) {
		debug("Checking for special attributes");

		if(array_key_exists("pages", $object)) {
			$object["pages"] = dieOnError(parseList($object["pages"]), "Could not parse pages list in \"".$object["id"]."\"");
		}
		if(array_key_exists("texts", $object)) {
			$object["texts"] = dieOnError(readTextFiles($path, $object["texts"]), "Could not include texts in \"".$object["id"]."\"");
		}
		$object = fixActionFields($object);
		$object = fixSrcFields($path, $object);
		return $object;
	}

	/**
	 * Every field beginning with "action_" is presumed to have an
	 * event chain as a value. This functions parses those fields.
	 */
	function fixActionFields($object) {
		foreach($object as $key => $value) {
			if(preg_match("/^action_.+$/", $key)) {
				$object[$key] = dieOnError(parseEventChain($object[$key]), "Found invalid event chain in \"".$object["id"]."\"");
			}
		}
		return $object;
	}

	/**
	 * Every field ending with "_src" is presumed to reference a
	 * for which an absolute path is required. This function handles
	 * these fields.
	 * @param $path Path to which the references are relative to
	 * @param $object Object to fix up
	 */
	function fixSrcFields($path, $object) {
		foreach($object as $key => $value) {
			if(preg_match("/^.+_src$/", $key)) {
				$object[$key] = dieOnError(simplifyPath($path, $value), "Couldn't resolve reference to src file in \"".$object["id"]."\"");
			}
		}
		return $object;
	}

	/**
	 * Reads a file like a layout.txt file.
	 * That means, it reads it like a common INI file,
	 * only takes the first section and uses the section name
	 * as the value for the "type" key.
	 * @param $file to parse
	 * @returns Hash map with the section's key=value pairs
	 */
	function readLayoutFile($file) {
		debug("Reading layout file \"".$file."\"");
		$ini = readINIFile($file);
		$first_section_name = getFirstINISection($ini);
		debug("Declared type is \"".$first_section_name."\"");
		$ini[$first_section_name]["type"] = $first_section_name;
		return $ini[$first_section_name];
	}

	/**
	 * Traverses a directory and looks for reference files
	 * and folders, which describe children of the current panel.
	 * @param $path Path to traverese
	 * @returns the Hash map which is supposed to be the current
	 * panels children map.
	 */
	function getChildren($path) {
		debug("Looking for children of \"".$path."\"");
		$object = null;
		$content = getDirectoryContent($path);
		foreach($content as $file) {
			$fullpath = simplifyPath($path, rebuildFilename($file));
			if(is_dir($fullpath) && $file[0] != '.') { // Subpanel
				$object = initObject($object);
				$elem = compile($fullpath);
				$object[basename($fullpath)] = $elem;
			} else if(isRelevantChildFile($file) && isINIFile($fullpath)) { // Reference file
				$object = initObject($object);
				$elem = parseReferenceFile($fullpath);
				$object[basename($fullpath)] = $elem;
			} else { // Stray file
				debug("Dismissed \"".$fullpath."\"");
			}
		}
		return $object;
	}

	/**
	 * @returns Object with the default values of a panel
	 */
	function getDefaultObject($id) {
		$object = Array();
		$object["id"] = $id;
		$object["type"] = "Panel";
		$object["object"] = null;
		$object["position_x"] = "0px";
		$object["position_y"] = "0px";
		$object["width"] = "";
		$object["height"] = "";
		$object["children"] = Array();
		return $object;
	}

	/**
	 * Checks if a file is relevant for a panel's children
	 * @param $file File to check
	 * @returns Boolean
	 */ 
	function isRelevantChildFile($file) {
		return (strtolower($file["name"]) != "layout"
			&& strtolower($file["extension"] == "txt"));
	}
?>
