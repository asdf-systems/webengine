<?
	require_once("directory_operations.php");
	require_once("errorhandling.php");

	/**
	 * Assumes all positions are given absolute, traverses
	 * the whole tree and converts to relative positions.
	 * @definition Percent-positionings are ignored
	 */
	function makePositionsRelative($object, $pos_x = 0, $pos_y = 0) {
		$newx = 0;
		$newy = 0;
		debug("Positioning \"".$object["id"]."\", parent coords: x=".$pos_x." and y=".$pos_y);
		debug("Original positions: x=".$object["position_x"]." and y=".$object["position_y"]);
		if(isPixelPosition($object["position_x"]) && isPixelPosition($object["position_y"])) {
			$extract_x = extractPosition($object["id"], $object["position_x"]);
			$object["position_x"] = sprintf("%dpx", $extract_x - $pos_x);
			$extract_y = extractPosition($object["id"], $object["position_y"]);
			$object["position_y"] = sprintf("%dpx", $extract_y - $pos_y);
			$newx = $extract_x;
			$newy = $extract_y;
		}
		if(count($object["children"]) > 0) {
			foreach($object["children"] as $child => $childobj) {
				$object["children"][$child] = makePositionsRelative($childobj, $newx, $newy);
			}
		}
		debug("New positions: x=".$object["position_x"]." and y=".$object["position_y"]);
		return $object;
	}

	function isPixelPosition($pos) {
		return preg_match("/px$/", $pos);
	}

	function extractPosition($path, $pos) {
		// I know... *cough cough*
		$pos = str_replace("px", "", $pos);
		if(trim($pos) == "") {
			issueWarning("Empty positions found in \"".$path."\"");
			$pos = "0";
		}
		return $pos;

	}

	/**
	 * PHP's json_encode() has a bug which escapse
	 * slashes - which is wrong. This is handled here
	 * (poorly, though).
	 * @param $obj Object to convert into a json string
	 * @returns json string describing $obj
	 */
	function my_json_encode($obj) {
		$str = json_encode($obj);
		$str = str_replace("\\/", "/", $str);
		return $str;
	}

	/**
	 * Here, an object is being checked for special attributes,
	 * which need special handling, like EventHandler definitions etc
	 * @definition Every field starting with "action_" assumend to have
	 * a parsable event chain string as a value.
	 * @definition Every fiel ending with "_src" is assumed to reference
	 * some file and the path will be saved in it's absolute form.
	 * @param $object Object to investigate
	 * @param $path Path to which references might be relative to.
	 * @returns The object, where special attributes have been handled.
	 */
	function checkForSpecialAttributes($path, $object) {
		debug("Checking for special attributes");

		if(array_key_exists("pages", $object)) {
			$object["pages"] = dieOnError(parseList($object["pages"]), "Could not parse pages list in \"".$object["id"]."\"");
		}
		if(array_key_exists("texts", $object)) {
			$object["texts"] = dieOnError(readTextFiles($path, $object["texts"]), "Could not include texts in \"".$object["id"]."\"");
		}
		$object = fixActionFields($path, $object);
		$object = fixSrcFields($path, $object);
		$object = sanitizeBooleans($object);
		return $object;
	}

	/**
	 * Checks, if a value describes a boolean and replaces it
	 * with its proper boolean value.
	 * I.e:
	 * "On, 1, True, Yes" => "true"
	 * "Off, 0, False, No" => false"
	 * The mapping is done case-insensitive
	 */
	function sanitizeBooleans($object) {
		foreach($object as $key => $value) {
			if(hasBooleanStringValue($value, true)) {
				$object[$key] = true;
			} else if(hasBooleanStringValue($value, false)) {
				$object[$key] = false;
			}
		}
		return $object;
	}

	/**
	 * Checks, if $string can be interpreted as a bool and has the value $val.
	 * @see santizeBooleans
	 */
	function hasBooleanStringValue($string, $val) {
		$stringbools = Array(true => Array("on", "1", "true", "yes"),
			false => Array("off", "0", "false", "no"));
		foreach($stringbools[$val] as $bool) {
			if(strtolower($string) == $bool) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Every field beginning with "action_" is presumed to have an
	 * event chain as a value. This functions parses those fields.
	 */
	function fixActionFields($path, $object) {
		debug("Fixing up action_* fields");
		foreach($object as $key => $value) {
			if(preg_match("/^action_.+$/", $key)) {
				$object[$key] = dieOnError(parseEventChain($path, $object[$key]), "Found invalid event chain in \"".$object["id"]."\"");
			}
		}
		return $object;
	}

	/**
	 * Every field ending with "_src" is presumed to reference a
	 * for which an absolute path is required. This function handles
	 * these fields.
	 * @param $path Path to which the references are relative to
	 * @param $object Object to fix up
	 */
	function fixSrcFields($path, $object) {
		debug("Fixing up *_src fields");
		foreach($object as $key => $value) {
			if(preg_match("/^.+_src$/", $key)) {
				$object[$key] = dieOnError(simplifyPath($path, $value), "Couldn't resolve reference to src file in \"".$object["id"]."\"");
			}
		}
		return $object;
	}

	/**
	 * Creates an index.html from a template in the panel's folder
	 * and fills it with the textual content.
	 * @definition Panels which are referenced (and therefore don't
	 * have a folder on their own) are ignored.
	 */
	function createHTMLDummy($object) {
		debug("Creating html dummy for \"".$object["id"]."\"");
		$data = readTemplate();
		$data = replacePlaceholder($data, "text", $object["texts"]);
		$data = replacePlaceholder($data, "id", $object["id"]);
		writeToFile(simplifyPath($object["id"], "index.html"), $data);
	}

	/**
	 * @returns the content of "index_template.html"
	 */
	function readTemplate() {
		debug("Reading template file");
		static $data = null;
		if($data == null) {
			$data = dieOnError(file("index_template.html"), "Could not read template file");
			$data = implode("", $data);
		}
		return $data;
	}

	/**
	 * Looks for placeholders like "{placeholder_name}" in $data
	 * to replace it with val.
	 * @param $data Data to look through
	 * @param $name Name of the placeholder
	 * @param $val Value to replace placeholder with. This can be an array.
	 * If this is the case, the array's elements will be concatenated.
	 * @return Replaced $data
	 */
	function replacePlaceholder($data, $name, $val) {
		// If $val is an array, turn it into a string.
		if(is_array($val)) {
			$val = implode(" ", $val);
		}
		return str_replace("{".$name."}", $val, $data);
	}
?>
