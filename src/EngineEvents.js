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
    var elementName = params.parameter[0];
    //elementName = elementName.toLowerCase();
    /*if(element == "#current"){ // hide current Element
        var jsonElement = getJsonObject(gCurrentShow);
        jsonElement.object.hide();
        
    } else*/
        hideElement(elementName);
}

function ActionHandlerSpecific(params){
    var object = getJsonObject(params.parameter[0]).object;
    if(object == null && getJsonObject(params.parameter[0]) != null) // object exists - but nnot initialised yet
        showElement(params.parameter[0])
    object = getJsonObject(params.parameter[0]).object; // again to get initialsied object
    
    var actionParameter = new EventParameter();
    for(i=1; i< params.parameter.length; i++)
        actionParameter.parameter[actionParameter.parameter.length] = params.parameter[i];  
    actionParameter.event = params.event;

    object.specificAction(actionParameter);
}

function ActionHandlerSend(params){
    //! \todo implement
    // Definition Send -> definitions.odt
    // inputFieldNames = params.parameter
    // for(i=1; i < inputFieldNames.length; i++){
    // check if lastElemement is url -> if not set standart url to server
    // if(.object.getValue != undefined) -> sonst Warnig ausgeben if(globals.debug > 0) alert("Warning: Object: " 
    // var value = inputFieldNames.object.getValue(); //! todo null etc auf object abfangen //
    

}

/**
 * check if parent has to be notified about changes - and call if necessary
 */
function notifyParent(object){
    /*var parent = getParent(object);
    if (parent != null && parent != undefined && parent != object){
        if(parent.updateSize)
            parent.updateSize();
            
    }*/    
}


/**
 * React on MouseOver Events and call all saved Functions for the object
 */
function onMouseOver(event){
    var object = event.currentTarget.nextNode;
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
    var object = event.currentTarget.nextNode;
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
    var object = event.currentTarget.nextNode;
    for(var i=0; i< object.mMouseClickEvents.length; i++){
        params = new EventParameter();
        params = object.mMouseClickParams[i];
        params.event = event;
        object.mMouseClickEvents[i](params);
    }
}

/**
 * React on MouseOut Events and call all saved Functions for the object
 */
function onKeyPress(event){
    object = event.currentTarget.nextNode;
    if(object.mKeyPressEvents == null){ // Object can not Handle KeypressEvents
        if(globals.debug > 1)
            alert("Warning: Object: " + object.mId + " cannot handle Keypress Events");
        return ;
    }
    for(var i=0; i< object.mKeyPressEvents.length; i++){
        params = new EventParameter();
        params = object.mKeyPressParams[i];
        params.event = event;
        object.mKeyPressEvents[i](params);
    }
}
