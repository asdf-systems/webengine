<html>
<body>
<form action="<?=$PHP_SELF;?>" method=post>
Password: <input type="password" name="pass"> <input type="submit" value="Kompilieren">
</form>
</body>
</html>
<?
if(md5($_POST["pass"] == "e93f092e3c2d5d2cf82cbfc1f13a37d3")) {
	$ROOT=getcwd()."/../";
	require_once("compiler.php");
}
?>
