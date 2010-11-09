<?
	function makeSession() {
		session_start();
	}

	function killSession() {
		session_destroy();
	}

	function isAuthenticated() {
		return $_SESSION["password"] == "e93f092e3c2d5d2cf82cbfc1f13a37d3";
	}

	function login() {
		if(!isAuthenticated() && (getAction() == "auth")) {
			$_SESSION["password"] = md5($_POST["password"]);
		}
	}

	function getAction() {
		if(isset($_POST["action"])) {
			return $_POST["action"];
		}
		return $_GET["action"];
	}
?>
