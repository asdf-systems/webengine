<?
	require_once("errorhandling.php");
	require_once("debug.php");

	function readINIFile($file) {
		debug("Parsing generic INI file \"".$file."\"");
		$ret = Array();
		$data = dieOnError(file($file), "Could not read INI file \"".$file."\"");
		$current_section = null;
		foreach($data as $line) {
			if(preg_match("/^\s*\[[^\]]+\]\s*$/", $line)) {
				$current_section = trim(preg_replace("/^\s*\[([^\]]+)\]\s*$/", "$1", $line));
				$ret[$current_section] = Array();
			} else {
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

	function getFirstINISection($ini) {
		reset($ini);
		return key($ini);
	}
?>
