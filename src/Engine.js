/**
 * Engine Class Description
 */
//* class Engine{
function main(){

	var elem = jsonObject[0];
    //init(elem, body);
    changeContent(globals.start);
}


/**
 * Create Javaclasses for Elements and put the in DomHirachy
 * \param:  elem            Element     Element to initialise
 * \param:  parentObject    DomObject   ParentDomObject in DomTree. Default=Body
 */
function init(elem, parentObject){

	// create Dom Object
    // put Object on Body if parent is null
    if(parentObject == null){
        if(globals.debug > 0)
            alert("init: ParentObject is null - cancel");
        return;
    }
        
	// check Type 
    switch(elem.type){

		case "Button":
            elem.object = new Button(elem.id, parentObject, elem.positionX, elem.positionY, elem.standard_src,elem.active_src, elem.hover_src, elem.extra_css );
            //var params = new Array();
            //params[0] = "activate";
            //this.registerOnMouseClickEvent(this.specificAction,  params);
			//elem.object.registerOnMouseClickEvent(eventHandler);
		break;
		case "Panel":
			elem.object = new Panel(elem.id, parentObject, elem.positionX, elem.positionY, elem.extra_css );
		break;
        case "Image":
			elem.object = new Panel(elem.id, parentObject, elem.positionX, elem.positionY, elem.src, elem.extra_css );
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
        */
		case "default":
			alert("Unknown type:" + elem.type + "on Element: " + elem.id);
		break;
	}
	// call all Children
   showChildren(elem);
   	
    if(elem.object == null) { // something went wrong on creation - alert
   		if(globals.debug>0)
           alert("Error on create Element");
   	}
}

/**
 * Erstellt ein neues DomTreeObject und hängt es beim angegebenen Parent ein
 * \return: newDomTreeObject or null if error occurs
 * returned DomTreeObject saves parent in nextNode
 * \definition: HTML Objecttag: nextNode is reserved to save Wrapper Elements
 * \param:  parent\t    Element Element where the new Element should add to
 * \param:  id\t        string  id of the ne HTML Object
 * \param:  type\t      string  HTML-Type of the new DomTreeObject. Default: div
 * \param:  css\t       string  normal css class. Default: "NOTSET"
 * \param:  extra_css\t string  secoond css class. Default: "EXTRA_NOTSET"
 * \param:  src\t       string  for HTML types that need a sourcePath like img. Default: ""
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



//*};
