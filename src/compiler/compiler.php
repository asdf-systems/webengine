<?
	$ROOT = getcwd();

	require_once("directory_operations.php");
	require_once("errorhandling.php");

	$output = getOutputHandle();
	fwrite($output, compile($ROOT));
	fclose($output);

	/** Functions **/

	function getOutputHandle() {
		$filename = "object.js";
		$handle = dieOnError(fopen($filename, "w+"));
		return $handle;
	}

	function compile($path) {
		$object = Array();

		$content = getDirectoryContent($path);
		foreach($content as $file) {
			if (!$file["is_directory"]) {
				issueWarning("There's a txt file in \$ROOT, it will be ignored\n");
				continue;
			}
			$object[$file["name"]] = compileSubtree($path."/".$file["name"]);
		}
		return json_encode($object);
	}

	function compileSubtree($path) {
		$object = Array();
		$content = getDirectoryContent($path);

		foreach($content as $file) {
			if(!isRelevantFile($file))
				continue;
			$elem = parseElementIncludeFile($path."/".$rebuildFilename($file));

		}
		return $object;
	}
	
	function isRelevantFile($file) {
		return strtolower($file["name"]) != "layout" 
			&& strtolower($file["extension"] == "txt");
	}
?>
