var gTimer;

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
    var path = elementId.split("/");
	var elem = jsonObject;
    initAndShowElements(elem);
    for(var i=0; i < path.length; i++){
         
        //alert("Path:" + path[i]);
        name = path[i];
        //alert("Name:" + name);
        elem = elem.children[name];
        initAndShowElements(elem);
        
    }
    
    
		

}

/**
 * Check if JsonElement already initialised, init if need and show 
 * \param:  element     jsonElement     element in jsonTree that should show up
 */
function initAndShowElements(element){
    
    //alert("Element to show:" + element.id);
    if(element.object == null) // not initialised now
        init(element);
        
    element.object.show();
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
