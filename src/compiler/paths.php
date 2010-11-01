<?
	require_once("errorhandling.php");
	require_once("debug.php");

	/**
	 * Checks if an object has been created, yet, and if not,
	 * does so.
	 * @param $object Object, whose existence to check
	 * @returns A new array, if $object was null, the $object itself otherwise
	 */
	function initObject($object) {
		if($object == null) {
			return Array();
		}
		return $object;
	}

	/**
	 * This function does multiple path simplifications.
	 * This invovles:
	 * - Making the path absolute
	 * - Canceling a ../ with the preceding folder
	 * (a ../ before the root-slasg is deleted)
	 * - Deleting double'd slashes
	 * - Removing ./
	 * @param $curdir The current directory, which is used if $path is relative
	 * @param $path Path to sanitize. Is the first character is a slash, the path is
	 * considered to be absolute, relative otherwise
	 * @returns the simplified path
	 */
	function simplifyPath($curdir, $path) {
		$path = makeAbsolutePath($curdir, $path);
		$path = removeDoubleSlashes($path);
		$dirlist = path2dirlist($path);
		$dirlist = sanitizeDirList($dirlist);
		$path = dirlist2path($dirlist);
		$path = "./".$path;
		return $path;
	}

	/**
	 * Checks if a path is relative, and if so prepends
	 * the current directory path.
	 * @param $curdir The current directory path to which $path
	 * might be relative to.
	 * @param $path Path to absolutify
	 * @returns The absolute path
	 */
	function makeAbsolutePath($curdir, $path) {
		$path = trim($path);
		if($path[0] == '/') {
			debug("\"".$path."\" is absolute");
			return $path;
		}
		return $curdir."/".$path;
	}

	/**
	 * Replaces multiple, consequential occurences of a slash
	 * with a single slash
	 */
	function removeDoubleSlashes($path) {
		return preg_replace("!/+!", "/", $path);
	}

	/**
	 * Turns a path into a array of directory names
	 */
	function path2dirlist($path) {
		return explode("/", $path);
	}

	/**
	 * Turns array of directory names into a path
	 */
	function dirlist2path($path) {
		return implode("/", $path);
	}

	/**
	 * This function cancels ../ with the previous directory
	 * and removes single ./
	 * @param $dirlist Array of directory names
	 * @returns Sanitized directory list
	 */
	function sanitizeDirList($dirlist) {
		$ret = Array();
		foreach($dirlist as $dir) {
			switch($dir) {
			case ".":
				continue;
			case "..":
				array_pop($ret);
				// Since array_pop sets $ret = null
				// if the last element is popped, a
				// reinit may be required
				$ret = initObject($ret);
				break;
			default:
				array_push($ret, $dir);
				break;
			}
		}
		return $ret;
	}
?>
