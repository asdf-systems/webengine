/**
 * \definition Delay EventParameter: param[0] = nextAction param[1] = time
 */
function ActionEventDelay(params){
    //! \todo: test finish implementation    
    var nextAction = params.parameter[0];
    var time = params.paramter[1];
	gTimer=setTimeout(function(){nextAction(params.event)}, time);
}

function ActionHandlerShow(params){
    showElement(params.parameter[0]);
    
}

function ActionHandlerHide(params){
    hideElement(params.parameter[0]);
}

function ActionHandlerSpecific(params){
    object = getJsonObject(params.parameter[0]).object;
    var actionParameter = new EventParameter();
    for(i=1; i< params.parameter.length; i++)
        actionParameter.parameter[actionParameter.parameter.length] = params.parameter[i];  
    actionParameter.event = params.event;

    object.specificAction(actionParameter);
}

function ActionHandlerSend(params){
    //! \todo implement

}



/**
 * React on MouseOver Events and call all saved Functions for the object
 */
function onMouseOver(event){
    object = event.currentTarget.nextNode;
    for(var i=0; i< object.mMouseOverEvents.length; i++){
        params =new EventParameter();
        params = object.mMouseOverParams[i];
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
        params = object.mMouseOutParams[i];
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
        params = object.mMouseClickParams[i];
        params.event = event;
        object.mMouseClickEvents[i](params);
    }
}
