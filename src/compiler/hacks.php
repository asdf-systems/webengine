<?
	require_once("directory_operations.php");
	require_once("errorhandling.php");

	/**
	 * Assumes all positions are given absolute, traverses
	 * the whole tree and converts to relative positions.
	 * Percent-positionings is ignored
	 */
	function makePositionsRelative($object, $pos_x = 0, $pos_y = 0) {
		$newx = 0;
		$newy = 0;
		debug("Positioning \"".$object["id"]."\" with x=".$pos_x." and y=".$pos_y);
		if(isPixelPosition($object["position_x"]) && isPixelPosition($object["position_y"])) {
			$extract_x = extractPosition($object["position_x"]);
			$object["position_x"] = sprintf("%dpx", $extract_x - $pos_x);
			$extract_y = extractPosition($object["position_y"]);
			$object["position_y"] = sprintf("%dpx", $extract_y - $pos_y);
			$newx = $pos_x + $extract_x;
			$newy = $pos_y + $extract_y;
		}
		if(count($object["children"]) > 0) {
			foreach($object["children"] as $child => $childobj) {
				$object["children"][$child] = makePositionsRelative($childobj, $newx, $newy);
			}
		}
		return $object;
	}

	function isPixelPosition($pos) {
		return preg_match("/^[0-9]+px$/", $pos);
	}

	function extractPosition($pos) {
		// I know... *cough cough*
		return str_replace("px", "", $pos);
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
		$object = fixActionFields($object);
		$object = fixSrcFields($path, $object);
		return $object;
	}

	/**
	 * Every field beginning with "action_" is presumed to have an
	 * event chain as a value. This functions parses those fields.
	 */
	function fixActionFields($object) {
		debug("Fixing up action_ fields");
		foreach($object as $key => $value) {
			if(preg_match("/^action_.+$/", $key)) {
				$object[$key] = dieOnError(parseEventChain($object[$key]), "Found invalid event chain in \"".$object["id"]."\"");
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
