function eventHandler(event){
	
}

/**
 * React on MouseOver Events and call all saved Functions for the object
 */
function onMouseOver(event){
    object = event.currentTarget.nextNode;
    for(var i=0; i< object.mMouseOverEvents.length; i++){
        params = new EventParameter();
        params.parameter = object.mMouseOverParams[i];
        params.event = event;
        object.mMouseOverEvents[i](params);
    }
}

/**
 * React on MouseOut Events and call all saved Functions for the object
 */
function onMouseOut(event){
    object = event.currentTarget.nextNode;
    for(var i=0; i< object.mMouseOutEvents.length; i++){
        params = new EventParameter();
        params.parameter = object.mMouseOutParams[i];
        params.event = event;
        object.mMouseOutEvents[i](params);
    }
}

/**
 * React on MouseOut Events and call all saved Functions for the object
 */
function onMouseClick(event){
    object = event.currentTarget.nextNode;
    for(var i=0; i< object.mMouseClickEvents.length; i++){
        params = new EventParameter();
        params.parameter = object.mMouseClickParams[i];
        params.event = event;
        object.mMouseClickEvents[i](params);
    }
}
