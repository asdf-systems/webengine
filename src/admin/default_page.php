<script>
	function refreshImage() {
		var image = document.getElementById("renderimage");
		var text = escape(document.getElementById("renderinput").value);
		var col = escape(document.getElementById("fcolor").value);
		var size = escape(document.getElementById("fsize").value);
		image.src="textrenderer/textrenderer.php?color="+col+"&size="+size+"&text="+text;
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
				Size: <input type="text" id="fsize" value="10"> Color: <input type="text" id="fcolor" value="#000000">
			</td>
		</tr>
		<tr>
			<td align="center">
				<img id="renderimage" src="textrenderer/textrenderer.php" style="border: 1px solid green">
			</td>
		</tr>
		<tr>
			<td>
				<input type="button" value="Refresh image" onClick="refreshImage()">
				<form action="<?=$PHP_SELF;?>" method="post">
					<input type="hidden" name="action" value="compile">
					<input type="submit" value="Refresh website">
					<input type="checkbox" name="debug" value="test"> Debug output
				</form>
			</td>
		</tr>
	</table>
</center>
<a href="<?=$PHP_SELF;?>?action=logout">Logout</a>
