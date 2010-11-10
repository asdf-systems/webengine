<?
	if(getAction() == "logout") {
		killSession();
		require_once("logged_out_page.php");
	} else {
		require_once("default_page.php");
	}
	if(getAction() == "compile") {
		if(isset($_POST["debug"]))
			$DEBUG = true;
		echo "<pre>";
		require_once("compiler/compiler.php");
		echo "</pre>";
	}
?>
