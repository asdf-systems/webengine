<?
	$ROOT = getcwd();
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
		$object = Array();

		$content = getDirectoryContent($path);
		foreach($content as $file) {
			$fullpath = $path."/".rebuildFilename($file);
			if ($file["is_directory"]) {
				$object[$file["name"]] = compile($fullpath);
			} else if(isRelevantFile($file)) {
				$elem = parseElementIncludeFile($fullpath);
			}
		}
		return $object;
	}

	function isRelevantFile($file) {
		return strtolower($file["name"]) != "layout" 
			&& strtolower($file["extension"] == "txt");
	}
?>
