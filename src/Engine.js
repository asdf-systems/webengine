function main(){

	var elem = jsonObject.root[0];
	init(elem);
}


function init(elem){

	// create Dom Object
	alert(elem.type);
    var body = $("body[id=mainBofy]").get(0);
	// check Type 
	switch(elem.type){
		case "Button":
			alert("Button");
            elem.object = new Button(elem.id, elem.positionX, elem.positionY, elem.image_normal,elem.image_activ, image_hover, extra_css );
			elem.object.registerOnMouseClickEvent(eventHandler);
		break;
		/*case "InputField":
			elem.domObject = new InputField(elem.positionX, elem.positionY);
		break;
		case "TextField":
			elem.domObject = new Button(elem.positionX, elem.positionY);
		break;
		case "PagePanel":
			elem.domObject = new Button(elem.positionX, elem.positionY);
		break;		"
		case "RollOutPanel":
			elem.domObject = new Button(elem.positionX, elem.positionY);
		break;
		case "Formular":
			elem.domObject = new Button(elem.positionX, elem.positionY);
		break;
		case "GridPanel":
			elem.domObject = new Button(elem.positionX, elem.positionY);
		break;
		case "Panel":
			// Do nothing
		break;*/
		case "default":
			alert("Unknown type:" + elem.type + "on Element: " + elem.id);
		break;
	}
	// call all Childs
	for(child in elem.childs){
		init(child);
	}
}

/**
 * Erstellt ein neues DomTreeObject und hängt es beim angegebenen Parent ein
 * \return: newDomTreeObject or null if error occurs
 * \param:  parent      Element Element where the new Element should add to
 * \param:  id          string  id of the ne HTML Object
 * \param:  type        string  HTML-Type of the new DomTreeObject. Default: div
 * \param:  css         string  normal css class. Default: "NOTSET"
 * \param:  extra_css   string  secoond css class. Default: "EXTRA_NOTSET"
 * \param:  src         string  for HTML types that need a sourcePath like img. Default: ""
 */
function createDomObject(parent, id, type, css, extra_css, src){
    // check Params
    if(parent == null){
        if(globals.debug > 0)
            alert("Error Creating Dom Object - no parent set!");
        return null;
    }
    if(id == null){
        if(globals.debug > 0)
            alert("Error Creating Dom Object - no parent set!");
        return null;
    }
    
    if(type == null)
        type = "div";
        
    if(css == null)
        css = "NOTSET";
    
    if(extra_css == null)
        extra_css == "EXTRA_NOTSET";
    
    if(src == null)
        src = "";
        
     //create HTML command
     var cmd;
     if(type == "img")
        cmd = "<" + type + " id=\"" +id+ "\ class =\""+ css +"\" class=\""+extra_css+"\ src=\""+src+"\">";
     else
        cmd = "<" + type + " id=\"" +id+ "\ class =\""+ css +"\" class=\""+extra_css+"\">";
     // \FIXME: check if its possible like this
     var domId = $(parent.mDomTreeObject).append(cmd);
 	return domId;         
         
}
