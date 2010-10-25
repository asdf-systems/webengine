var gTimer;

function showObjects(objects){

    elements = objects.split(",");

    for(var i=0; i< elements.length; i++){
        elem = idToElement(elements[i])
		if(elem.object == null) // not initialised now
			init(elem);
        
        show(elem);
    }
}
function show(element){
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
 * \return: corresponding Element to id
 */
function idToElement(id){
    //! \fixme: implement better search than jQuerySelector

    var path = id.split("/");
	var elem = jsonData.root;
    for(var i=0; i < path.length; i++){
    	alert("Path" + path[i]);
        elem = elem[path[i]];
    }
	alert("idToELement; Element : " + elem);
    alert("idToELement; Element Id: " + elem.mId);
    alert("idToELement; Element Object: " + elem.object);
    return elem.object;
}
