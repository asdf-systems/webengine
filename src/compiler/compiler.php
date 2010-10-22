<?
	$ROOT = getcwd()."/../../testCases/testCaseParser";
	cd($ROOT);
	define(DEBUG, true);
	require_once("directory_operations.php");
	require_once("errorhandling.php");
	require_once("elements.php");
	require_once("init.php");

	debug("Starting main routine");
	$output = dieOnError(getOutputHandle(), "Could not open outputfie\n");
	$result = json_encode(compile("/"))."\n";
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
		$object = getDefaultObject($path)
		readLayoutFile($path."/layout.txt", $object);
		$object["children"] = getChildren($path);
		debug("Done.");
		return $object;
	}

	function readLayoutFile($file, $object) {
		debug("Reading layout file \"".$file."\"")
		$ini = readINIFile($file) ;
		reset($ini);
		$first_section_name = key($ini);
		debug("Declared type is \"".$first_section_name."\"")
		$object["type"] = $first_section
		array_merge($object, $ini[0]);
	}

	function getChildren($path) {
		$content = getDirectoryContent($path);
		foreach($content as $file) {
			$fullpath = $path."/".rebuildFilename($file);
			if(is_dir($file)) {
				$elem = compile($fullpath);
				array_push($object["children"], $elem);
			} else if(isRelevantFile($file)) {
				$elem = parseReferenceFile($fullpath);
			} else {
				debug("Dismissed \"".$fullpath."\"");
			}
		}
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
