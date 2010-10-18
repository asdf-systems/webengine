<?
	require_once("errorhandling.php");

	function parseElementIncludeFile($file) {
		$object = Array();
		$data = dieOnError(file($file));

		foreach($data as $line) {
			$keyval = explode("=", $line, 2);
			$keyval[0] = trim($keyval[0]);
			$keyval[1] = trim($keyval[1]);

			switch($keyval[0]) {
				case "src":
					break;
				case "onClick":
					$object["eventhandlers"]["onClick"] = parseEventChain($keyval[1]);
					break;
				case "onMouseOver":
					$object["eventhandlers"]["onMouseOver"] = parseEventChain($keyval[1]);
					break;
				case "onMouseOut":
					$object["eventhandlers"]["onMouseOut"] = parseEventChain($keyval[1]);
					break;
				default:
					$object[$keyval[0]] = $keyval[1];
			}
		}
		return $object;
	}

	function parseEventChain($chain) {
		// TODO
		return Array();
	}
?
