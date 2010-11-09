<?
	switch(getAction()) {
	case "logout":
		killSession();
		require_once("logged_out_page.php");
		break;
	case "compile":
		echo "<pre>";
		require_once("compiler/compiler.php");
		echo "</pre>";
	default:
		require_once("default_page.php");
		break;
	}
?>
