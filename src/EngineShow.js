var gTimer;

function showObjects(objects){

    elements = objects.split(",");

    for(var i=0; i< elements.length; i++){
        show(idToElement(elements[i]));
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
    alert(id);
    object  =  $("*[id="+id+"]") ;
    alert(object);
    element = object.nextNode;
    alert(element.mId);
    return element;
}
