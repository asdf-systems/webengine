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
	require_once("hacks.php");

	debug("Starting main routine");
	$result = compile("./");
	$result = makePositionsRelative($result);
	$json = my_json_encode($result)."\n";
	debug("Result:\n".$json);
	writeToFile(getOutputFileName(), $json);

	/** Functions **/

	/**
	 * @returns the filename of the outputfile
	 */
	function getOutputFileName() {
		return "object.js";
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
		$object = checkForSpecialAttributes($path, $object);
		createHTMLDummy($object);
		debug("Done.");
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
