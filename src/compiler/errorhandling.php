<?
	function DieOnError($op) {
		if(!$op) {
			die("An error occurred");
		}
		return $op;
	}

	function issueWarning($str) {
		echo "Warning: ", $str;
	}
?>
