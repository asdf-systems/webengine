var gTimer;

/**
 * Take a colon seperated list of ids, and show the corresponding Elements 
 * also show all static objects
 * \param   objectList  string  Colon seperated list of ids
 */
function changeContent(objectList){

    // \todo maybe Hide currentContent
    //alert("changeContent(): showObjectList")
    
    //alert("changeContent(): showStatics")
    showObjectList(globals.static);
    showObjectList(objectList);
    
}


/**
 * Take a colon seperated list of ids, and show the corresponding Elements
 * \param   objectList  string  Colon seperated list of ids
 */
function showObjectList(objectList){

    //alert("showObjects(): ObjectList:" + objectList);
    elements = objectList.split(",");
    
    for(var i=0; i< elements.length; i++){
        showElement(elements[i]);
        
    }
    
}


function hideElement(elementId){
    
    var object = getJsonObject(elementId).object;
    object.hide();
}
/**
 * Show up an Element by id 
 * \param   elementId   string  id of the Element
 */
function showElement(elementId){
    
    //alert("showElement(): Element Id:" + elementId);
    var path = elementId.split("/");
	var elem = jsonObject;
	var parentObject = $("body[id=mainBody]").get(0);
    //alert("showElement(): ElementName:" + elem.id);
    parentObject = initAndShowElements(elem, parentObject);
    for(var i=0; i < path.length; i++){
        name = path[i];
        if(name == "")
            break;
        elem = elem.children[name];
        //alert(name);
        //alert("showElement(): ElementName:" + elem.id);
        
        parentObject = initAndShowElements(elem, parentObject);
        
    }
    //! \todo: showChildren dont work
    showChildren(elem);
    
    
		

}

/**
 * Check if JsonElement already initialised, init if need and show 
 * \param:  element     jsonElement     element in jsonTree that should show up
 * \param:  parentObject    DomObject   ParentDomObject in DomTree
 * \return  domTreeObject   from init() created DomObject
 */
function initAndShowElements(element, parentObject){
    
    //alert("initAndShowE(): Element to show:" + element.id);
    //alert("intiAndShowE(): Parent Object:" + parentObject.id);
    if(element.object == null) // not initialised now
        init(element, parentObject);
    

    element.object.show();
    
    return element.object.mDomTreeObject;
}

/**
 * Show all Children of an jsonObject
 * @param: elem     jsonObject
 */
function showChildren(elem){
    //alert("showChildren(): Element: " + elem.id);
    if(elem.children != null){
        if(elem.object != null)
            parentObject = elem.object.mDomTreeObject;
       else{
            if(global.debug > 0)
                alert("showChildren(): parentObject is null")
       }
       for(var child in elem.children ){
            //alert("showChildren(): Init Children: " + child);
            var parentObject2 = initAndShowElements(elem.children[child], parentObject);
            showChildren(elem.children[child], parentObject2);
        } 
    } else{
        if(globals.debug > 1)
            alert("Warning: ShowChildren: Element is null!" );
    }
} 
	
	
/**
 * Placing and Object relative to Parent
 * @param   element DOMObject   Element to Place
 * @param   left    int         Position left
 * @param   top     int         Position top
 * @param   type    string      position type like relative or absoulte
 */
function setObjectPosition(element, left, top, type){
    if(left == null || top == null || left == "px" || top == "px" || left == "" || top == ""){
    	if(globals.debug > 0)
    		alert("setObjectPosition(): Invalid Value on element " + element.id);
    }
    element.style.position = type;
    element.style.left = getValueWithUnits(left);
    element.style.top = getValueWithUnits(top);
}

/**
 * Set Width and height if an Element
 * @param   element DOMObject   Element to Place
 * @param   width   int         Position left
 * @param   height  int         Position top
 */
function setObjectSize(element, width ,height){
    element.style.width = getValueWithUnits(width);
    element.style.height = getValueWithUnits(height);
}





