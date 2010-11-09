<?
	switch(getAction()) {
	case "logout":
		killSession();
		require_once("logged_out_page.php");
		break;
	default:
		require_once("default_page.php");
		break;
	}
?>
