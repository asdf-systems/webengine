<?
	require_once("errorhandling.php");
	require_once("debug.php");

	/**
	 * Read an INI file
	 * @param $file File to read
	 * @returns An hash map mapping from section names to hash maps mapping from key to value
	 */
	function readINIFile($file) {
		try {
			debug("Parsing generic INI file \"".$file."\"");
			$ret = Array();
			$data = @file($file);
			if($data === false) {
				return false;
			}
			$current_section = null;
			foreach($data as $line) {
				$line = stripComments($line);
				if(preg_match("/^\s*\[[^\]]+\]\s*$/", $line)) { // New Section
					$current_section = trim(preg_replace("/^\s*\[([^\]]+)\]\s*(#.+)?$/", "$1", $line));
					$ret[$current_section] = Array();
				} else if(preg_match("/^[^=]+=.+$/", $line)) { // Key-value pair
					if($current_section == null) {
						issueWarning("Stray data in \"".$file."\"\n");
						continue;
					}
					$split = explode("=", $line, 2);
					$ret[$current_section][trim($split[0])] = trim($split[1]);
				}
			}
			return $ret;
		} catch(Exception $e) {
			throw new Exception("Error while reading INI file \"".$file."\": ".$e->getMessage());
		}
	}

	/**
	 * Removes comments from the end of the line
	 * @returns the line without the comment section
	 */
	function stripComments($line) {
		if($line[0] == '#') {
			return "";
		} else {
			return $line;
		}
	}

	/**
	 * Checks, if a file is (likely to be) a INI file
	 */
	function isINIFile($file) {
		$data = dieOnError(file($file), "Could not read INI file \"".$file."\"");
		$line = $data[0];
		return preg_match("/^\s*\[[^\]]+\]\s*$/", $line);
	}

	/**
	 * Returns the name of the first INI section
	 */
	function getFirstINISection($ini) {
		reset($ini);
		return key($ini);
	}
?>
