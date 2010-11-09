<script>
	function refreshImage() {
		var image = document.getElementById("renderimage");
		var text = escape(document.getElementById("renderinput").value);
		image.src="textrenderer/textrenderer.php?text="+text;
	}
</script>
<center>
	<table border=0>
		<tr>
			<td align="center">
				<textarea id="renderinput" name="text" onKeyPress="refreshImage()" cols=50 rows=10></textarea>
			</td>
		</tr>
		<tr>
			<td align="center">
				<img id="renderimage" src="textrenderer/textrenderer.php" style="border: 1px solid green">
			</td>
		</tr>
		<tr>
			<td>
				<form action="<?=$PHP_SELF;?>" method="post">
					<input type="hidden" name="action" value="compile">
					<input type="submit" value="Refresh website">
				</form>
			</td>
		</tr>
	</table>
</center>
<a href="<?=$PHP_SELF;?>?action=logout">Logout</a>
