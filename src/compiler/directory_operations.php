<?
	require_once("errorhandling.php");

	/**
	 * Returns the stat()-value for all the files
	 * in the current folder
	 */
	function getDirectoryContent($path) {
		$content = Array();
		$dirhandle = dieOnError(opendir($path));

		while(($file = readdir($dirhandle)) !== false) {
			$fullfile = $path."/".$file;
			if(isFileOfInterest($fullfile)) {
				$data = getFileInformation($fullfile);
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

	function getFileInformation($file) {
		$data = dieOnError(stat($file));
		return array_merge($data, getExtraData($file));
	}

	function getExtraData($file) {
		$filedata = Array();

		$filedata["path"] = dirname($file);

		$filename = basename($file);
		$extension_pos = strrpos($file, ".");

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

	function rebuildFilename($file) {
		if($file["extension"] == "") {
			return $file["name"];
		}
		return $file["name"].".".$file["extension"];
	}
?>
