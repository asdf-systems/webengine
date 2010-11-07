<?
	$fontfile = "./testfont.ttf";

	$text = getText();
	$size = getFontSize();
	$color = getColor();
	$image = renderText($fontfile, $size, $color, $text);
	output($image);

	/**
	 * Renders $text on a transparent background.
	 * The image size is calculated to exactly fit the text.
	 * @param $fontfile Path to the ttf file
	 * @param $size Font size
	 * @param $color Array with red, green and blue value, respectively
	 * @param $text Text to render
	 * @returns Returns the image handle with the rendered text
	 */
	function renderText($fontfile, $size, $color, $text) {
		$dimensions = getRenderedSize($text, $size, $fontfile);
		$image = createImage($dimensions[0], $dimensions[1]);

		$bgcolor = imagecolorallocatealpha($image, 0, 0, 0, 127);
		$textcolor = imagecolorallocate($image, $color[0], $color[1], $color[2]);
		imagefill($image, 0, 0, $bgcolor);
		imagettftext($image, $size, 0, 0, $size, $textcolor, $fontfile, $text);
		return $image;
	}

	/**
	 * Outputs the image according to mode
	 */
	function output($image) {
		if(isSaveToFileMode()) {
			imagepng($image, $_GET["output"], 9);
		} else {
			header('Content-type: image/png');
			imagepng($image);
		}
	}

	/**
	 * \TODO Use saner password checking
	 */
	function isSaveToFileMode() {
		return $_GET["mode"] == "file" && md5($_GET["password"]) == "e93f092e3c2d5d2cf82cbfc1f13a37d3";
	}

	/**
	 * Calculates the width and height of $text,
	 * if rendered with $font.
	 * @param $text Text to render
	 * @param $font Font (TTF file) to use
	 * @param $size Font size (can be a float)
	 * @definition This renderer will NOT word wrap. The
	 * image will grow indefinitely, until the text fits.
	 * @returns an array with the width in [0], and height in [1]
	 */
	function getRenderedSize($text, $size, $font) {
		$bbox = imagettfbbox($size, 0, $font, $text);
		// Width = (Lower right corner, X value) - (Lower left corner, X value)
		$width = $bbox[2] - $bbox[0];
		// Height = (Lower right corner, Y value) - (Upper right corner, Y value)
		$height = $bbox[3] - $bbox[5];
		return Array($width, $height);
	}

	/**
	 * Creates an image with transparency.
	 */
	function createImage($w, $h) {
		$image = imagecreatetruecolor($w, $h);
		imagesavealpha($image, true);
		imagealphablending($image, true);
		return $image;
	}

	/**
	 * Returns the color of the text
	 */
	function getColor() {
		return Array(255, 0, 0);
	}

	/**
	 * Returns the text to render.
	 * @definition The text is passed via GET. If this is
	 * not the case, a default text will be used.
	 */
	function getText() {
		if(!isset($_GET["text"])) {
			return "No text given";
		}
		return $_GET["text"];
	}

	/**
	 * Returns the font size to use. Right now
	 * it returns a fixed value.
	 */
	function getFontSize() {
		return 10;
	}
?>
