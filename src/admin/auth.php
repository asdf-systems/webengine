<?
	function makeSession() {
		session_start();
	}

	function isAuthenticated() {
		return $_SESSION["password"] == "e93f092e3c2d5d2cf82cbfc1f13a37d3";
	}

	function login() {
		if(!isAuthenticated() && ($_POST["action"] == "auth")) {
			$password = $_POST["password"];
			session_register($password);
		}
	}
?>
