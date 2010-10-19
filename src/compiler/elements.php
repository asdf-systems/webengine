<?
	require_once("errorhandling.php");
	require_once("debug.php");

	function parseElementIncludeFile($file) {
		debug("Parsing \"".$file."\"");
		$object = Array();
		$data = dieOnError(file($file));

		$type = extractType(array_shift($data));
		foreach($data as $line) {
			$keyval = explode("=", $line, 2);
			$keyval[0] = trim($keyval[0]);
			$keyval[1] = trim($keyval[1]);
			debug("Parsing line: \"".$keyval[0]."\" = \"".$keyval[1]."\"");

			switch($keyval[0]) {
				case "src":
					$elem = getElementByPath($keyval[1]);
					dieOnError(isOfType($elem, $type), "Element referenced in \"".$file."\" is not of declared type.");
					$object[$keyval[0]] = $elem;
					break;
				case "onClick":
					$object["eventhandlers"]["onClick"] = dieOnError(parseEventChain($keyval[1]),
						"onClick event chain is invalid in \"".$file."\"");
					break;
				case "onMouseOver":
					$object["eventhandlers"]["onMouseOver"] = dieOnError(parseEventChain($keyval[1]),
						"onMouseOver event chain is invalid in \"".$file."\"");
					break;
				case "onMouseOut":
					$object["eventhandlers"]["onMouseOut"] = dieOnError(parseEventChain($keyval[1]),
						"onMouseOut event chain is invalid in \"".$file."\"");
					break;
				default:
					$object[$keyval[0]] = $keyval[1];
			}
		}
		return $object;
	}

	function getElementByPath($path) {
		debug("Looking up element \"".$path."\"");
		$object = Array();
		return $object;
	}

	function parseEventChain($chain) {
		if(!isValidEventChain($chain)) {
			return false;
		}

		$object = Array();
		$splittable = preg_replace("/([^(]+\([^)]*\)),/", "${1};", $chain);
		$functions = explode(";", $splittable);

		foreach($functions as $funtion) {
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
		$object = Array();
		$fname = extractFunctionName($function);
		$parameters = extractParameters($function);
		$object["name"] = $fname;
		$object["parameters"] = $parameters;
		return $object;
	}

	function extractFunctionName($function) {
		return preg_replace("/(^[^(]+)\(/", "${1}", $function);
	}

	function extractParameters($function) {
		$paramlist = preg_replace("/^[^(]+\([^)]+\)/", "${1}", $function);
		return explode(",", $paramlist);

	}

	function extractType($type) {
		return preg_replace("/\[([^\]]+)\]/", "${1}", $type);
	}

	function isOfType($elem, $type) {
		return $elem["type"] == $type;
	}
?>
