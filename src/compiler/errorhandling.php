<?
	function DieOnError($op, $msg = "No details were given") {
		if($op === false) {
			print("\n\nDetails:\n");
			print($msg."\n\n");
			die("An error occurred\n");
		}
		return $op;
	}

	function issueWarning($str) {
		echo "Warning: ", $str;
	}
?>
