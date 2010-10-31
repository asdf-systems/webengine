<?
	require_once("errorhandling.php");
	require_once("debug.php");

	/**
	 * Read an INI file
	 * @param $file File to read
	 * @returns An hash map mapping from section names to hash maps mapping from key to value
	 */
	function readINIFile($file) {
		debug("Parsing generic INI file \"".$file."\"");
		$ret = Array();
		$data = dieOnError(file($file), "Could not read INI file \"".$file."\"");
		$current_section = null;
		foreach($data as $line) {
			if(preg_match("/^\s*\[[^\]]+\]\s*$/", $line)) { // New Section
				$current_section = trim(preg_replace("/^\s*\[([^\]]+)\]\s*$/", "$1", $line));
				$ret[$current_section] = Array();
			} else { // Key-value pair
				if($current_section == null) {
					issueWarning("Stray data in \"".$file."\"\n");
					continue;
				}
				$split = explode("=", $line, 2);
				$ret[$current_section][trim($split[0])] = trim($split[1]);
			}
		}
		return $ret;
	}

	/**
	 * Returns the name of the first INI section
	 */
	function getFirstINISection($ini) {
		reset($ini);
		return key($ini);
	}
?>
