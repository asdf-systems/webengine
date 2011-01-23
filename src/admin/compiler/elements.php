<?
	require_once("errorhandling.php");
	require_once("debug.php");
	require_once("paths.php");
	require_once("directory_operations.php");

	function parseReferenceFile($file) {
		try {
			debug("Resolving reference from \"".$file."\"");
			$ini = readINIFile($file);
			$first_section_name = getFirstINISection($ini);
			$refpath = simplifyPath(dirname($file), $first_section_name);
			$elem = $ini[$first_section_name];
			debug("Reference to \"".$refpath."\"");
			if(hasImageExtension($refpath)) {
				$elem["object"] = null;
				$elem["type"] = "Image";
				$elem["src"] = $refpath;
				$elem = checkForSpecialAttributes(dirname($file), $elem);
			} else {
				// compile() will call checkForSpecialAttributes
				// Calling it twice on an object will cause corrupted paths
				// and destroy EVERYTHING!
				// However, because some special attributes may be listed
				// in the reference file (and those still need proper handling)
				// checkForSpecialAttributes() is called upon the object
				// containing only the data from the reference file
				// and both objects will be merged *afterwards*
				$refelem = resolveReference($refpath);
				$elem = checkForSpecialAttributes(dirname($file), $elem);
				$elem = array_merge($refelem, $elem);
			}
			$elem["id"] = $file;
			debug("Done.");
			return $elem;
		} catch(Exception $e) {
			throw new Exception("Error while parsing reference file \"".$file."\": ".$e->getMessage());
		}
	}

	function resolveReference($file) {
		$data = getFileInformation($file);
		if($data["extension"] == "txt") { // It's another reference
			$elem = parseReferenceFile($file);
		} else {
			dieOnError(is_dir($file), "Found invalid reference in \"".$file."\"");
			$elem = compile($file);
		}
		return $elem;
	}

	function hasImageExtension($filename) {
		$extensions = Array("jpg", "jpeg", "gif", "png");
		$fileinfo = getFileInformation($filename);
		foreach($extensions as $extension) {
			if($fileinfo["extension"] == $extension) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Parses a event chain.
	 * The function takes the bare string, splits it into the single
	 * function calls, splits the arguments and returns the chain array
	 * @param $chain EventChain string to parse
	 * @param $path Path from where the functions are called, so to speak
	 * @returns An Array with objects describing the function call
	 */
	function parseEventChain($path, $chain) {
		try {
			debug("Parsing event chain \"".$chain."\"");
			if(!isValidEventChain($chain)) {
				return false;
			}

			$object = Array();
			$splittable = preg_replace("/([^(]+\([^)]*\)),/", "$1;", $chain);
			debug("Lexer returned \"".$splittable."\"");
			$functions = explode(";", $splittable);

			foreach($functions as $function) {
				array_push($object, parseFunction($path, $function));
			}
			return $object;
		} catch(Exception $e) {
			throw new Exception("Error while parsing eventchain \"".$chain."\": ".$e->getMessage());
		}
	}

	function isValidEventChain($chain) {
		$function_name = "([^(]+)";
		$parameter = "([^),]+)";
		$parameter_list = "(".$parameter."(,".$parameter.")*)";
		$single_function = "(".$function_name."\(".$parameter_list."?\)";
		$multiple_functions = "(".$single_function."(,".$single_function.")*)?";
		return preg_match("/".$multiple_function."/", $chain) ;
	}

	/**
	 * Take a single function call and returns an object
	 * describing function name and arguments seperately
	 * @param $function A single function call as a string
	 * @param $path Path from where this function is called
	 * @returns Hash map describing the function call
	 */
	function parseFunction($path, $function) {
		debug("Parsing single function call \"".$function."\"");
		$object = Array();
		$fname = extractFunctionName($function);
		$parameters = extractParameters($path, $function);

		$object["name"] = $fname;
		$object["parameters"] = $parameters;
		return $object;
	}

	/**
	 * Extracts the function name from a function call string
	 */
	function extractFunctionName($function) {
		$func = preg_replace("/^([^(]+)\(.+$/", "$1", $function);
		debug("Function: ".$func);
		return $func;
	}

	/**
	 * @returns an array with the parameters of a function call string
	 */
	function extractParameters($path, $function) {
		$paramlist = preg_replace("/^[^(]+\(([^)]+)\)/", "$1", $function);
		debug("Parameters: \"".$paramlist."\"");
		$list = parseList($paramlist);
		$list[0] = simplifyPath($path, $list[0]);
		$list = trimAll($list);
		return $list;

	}

	function trimAll($list) {
		for($i = 0; $i < count($list); $i++) {
			$list[$i] = trim($list[$i]);
		}
		return $list;
	}

	/**
	 * Parses a generic comma-separated list
	 */
	function parseList($list) {
		debug("Parsing generic list \"".$list."\"");
		return explode(",", $list);
	}

	/**
	 * Reads the contents of a array of files
	 * @param $list Array of file paths
	 * @returns Array with the contents of a file (files in the same order as in input)
	 */
	function readTextFiles($curdir, $list) {
		$texts = "";
		foreach(parseList($list) as $file) {
			debug("Reading textfile \"".$file."\"");
			$data = file_get_contents(simplifyPath($curdir, $file));
			if(!$data) {
				return false;
			}
			$texts .= str_replace("\r", "", $data);
		}
		return $texts;
	}
?>
