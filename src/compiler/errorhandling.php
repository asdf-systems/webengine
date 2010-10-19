<?
	function DieOnError($op, $msg = "No details were given") {
		if(!$op) {
			debug_print_backtrace();
			print("Details\n");
			print($msg."\n\n");
			die("An error occurred\n");
		}
		return $op;
	}

	function issueWarning($str) {
		echo "Warning: ", $str;
	}
?>
