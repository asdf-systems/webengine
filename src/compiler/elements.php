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

	function parseFunction($function) {
		debug("Parsing single function call \"".$function."\"");
		$object = Array();
		$fname = extractFunctionName($function);
		$parameters = extractParameters($function);
		$object["name"] = $fname;
		$object["parameters"] = $parameters;
		return $object;
	}

	function extractFunctionName($function) {
		return preg_replace("/^([^(]+)\(.+$/", "$1", $function);
	}

	function extractParameters($function) {
		$paramlist = preg_replace("/^[^(]+\(([^)]+)\)/", "$1", $function);
		debug("Parameters: \"".$paramlist."\"");
		return parseList($paramlist);

	}

	function parseList($list) {
		debug("Parsing generic list \"".$list."\"");
		return explode(",", $list);
	}

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
