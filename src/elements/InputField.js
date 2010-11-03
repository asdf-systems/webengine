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
 * \param: width        int         width of the inputsensitiv field
 * \param: height       int         height of the inputsensitiv field
 * \param: offsetX      int         offset in px for the inputsensitiv Field relativ to inputField position    
 * \param: offsetY      int         offset in px for the inputsensitiv Field relativ to inputField position    
 * \param: src          string      path to the BackgroundImage to define inputField design
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 */
function asdf_InputField(_id, _parent, positionX, positionY, width, height, inputFieldOffsetX, inputFieldOffsetY, src,extra_css_class){
    
    
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
    this.mType          = "asdf_engine_inputField";

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


    if(width == null){
        if(globals.debug > 0)
           alert("Error: InputField: width is not set - cancel");
        return null;
    }
    else
        this.mWidth      = width;

    if(height == null){
        if(globals.debug > 0)
           alert("Error: InputField: height is not set - cancel");
        return null;
    }
    else
        this.mHeight      = height;
        
    if(inputFieldOffsetX == null){
        if(globals.debug > 0)
           alert("Error: InputField: inputFieldOffsetX is not set - cancel");
        return null;
    }
    else
        this.mInputOffsetX      = inputFieldOffsetX;


    if(inputFieldOffsetY == null){
        if(globals.debug > 0)
           alert("Error: InputField: inputFieldOffsetY is not set - cancel");
        return null;
    }
    else
        this.mInputOffsetY      = inputFieldOffsetY;
                            
    this.mBgImage = src;
    
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;



    this.mDomTreeObject = null;
    this.mDomBackground = null;
    this.mDomInputField = null;

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
	//alert("InputField Show()");
    if(this.mDomTreeObject == null){
		this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.extra_css_class);
            this.mDomBackground = createDomObjectDOM(this, this.mDomTreeObject, this.mId, "img", (this.mType+"_bgImage"), this.extra_css_class, this.mBgImage);
            this.mDomInputField = createDomObjectDOM(this, this.mDomTreeObject, (this.mId+"_inputField"), "input", this.mType, this.extra_css_class);
    
            $(this.mDomTreeObject).mouseover(onMouseOver);
            $(this.mDomTreeObject).mouseout(onMouseOut);
            $(this.mDomTreeObject).click(onMouseClick);
            this.mDomTreeObject.style.position= "absolute";
            this.mDomTreeObject.style.left = getValueWitdhUnits(this.mPosX);
            this.mDomTreeObject.style.top = getValueWitdhUnits(this.mPosY);
            this.mDomTreeObject.style.width = getValueWitdhUnits(this.mWidth);
            this.mDomTreeObject.style.height = getValueWitdhUnits(this.mHeight);            
            if(this.mBgImage != null){
                this.mDomInputField.style.border= 0;
                this.mDomInputField.style.background = "transparent";
            }
            this.mDomInputField.style.position = "absolute";
            this.mDomInputField.style.left = getValueWitdhUnits(this.mInputOffsetX);
            this.mDomInputField.style.top = getValueWitdhUnits(this.mInputOffsetY);
            this.mDomBackground.style.position = "absolute";
            this.mDomBackground.style.top = getValueWitdhUnits(0);
            this.mDomBackground.style.left = getValueWitdhUnits(0);
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
