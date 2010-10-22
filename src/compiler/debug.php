<?
	function repeat($str, $count) {
		for($i=0; $i < $count; $i++) {
			print($str);
		}
	}
	function debug($msg) {
		if(DEBUG) {
			$stack = debug_backtrace();
			$depth = count($stack);
			printf("%20s:%4d %30s: ", basename($stack[0]["file"]), $stack[0]["line"], $stack[1]["function"]);
			repeat("  ", $depth);
			print($msg."\n");
		}
	}
?>

