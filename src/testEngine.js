function main(){

	var elem = jsonObject[0];
	init(elem);
}


function init(elem){

	// create Dom Object
	createDomObject("div", elem.id);	
	// check Type 
	switch(elem.type){
		case "Button":
			elem.domObject = new Button(elem.positionX, elem.positionY, ...);
			elem.domObject.registeOnMouseClickEvent(eventHandler);
		break;
		case "InputField":
			elem.domObject = new InputField(elem.positionX, elem.positionY, ...);
		break;
		case "TextField":
			elem.domObject = new Button(elem.positionX, elem.positionY, ...);
		break;
		case "PagePanel":
			elem.domObject = new Button(elem.positionX, elem.positionY, ...);
		break;		"
		case "RollOutPanel":
			elem.domObject = new Button(elem.positionX, elem.positionY, ...);
		break;
		case "Formular":
			elem.domObject = new Button(elem.positionX, elem.positionY, ...);
		break;
		case "GridPanel":
			elem.domObject = new Button(elem.positionX, elem.positionY, ...);
		break;
		case "Panel":
			// Do nothing
		break;
		case "default":
			alert("Unknown type:" + elem.type + "on Element: " + elem.id);
		break;
	}
	// call all Childs
	for(child in elem.childs){
		init(child);
	}
}

function createDomObject(type, id){
     //create HTML command
     var cmd = "<" + type + " id=\"" +id+ "\">";
     //var newObject = document.createElement(type);     // add DOM Object
	// \FIXME: check if its possible like this
     var domId = $("div[id=moveDiv]").append(cmd);
 	return domId;         
         
}
