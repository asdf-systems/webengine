<?
	require_once("errorhandling.php");
	require_once("paths.php");

	/**
	 * Returns the stat()-value for all the files
	 * in the current folder
	 */
	function getDirectoryContent($path) {
		$content = Array();
		$dirhandle = dieOnError(opendir($path));

		while(($file = readdir($dirhandle)) !== false) {
			$fullpath = simplifyPath($path, $file);
			if(isFileOfInterest($fullpath)) {
				$data = getFileInformation($fullpath);
				array_push($content, $data);
			}
		}
		return $content;
	}

	/**
	 * Filter function to filter out files not
	 * relevant for creating the JSON tree
	 */
	function isFileOfInterest($file) {
		$filedata = getFileInformation($file);
		if($filedata["name"][0] == '.') {
			return false;
		}
		if(is_dir($file)) {
			return true;	
		}	

		if($filedata["extension"] != "txt") {
			return false;
		}
		return true;
	}

	/**
	 * Gets all available information on a file
	 */
	function getFileInformation($file) {
		$data = dieOnError(stat($file));
		return array_merge($data, getExtraData($file));
	}

	/**
	 * Adds the filename to the getFileInformation() result
	 * according to convention
	 */
	function getExtraData($file) {
		$filedata = Array();

		$filedata["path"] = dirname($file);

		$filename = basename($file);
		$extension_pos = strrpos($filename, ".");

		// Since $filedata["extension"=="" is our sign for "no extension"
		// we have to catch the special case when "." is the last
		// character of the filename
		if(!$extension_pos || $extension_pos == strlen($filename)-1) {
			$filedata["name"] = $filename;
			$filedata["extension"] = "";
		} else {
			$filedata["name"] = substr($filename, 0, $extension_pos);
			$filedata["extension"] = substr($filename, $extension_pos+1);
		}

		$filedata["is_directory"] = is_dir($file);

		return $filedata;
	}

	/**
	 * Rebuilds the filename according to convention
	 */
	function rebuildFilename($file) {
		if($file["extension"] == "") {
			return $file["name"];
		}
		return $file["name"].".".$file["extension"];
	}

?>
