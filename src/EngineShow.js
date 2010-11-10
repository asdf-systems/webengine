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
        var elem = elements[i];
        elem = cleanPath(elem);
        if(elem == "/"){
            if(globals.debug > 1)
                alert("Warning: show up / will show nothing!!");
        }    
        showElement(elem);
        
    }
    
}


function hideElement(elementId){
    
    var object = getJsonObject(elementId).object;
    object.hide();
}

/**
 * Init all Objects in a Path, and show Up exact them - elments decide which childs they are show up 
 * \definition Panels show up all Children - instead inital_show = false
 * \param   elementId   string      id of the Element (first element in path has to be = elem)
 * \parem   elem        jsonObject  elem where the path should start: Default = jsonObject
 */
function showElement(elementId, elem){
    
    //alert("showElement(): Element Id:" + elementId);
    elementId = cleanPath(elementId);
    var path = elementId.split("/");
    if(elem == null){
        elem = jsonObject;
	    var parentObject = $("body[id=mainBody]").get(0);
        initAndShowElements(elem, parentObject);
    }
    for(var i=0; i < path.length; i++){
        if(elem.children == null)
            break;

        var name = path[i];
        if(name == "")
            break;

        var child = elem.children[name];
        if(child == null || child == undefined){
            if(globals.debug> 1)
                alert("showElement(): Warning: ElementChild: " + name + "was not found");
            break;
        }
        
        if(child.object == null && elem.object.addChild != undefined)
            elem.object.addChild(child);
        elem = child;
        
    }
    // Now Show all Children in the tree
    //showChildren(elem);
    
    
		

}

/**
 * Check if JsonElement already initialised, init if need and show 
 * \param:  element     jsonElement     element in jsonTree that should show up
 * \param:  parentObject    DomObject   ParentDomObject in DomTree
 */
function initAndShowElements(element, parentObject){
    
    //alert("initAndShowE(): Element to show:" + element.id);
    //alert("intiAndShowE(): Parent Object:" + parentObject.id);
    if(element.object == null) // not initialised now
        init(element, parentObject);
    

    element.object.show();


}


/**
 * Show all Children of an jsonObject
 * @param: elem     jsonObject
 *//*
function showChildren(elem){
    //alert("showChildren(): Element: " + elem.id);
    if(elem.children != null){
        if(elem.object != null){
            //parentObject = elem.object.mDomTreeObject;
            // do nothing
       } else{
            if(global.debug > 0)
                alert("showChildren(): parentObject is null")
       }
       for(var child in elem.children ){
            //alert("showChildren(): Init Children: " + child);
            var parentObject = getParent(elem, elem.children[child]);
            //alert(parentObject.id);
            initAndShowElements(elem.children[child], parentObject);
            showChildren(elem.children[child]);
        } 
    } else{
        if(globals.debug > 1)
            alert("Warning: ShowChildren: Element is null!" );
    }
} 
*/	
	
/**
 * Placing and Object relative to Parent
 * @param   element DOMObject   Element to Place
 * @param   left    int         Position left
 * @param   top     int         Position top
 * @param   type    string      position type like relative or absoulte
 */
function setObjectPosition(element, left, top, type){
    left += "";
    top += "";
    if(left == null  || left == "px"  || left == "" ){
    	if(globals.debug > 0)
    		alert("setObjectPosition(): Invalid Value(Left): X" + left + "X on element " + element.id);
    }
    if(top == null || top == "px" || top == "" ){
        if(globals.debug > 0)
    		alert("setObjectPosition(): Invalid Value(Top): X" + top + "X on element " + element.id);
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
