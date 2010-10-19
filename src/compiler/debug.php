<?
	function repeat($str, $count) {
		for($i=0; $i < $count; $i++) {
			print($str);
		}
	}
	function debug($msg) {
		if(DEBUG) {
			$depth = count(debug_backtrace());
			repeat("  ", $depth);
			print($msg."\n");
		}
	}
?>

