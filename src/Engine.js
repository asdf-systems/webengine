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

	//alert("init():");
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
            elem.object = new asdf_Button(elem.id, parentObject, elem.position_x, elem.position_y, elem.standard_src,elem.active_src, elem.hover_src, elem.extra_css );
            registerActions(elem);           
		break;
		case "Panel":
			elem.object = new asdf_Panel(elem.id, parentObject, elem.position_x, elem.position_y, elem.extra_css );
            registerActions(elem);           
		break;
        case "Image":
            elem.object = new asdf_Image(elem.id, parentObject, elem.position_x, elem.position_y, elem.src, elem.extra_css );
            registerActions(elem);           
		break;
        /*case "InputField":
			elem.domObject = new InputField(elem.positionX, elem.positionY);
		break;
		case "TextField":
			elem.domObject = new asdf_Button(elem.positionX, elem.positionY);
		break;
		case "PagePanel":
			elem.domObject = new asdf_Button(elem.positionX, elem.positionY);
		break;		"
		case "RollOutPanel":
			elem.domObject = new asdf_Button(elem.positionX, elem.positionY);
		break;
		case "Formular":
			elem.domObject = new asdf_Button(elem.positionX, elem.positionY);
		break;
		case "GridPanel":
			elem.domObject = new asdf_Button(elem.positionX, elem.positionY);
		break;
        */
		case "default":
			alert("Unknown type:" + elem.type + "on Element: " + elem.id);
		break;
	}
	// call all Children
   //showChildren(elem);
   	
    if(elem.object == null) { // something went wrong on creation - alert
   		if(globals.debug>0)
           alert("Error on create Element");
   	}
}

/** 
 * register all known actions to the element
 */
function registerActions(element){
	var actions = ["action_click", "action_hover", "action_out"];
	for(var i=0; i < actions.length; i++){
        var name = actions[i];
        actionElement = element[name];
        if(actionElement != null && actionElement != undefined){
			for(var x =0; x < actionElement.length; x++){
                var actionHandler = getActionHandler(actionElement[x]);
				var actionParameter = getActionParameter(actionElement[x]);
				//alert("Action Parameter: " + actionParameter.parameter[0]);
				switch(i){
					case 0:
						element.object.registerOnMouseClickEvent(actionHandler, actionParameter);
					break;
					case 1:
                        element.object.registerOnMouseOverEvent(actionHandler, actionParameter);
					break;
					case 2:
						element.object.registerOnMouseOutEvent(actionHandler, actionParameter);
					break;
					case "default":
						if(globals.debug > 0)
						alert("Error: registeAction(): unknown MouseAction: " + mouseAction);
					break;
			}
		}
		} else{ // put out some warning
			if(globals.debug>1)
				alert("Warning: init(): Elemement " + element.id + " has no " + actions[i]+ " action defined");
		}
		
	} //for in actions    
}

/**
 * Takes ans jsonOject actionParameter and retrun Handler function
 */
function getActionHandler(actionElement){
    if(actionElement.name == "SHOW")
        return ActionHandlerShow;
    if(actionElement.name == "HIDE")
        return ActionHandlerHide;
    if(actionElement.name == "DELAY")
        return ActionHandlerDelay;   
    if(actionElement.name == "SPECIFIC")
        return ActionHandlerSpecific;    
    if(actionElement.name == "SEND")
        return ActionHandlerSend;          
                    
}

/**
 * read all parameter from ActionElement and returns new EventParameter 
 * with e.paramter = actionElements.parameter
 * \return EventParameter
 */
function getActionParameter(actionElement){
    var parameter = new EventParameter();
    parameter.parameter = actionElement.parameters;
    return parameter;

}

/**
 * adds standart unit of measurement to the value if no unit is specified
 * \return  value + right unit of measurement like 50px or 50%
 */
function getValueWitdhUnits(value){
   
   if(value.match(".*%") || value.match(".*px"))
        return value;
   return (value + globals.stdUnit);
     
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

/**
 * Search for Element Matches the named Id
 * \return: corresponding Element in the jsonTree
 */
function getJsonObject(id){
    var path = id.split("/");
	var elem = jsonObject;
    for(var i=0; i < path.length; i++){
    	//alert("Path:" + path[i]);
        name = path[i];
        //alert("Name:" + name);
        if(name == "")
            break;
        elem = elem.children[name];
        //alert("Current Element:" + elem.id);
    }
	
    //alert("idToELement; Element : " + elem);
    //alert("idToELement; Element Id: " + elem.id);
    //alert("idToELement; Element Object: " + elem.object.mId);
    return elem;
}

//*};
