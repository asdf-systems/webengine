/**
 * Creates an InputField that changes Background Images on MouseOver and Out.
 * InputField can hold an image if activatet.
 */
//* class InputField{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the InputField - relative to parent
 * \param: positionY    int         y Position of the InputField - relative to parent
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 */
function asdf_InputField(_id, _parent, positionX, positionY, extra_css_class){
    
    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("InputField: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("InputField: Parent is null - cancel");
        return null;
    }

   

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "InputField";

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: InputField: potitionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: InputField: potitionY is not set");
    }
    else
        this.mPosY      = positionY;
    
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    

    this.mDomTreeObject = null;

    //* private:
    // Holds function Pointer
    this.mMouseOverEvents = new Array();
    this.mMouseOutEvents = new Array();
    this.mMouseClickEvents = new Array();
    
    // ParameterEvents typ: EventParameter()
    this.mMouseOverParams = new Array();
    this.mMouseOutParams = new Array();
    this.mMouseClickParams = new Array()
    
  
    
    return this;
}



/**
 * instant hide InputField
 */
asdf_InputField.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show InputField
 */
asdf_InputField.prototype.show = function(){
	alert("InputField Show()");
    if(this.mDomTreeObject == null){
		this.mDomTreeObject = createDomObject(this, this.mId, "input", this.mType, this.extra_css_class);
            $(this.mDomTreeObject).mouseover(onMouseOver);
            $(this.mDomTreeObject).mouseout(onMouseOut);
            $(this.mDomTreeObject).click(onMouseClick);
            this.mDomTreeObject.style.position= "absolute";
            this.mDomTreeObject.style.left = getValueWitdhUnits("" + this.mPosX);
            this.mDomTreeObject.style.top = getValueWitdhUnits("" +this.mPosY);
    }
    $(this.mDomTreeObject).show();
}


/**
 * Start InputField Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_InputField.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    object = params.event.currentTarget.nextNode;
    switch(actionName){
        case "default":
            if(globals.debug > 0)
                alert("InputField: action name: " + actionName + " unknown!");
        break;
    }
}


/**
 * Adds an Function that is called everytime Mouse is over the InputField
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_InputField.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime InputField is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_InputField.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the InputField
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_InputField.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
