<?
	$ROOT = getcwd()."/../../testCases/testCaseParser";
	define(DEBUG, true);
	require_once("directory_operations.php");
	require_once("errorhandling.php");
	require_once("elements.php");

	debug("Starting main routine");
	$output = dieOnError(getOutputHandle(), "Could not open outputfie\n");
	$result = json_encode(compile($ROOT))."\n";
	debug("Result:\n".$result);
	fwrite($output, $result);
	fclose($output);

	/** Functions **/

	function getOutputHandle() {
		$filename = "object.js";
		$handle = dieOnError(fopen($filename, "w+"));
		return $handle;
	}

	function compile($path) {
		debug("Compiling \"".$path."\"");
		$object = getDefaultObject($path);

		$content = getDirectoryContent($path);
		foreach($content as $file) {
			$fullpath = $path."/".rebuildFilename($file);
			if(isRelevantFile($file)) {
				$elem = parseElementIncludeFile($fullpath);
				array_push($object["children"], $elem);
			} else {
				debug("Dismissed \"".$fullpath."\"");
			}
		}
		debug("Done.");
		return $object;
	}

	function getDefaultObject($id) {
		$object = Array();
		$object["id"] = $id;
		$object["type"] = "Panel";
		$object["object"] = null;
		$object["children"] = Array();
		return $object;
	}

	function isRelevantFile($file) {
		return strtolower($file["name"]) != "layout" 
			&& strtolower($file["extension"] == "txt");
	}

	function fixPath($curdir, $path) {
		global $ROOT;
		if($path[0] == "/") {
			return $ROOT."/".$path;
		}
		return $curdir."/".$path;
	}
?>
