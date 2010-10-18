<?
	function DieOnError($op) {
		if(!$op) {
			debug_print_backtrace();
			die("An error occurred\n");
		}
		return $op;
	}

	function issueWarning($str) {
		echo "Warning: ", $str;
	}
?>
