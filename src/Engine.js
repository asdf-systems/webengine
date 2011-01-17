/**
 * Engine Class Description
 */
//* class Engine{
function main(){

	var elem = jsonObject[0];
    //init(elem, body);
    changeContent(globals.start);
}

function linkCalled(id){
    if(id == "./")
        main();
    
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
    elem.id =   cleanPath(elem.id);
    
	// check Type 
    switch(elem.type){
		case "Button":
            elem.object = new asdf_Button(elem.id, parentObject, elem.position_x, elem.position_y, elem.standard_src,elem.active_src, elem.hover_src, elem.width, elem.height, elem.position_type, elem.extra_css, elem.initial_show, elem.layer_level );
            registerActions(elem);           
		break;
		case "Panel":
			elem.object = new asdf_Panel(elem.id, parentObject, elem.position_x, elem.position_y, elem.background_color, elem.width, elem.height, elem.position_type, elem.extra_css,elem.initial_show, elem.layer_level );
            registerActions(elem);           
		break;
        case "AccordionPanel":
            var pages = getPages(elem);
            elem.object = new asdf_AccordionPanel(elem.id, parentObject, elem.position_x, elem.position_y, elem.background_color, elem.width, elem.height, elem.position_type, elem.extra_css, elem.collapse, pages,  elem.initial_show, elem.layer_level );
            registerActions(elem);           
		break;
        case "Image":
            elem.object = new asdf_Image(elem.id, parentObject, elem.position_x, elem.position_y, elem.width, elem.height, elem.src, elem.position_type, elem.extra_css,elem.initial_show, elem.layer_level );
            registerActions(elem);           
		break;
        case "InputField":
			elem.object = new asdf_InputField(elem.id, parentObject, elem.position_x, elem.position_y, elem.background_color, elem.width, elem.height ,elem.input_sensitiv_field_offsetX, elem.input_sensitiv_field_offsetY,  elem.backgroundImage_src, elem.forbidden_signs, elem.password_modus, elem.font_color, elem.font_size, elem.font_family, elem.position_type, elem.extra_css, elem.initial_show, elem.layer_level );
			registerActions(elem);           
		break;
		case "TextField":
			elem.object = new asdf_Textfield(elem.id, parentObject, elem.position_x, elem.position_y, elem.background_color, elem.texts, elem.font_family, elem.font_size, elem.font_color,elem.width, elem.height, elem.position_type, elem.extra_css, elem.initial_show, elem.layer_level );
            registerActions(elem);           
		break;
		case "PagePanel":
            var pages = getPages(elem);
			elem.object = new asdf_PagePanel(elem.id, parentObject, elem.position_x, elem.position_y, elem.background_color, elem.width, elem.height, elem.page_size_x, elem.page_size_y, elem.animation_speed, pages, elem.position_type, elem.extra_css , elem.initial_show, elem.layer_level );
            registerActions(elem);           
		break;		
		case "RollOutPanel":
			elem.object = new asdf_RollOutPanel(elem.id, parentObject, elem.position_x, elem.position_y, elem.background_color, elem.width, elem.height, elem.animation_speed, elem.position_type, elem.extra_css,elem.initial_show, elem.layer_level );
            registerActions(elem);           
		break;
		case "HVPanel":
			elem.object = new asdf_HVPanel(elem.id, parentObject, elem.position_x, elem.position_y, elem.background_color, elem.width, elem.height, elem.space_between_elements, elem.orientation, elem.position_type, elem.extra_css,elem.initial_show, elem.layer_level );
            registerActions(elem);  
		break;
        /*
        case "Formular":
			elem.domObject = new asdf_Button(elem.positionX, elem.positionY);
		break;
        case "MacDocPanel":
			elem.domObject = new asdf_Button(elem.positionX, elem.positionY);
		break;
	
        */
		default:
			alert("Unknown type: " + elem.type + " on Element: " + elem.id);
		break;
	}
	// call all Children
   //showChildren(elem);
   	
    if(elem.object == null) { // something went wrong on creation - alert
   		if(globals.debug>0)
           alert("Error on create Element" + elem.id);
   	}
}


/** 
 * register all known actions to the element
 */
function registerActions(element){
	var actions = ["action_click", "action_hover", "action_out"];
	for(var i=0; i < actions.length; i++){
        var name = actions[i];
        
        var actionElement = new Array();
        if(element[name] != null || element[name] != undefined){

            actionElement = element[name];
            if(typeof actionElement != Array)
                var bal = 5;
                
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
			if(globals.debug>2)
				alert("Warning: init(): Elemement " + element.id + " has no " + actions[i]+ " action defined");
		}
		
	} //for in actions    
}

/**
 * Takes ans jsonOject actionParameter and retrun Handler function
 */
function getActionHandler(actionElement){
    actionElement.name = trimString(actionElement.name);
    actionElement.name = actionElement.name.toLowerCase();
    if(actionElement.name == "show")
        return ActionHandlerShow;
    if(actionElement.name == "hide")
        return ActionHandlerHide;
    if(actionElement.name == "delay")
        return ActionHandlerDelay;   
    if(actionElement.name == "specific")
        return ActionHandlerSpecific;    
    if(actionElement.name == "send")
        return ActionHandlerSend;  
    else{
        if(globals.debug > 0){
            alert("Warning: ActionName: <" + actionElement + "> is unkown");
        }
    }        
                    
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
 * @return unit ("px" or "%") if value has a unit and empty String if there is no unit
*/

function getUnit(value){
     value += "";
     if(value.match(".*%"))
        return "%";
     if(value.match(".*px"))
        return "px";

   return "";
}
/**
 * adds the given unit to the value, or replace the old one. Fails if no unit given
 * \return  value + right unit of measurement like 50px or 50%
 * @param value the Value that should get the unit
 * @param unit needed unit like: % or px
 */
function getValueWithUnits(value, unit){
   
   if(unit == null || unit == "" || unit == undefined){
        unit = globals.stdUnit;
   }
   value += "";
   var currUnit = getUnit(value);
   if(currUnit == unit)
        return value;
        
   if(currUnit == "")
        return (value + unit);

   return  getValueWithoutUnits(value) + unit;

     
}

function getValueWithoutUnits(value){
    value += "";
    value = value.replace(/px/, "");
    value = value.replace(/%/, "");
    return Number(value);

}
/**
 * takes an pixel or prozent value, invert the value and return
 */
function invertValue(value){
    value += "";
    var number = 0;
    var unit = globals.stdUnit;
    if(value.match(".*%")){
        number = Number(value.replace(/%/, ""));
        unit = "%";
    }
    else if(value.match(".*px")){
        number = Number(value.replace(/px/, ""));
        unit = "px";
    }
    return (number*-1 + unit );
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
 * \param:  src\t       string  for HTML types that need a sourcePath like img. Default: NULL
 * \param:  extraContent    string  Conent that shoul come after > so for <p>extraContent</p>
 */
function createDomObject(parent, id, type, css, extra_css, src, extraContent){
  return ( createDomObjectDOM(parent, parent.mParent, id, type, css, extra_css, src, extraContent) ) ;
}

/**
 * same like createDomObject - just take an DomObject as parent
 */
function createDomObjectDOM(parent, domparent, id, type, css, extra_css, src, extraContent){
    // check Params

   
    if(parent == null){
        if(globals.debug > 0)
            alert("Error Creating Dom Object - no parent set!");
        return null;
    }
     if(domparent == null){
        if(globals.debug > 0)
            alert("Error Creating Dom Object - no DOM parent set!");
        return null;
    }
    
    if(id == null){
        if(globals.debug > 0)
            alert("Error Creating Dom Object - no id set!");
        return null;
    }
   
    if(type == null)
        type = "div";
        
    if(css == null)
        css = "NOTSET";
    
    if(extra_css == null)
        extra_css == "EXTRA_NOTSET";
    
     //create HTML command

     var cmd;
        
     if(type.match(/input.*password/)){
       cmd = "<input id=\"" +id+ "\" type=\"password\" class =\""+ css +" "+ extra_css+"\">";
       type = "input";
      
     }
        
     else if(src != null)
        cmd = "<" + type + " id=\"" +id+ "\" class =\""+ css +" " +extra_css+ "\" src=\""+src+"\">";
     
     else
        cmd = "<" + type + " id=\"" +id+ "\" class =\""+ css +" "+ extra_css+"\">";
        
    if(extraContent == null)
        extraContent = "";
        
     var ending = checkForTypesWithEnding(type);
     if(ending)
        cmd += extraContent + "</"+type+">";
    
    
    $(domparent).append(cmd);
    var domObject = $(type+"[id="+id+"]").get(0);
    domObject.nextNode = parent;
    
    return domObject;         
         
}

/**
 * check if type need an ending like <p>, <a>, <h> etc
 * \return true if nedded false else
 */
function checkForTypesWithEnding(type){
   var flag = false
   flag |= type.match(/^h?/);
   flag |= type == "p";
   flag |= type == "pre";
   flag |= type == "b";
   flag |= type == "div";
   
   return flag;
   
    
   
}

/**
 * Search for Element Matches the named Id
 * \return: corresponding Element in the jsonTree
 */
function getJsonObject(id){
    id = cleanPath(id);
    var path = id.split("/");
	var elem = jsonObject;
    for(var i=0; i < path.length; i++){
    	//alert("Path:" + path[i]);
        var name = path[i];
        //alert("Name:" + name);
        if(name == "")
            break;
        elem = elem.children[name];
        if(elem == undefined || elem == null){
            if(globals.debug > 0)
                alert ("Warning: cannot found object: <" + id + "> Maybe wrong reference an action?\n getJsonObejct():  ")
        }
        //alert("Current Element:" + elem.id);
    }
	
    //alert("idToELement; Element : " + elem);
    //alert("idToELement; Element Id: " + elem.id);
    //alert("idToELement; Element Object: " + elem.object.mId);
    return elem;
}

/** 
 * @returns path to element from root
 * (if elememt id = /bla/root/blubb/element than functions returns: blubb/element)
 */
function getPathWithFromRoot(element, root){
    if(element.id.match(root.id+/.+/)){
        var path = element.id.replace(root.id, "");
        return cleanPath(path);
    } else{
        if(globals.debug > 0){
            alert("Error: getPathWithNewRoot(): element: " + element.id + "is no child of :" +  root.id);
            return "";
        }    
    }
}
/**
 * Check if one string is substring oof another
 * @param   small   string  string that is maybe in the other one
 * @param   big     string  string that maybe contaisn the other one
 * @return true if big contains small, false else
 */
function isSubstringOf(small ,big){
    //! \todop check
    var subLen = small.length;
    var flag = false;
    for(var i=0; i < ( big.length-subLen ); i++){
        if(small == big.substring(i, i+subLen)){
            flag = true;
            break;
        }
            
    }
    
    return flag;
}

/**
 * removes an elemnt at index from array
 * @return array without element
 */
function removeElementFromArray(index, array){
    var ret = new Array();
    for(var i=0; i < array.length ;i++){
        if(i!=index)
            ret[ret.length] = array[i];
    }
    return ret;
}

/**
 * removes an elemnt at index from array
 * @return array without element
 */
function removeElementFromString(index, string){
    var ret = "";
    for(var i=0; i < string.length ;i++){
        if(i!=index)
            ret+= string[i];
    }
    return ret;
}

/**
 * trims whitespaces of a string start and end
 * @param string string to trim
 * @return trimmed string
 */
function trimString(string){
     if(string == null || string == undefined){
        if(globals.debug > 0)
            alert("Error: trimString(), String is undefined ");
        return string;
     }
     
        
     return string.replace(/^\s*/, "").replace(/\s*$/, "");
}

/**
 * check if an element is part of an Array
 */
function isElementOf(element, array){
    for(var i=0; i < array.length; i++){
        if(array[i] == element)
            return true;
    }
    
    return false;
}

/**
 * @return cleaned path (deleted // and ./ )
 */
function cleanPath(path){
    path = path.replace(/\/\//, "/");
    path = path.replace(/\.\//, "");
    return path;
}

function checkBrowser(){
    var userAgent = navigator.userAgent.toLowerCase();
    // Figure out what browser is being used
    jQuery.browser = {
    	version: (userAgent.match( /.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/ ) || [])[1],
    	chrome: /chrome/.test( userAgent ),
    	safari: /webkit/.test( userAgent ) && !/chrome/.test( userAgent ),
    	opera: /opera/.test( userAgent ),
    	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
    	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
    };
    return jQuery.browser;
}

/**
 * @param   Element     object from which we want to know the parent
 * @return  Elemnt      the parent Element
 */
function getParent(object){
    if(object == null)
        return null;
    if(object.mParent == null)
        return null;
            
    return object.mParent.nextNode;
}
//*};
