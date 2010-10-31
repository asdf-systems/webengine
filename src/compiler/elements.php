<?
	require_once("errorhandling.php");
	require_once("debug.php");

	function parseReferenceFile($file) {
		debug("Resolving reference from \"".$file."\"");
		$ini = readINIFile($file);
		$first_section_name = getFirstINISection($ini);
		debug("Reference to \"./".$first_section_name."\"");
		$elem = compile("./".$first_section_name);
		$elem = array_merge($elem, $ini[$first_section_name]);
		$elem["id"] = $file;
		debug("Done.");
		return $elem;
	}


	/**
	 * Parses a event chain.
	 * The function takes the bare string, splits it into the single
	 * function calls, splits the arguments and returns the chain array
	 * @param $chain EventChain string to parse
	 * @returns An Array with objects describing the function call
	 */
	function parseEventChain($chain) {
		debug("Parsing event chain \"".$chain."\"");
		if(!isValidEventChain($chain)) {
			return false;
		}

		$object = Array();
		$splittable = preg_replace("/([^(]+\([^)]*\)),/", "${1};", $chain);
		$functions = explode(";", $splittable);

		foreach($functions as $function) {
			array_push($object, parseFunction($function));
		}
		return $object;
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
	 * @returns Hash map describing the function call
	 */
	function parseFunction($function) {
		debug("Parsing single function call \"".$function."\"");
		$object = Array();
		$fname = extractFunctionName($function);
		$parameters = extractParameters($function);
		$object["name"] = $fname;
		$object["parameters"] = $parameters;
		return $object;
	}

	/**
	 * Extracts the function name from a function call string
	 */
	function extractFunctionName($function) {
		return preg_replace("/^([^(]+)\(.+$/", "$1", $function);
	}

	/**
	 * @returns an array with the parameters of a function call string
	 */
	function extractParameters($function) {
		$paramlist = preg_replace("/^[^(]+\(([^)]+)\)/", "$1", $function);
		debug("Parameters: \"".$paramlist."\"");
		return parseList($paramlist);

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
	function readTextFiles($list) {
		$texts = Array();
		foreach(parseList($list) as $file) {
			$data = file("./".$file);
			if(!$data) {
				return false;
			}
			array_push($texts, implode("\n", $data));
		}
		return $texts;
	}
?>
