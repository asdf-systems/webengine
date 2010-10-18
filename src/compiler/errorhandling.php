<?
	function DieOnError($op) {
		if(!$op) {
			die("An error occurred");
		}
		return $op;
	}
?>
