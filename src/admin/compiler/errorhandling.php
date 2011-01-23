<?
	/**
	 * If the first argument is false, die with $msg.
	 * Otherweise, return the first argument.
	 * This function is supposed to be a wrapper around
	 * generic functions.
	 */
	function DieOnError($op, $msg = "No details were given") {
		if($op === false) {
			throw new Exception($msg."\n");
		}
		return $op;
	}

	function issueWarning($str) {
		echo "Warning: ", $str, "\n";
	}
?>
