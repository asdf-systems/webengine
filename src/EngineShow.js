var gTimer;

/**
 * Take a colon seperated list of ids, and show the corresponding Elements 
 * also show all static objects
 * \param   objectList  string  Colon seperated list of ids
 */
function changeContent(objectList){

    // \todo maybe Hide currentContent
    showObjects(objectList);
    showObjects(globals.static);
    
}


/**
 * Take a colon seperated list of ids, and show the corresponding Elements
 * \param   objectList  string  Colon seperated list of ids
 */
function showObjects(objectList){

    //alert("Objects::" + objects);
    elements = objectList.split(",");
    
    for(var i=0; i< elements.length; i++){
        showElement(elements[i]);
        
    }
    
}



/**
 * Show up an Element by id 
 * \param   elementId   string  id of the Element
 */
function showElement(elementId){
    
    //elem = getJsonObject(elements[i])
    //alert("Element Id:" + elementId);
    var path = elementId.split("/");
	var elem = jsonObject;
	var parentObject = $("body[id=mainBody]").get(0);
    parentObject = initAndShowElements(elem, parentObject);
    for(var i=0; i < path.length; i++){
         
        //alert("Path:" + path[i]);
        name = path[i];
        //alert("Name:" + name);
        if(name == "")
            break;
        elem = elem.children[name];
        
        parentObject = initAndShowElements(elem, parentObject);
        
    }
    showChildren(elem);
    
    
		

}
/**
 * Show all Children of an jsonObject
 * @param: elem     jsonObject
 */
function showChildren(elem){
    alert("Show Children From: " + elem.id);
    if(elem.children != null){
        if(elem.object != null)
            parentObject = elem.object.mDomTreeObject;
        alert("Size:" + elem.children);
        for(i=0; i< elem.children.length;  i++){
            alert("Init Children: " + elem.children[i].id);
            init(elem.children[i], parentObject);
        }
    } else{
        if(globals.debug > 0)
            alert("ShowChildren: Element is null!" );
    }
} 
	
/**
 * Check if JsonElement already initialised, init if need and show 
 * \param:  element     jsonElement     element in jsonTree that should show up
 * \param:  parentObject    DomObject   ParentDomObject in DomTree
 * \return  domTreeObject   from init() created DomObject
 */
function initAndShowElements(element, parentObject){
    
    //alert("Element to show:" + element.id);
    //alert("Parent Object:" + parentObject.id);
    if(element.object == null) // not initialised now
        init(element, parentObject);
        
    element.object.show();
    //alert("Element after init: " + element.object.mDomTreeObject.id);
    return element.object.mDomTreeObject;
}


function showDomObject(element){
	$(element.domObject).show();
}

function delay(time, nextAction, event){
	
	gTimer=setTimeout(function(){nextAction(event)}, time);
	
}

function hide(element){
	$(element.domObject).hide();
	// hide all childs
}

/**
 * Search for Element Matches the named Id
 * \return: corresponding Element in the jsonTree
 */
function getJsonObject(id){
    //! \fixme: implement better search than jQuerySelector

    //var test = jsonObject.children["MasterPanel"];
    //alert("TEST: " + test.id);
    //alert("ID to Split:" + id);
    var path = id.split("/");
	var elem = jsonObject;
    for(var i=0; i < path.length; i++){
    	//alert("Path:" + path[i]);
        name = path[i];
        //alert("Name:" + name);
        elem = elem.children[name];
    }
	
    //alert("idToELement; Element : " + elem);
    //alert("idToELement; Element Id: " + elem.mId);
    //alert("idToELement; Element Object: " + elem.object);
    return elem;
}
