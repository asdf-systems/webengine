<?
	require_once("auth.php");

	$ROOT="../";
	$OUTPUT="../jsonObject.js";
	makeSession();
	login();

	require_once("header.php");
	if(isAuthenticated()) {
		require_once("mainpage.php");
	} else {
?>
		<form action="<?=$PHP_SELF;?>" method=post>
		<input type="hidden" name="action" value="auth">
		Password: <input type="password" name="password"> <input type="submit" value="Login">
		</form>
<?
	}
	require_once("footer.php");
?>
