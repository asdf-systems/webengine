<?
	$ROOT = getcwd();

	require_once("directory_operations.php");
	require_once("errorhandling.php");

	$output = getOutputHandle();
	fwrite($output, compile($ROOT));
	fclose($output);

	function getOutputHandle() {
		$filename = "object.js";
		$handle = dieOnError(fopen($filename, "w+"));
		return $handle;
	}

	function compile($path) {
		$content = getDirectoryContent($path);
	}

?>
