<?
	$ROOT = getcwd()."/../../testCases/testCaseParser";
	chdir($ROOT);
	define(DEBUG, true);
	require_once("directory_operations.php");
	require_once("errorhandling.php");
	require_once("elements.php");
	require_once("ini.php");

	debug("Starting main routine");
	$output = dieOnError(getOutputHandle(), "Could not open outputfie\n");
	$result = json_encode(compile("./"))."\n";
	debug("Result:\n".$result);
	fwrite($output, $result);
	fclose($output);

	/** Functions **/

	function getOutputHandle() {
		$filename = "object.js";
		return fopen($filename, "w+");
	}

	function compile($path) {
		debug("Compiling \"".$path."\"");
		$object = getDefaultObject($path);
		$compiled = readLayoutFile($path."/layout.txt");
		$object = array_merge($object, $compiled);
		$object["children"] = getChildren($path);
		debug("Done.");
		$object = checkForSpecialAttributes($object);
		return $object;
	}

	function checkForSpecialAttributes($object) {
		debug("Checking for special attributes");

		if(array_key_exists("action_click", $object)) {
			$object["action_click"] = dieOnError(parseEventChain($object["action_click"]), "Found invalid event chain in \"".$object["id"]."\"");
		}
		if(array_key_exists("action_mouseOut", $object)) {
			$object["action_click"] = dieOnError(parseEventChain($object["action_mouseOut"]), "Found invalid event chain in \"".$object["id"]."\"");
		}
		if(array_key_exists("action_mouseOver", $object)) {
			$object["action_click"] = dieOnError(parseEventChain($object["action_mouseOver"]), "Found invalid event chain in \"".$object["id"]."\"");
		}
		if(array_key_exists("pages", $object)) {
			$object["pages"] = dieOnError(parseList($object["pages"]));
		}
		return $object;
	}

	function readLayoutFile($file) {
		debug("Reading layout file \"".$file."\"");
		$ini = readINIFile($file);
		$first_section_name = getFirstINISection($ini);
		debug("Declared type is \"".$first_section_name."\"");
		$ini[$first_section_name]["type"] = $first_section_name;
		return $ini[$first_section_name];
	}

	function getChildren($path) {
		$object = null;
		$content = getDirectoryContent($path);
		foreach($content as $file) {
			$fullpath = $path."/".rebuildFilename($file);
			if(is_dir($fullpath)) {
				$object = initObject($object);
				$elem = compile($fullpath);
				$object[basename($fullpath)] = $elem;
			} else if(isRelevantFile($file)) {
				$object = initObject($object);
				$elem = parseReferenceFile($fullpath);
				$elem = checkForSpecialAttributes($elem);
				$object[basename($fullpath)] = $elem;
			} else {
				debug("Dismissed \"".$fullpath."\"");
			}
		}
		return $object;
	}

	function initObject($object) {
		if($object == null) {
			return Array();
		}
		return $object;
	}

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

	function isRelevantFile($file) {
		return (strtolower($file["name"]) != "layout"
			&& strtolower($file["extension"] == "txt"));
	}
?>
