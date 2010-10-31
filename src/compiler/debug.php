<?
	/**
	 * Concatenates a string a given number of times
	 * @param $str String to "multiply"
	 * @param $count Number of concatenations
	 * @param $str*$count
	 */
	function repeat($str, $count) {
		$ret = "";
		for($i=0; $i < $count; $i++) {
			$ret .= $str;
		}
		return $ret;
	}

	/**
	 * Prints a debug message to the screen.
	 * It automatically indents the message corresponding to call depth
	 * and prepends file- and functionname, as well as line number
	 * @param $msg Message to print
	 */
	function debug($msg) {
		if(DEBUG) {
			$stack = debug_backtrace();
			$depth = count($stack);
			printf("%20s:%4d %30s: ", basename($stack[0]["file"]), $stack[0]["line"], $stack[1]["function"]);
			print(repeat("  ", $depth));
			print($msg."\n");
		}
	}
?>

