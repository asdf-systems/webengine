function main(){

	var elem = jsonObject.root[0];
    var body = $("body[id=mainBody]").get(0);
    init(elem, body);
}


function init(elem, parentObject){

	// create Dom Object
	//alert("parentObject: " + parentObject.id);

	// check Type 
	switch(elem.type){
		case "Button":
            elem.object = new Button(elem.id, parentObject, elem.positionX, elem.positionY, elem.image_normal,elem.image_active, elem.image_hover, elem.extra_css );
            //var params = new Array();
            //params[0] = "activate";
            //this.registerOnMouseClickEvent(this.specificAction,  params);
			//elem.object.registerOnMouseClickEvent(eventHandler);
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
    if(elem.childs != null){
        if(elem.object != null)
	       parentObject = elem.object.mDomTreeObject;
        for(i=0; i< elem.childs.length;  i++){
	   	   init(elem.childs[i], parentObject);
    	}
   	}
}

/**
 * Erstellt ein neues DomTreeObject und hängt es beim angegebenen Parent ein
 * \return: newDomTreeObject or null if error occurs
 * returned DomTreeObject saves parent in nextNode
 * \definition: HTML Objecttag: nextNode is reserved to save Wrapper Elements
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
   id = parent.mId;
   
    
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
        cmd = "<" + type + " id=\"" +id+ "\" class =\""+ css +" " +extra_css+ "\" src=\""+src+"\">";
     else
        cmd = "<" + type + " id=\"" +id+ "\" class =\""+ css +" "+ extra_css+"\">";
    
    $(parent.mParent).append(cmd);
    var domObject = $(type+"[id="+id+"]").get(0);
    domObject.nextNode = parent;
    
    return domObject;         
         
}
