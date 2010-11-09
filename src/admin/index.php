<?
	require_once("auth.php");

	$ROOT="../";
	$OUTPUT="../jsonObject.js";
	makeSession();
	login();

	if(isAuthenticated()) {
		echo "logged in";
	} else {
?>
		<form action="<?=$PHP_SELF;?>" method=post>
		<input type="hidden" name="action" value="auth">
		Password: <input type="password" name="password"> <input type="submit" value="Login">
		</form>
<?
	}
?>
