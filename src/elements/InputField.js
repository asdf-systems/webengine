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
 * \param: bgColor      colorHex    bgColor of the Element : Default: transparent
 * \param: width        int         width of the inputsensitiv field
 * \param: height       int         height of the inputsensitiv field
 * \param: offsetX      int         offset in px for the inputsensitiv Field relativ to inputField position    
 * \param: offsetY      int         offset in px for the inputsensitiv Field relativ to inputField position    
 * \param: src          string      path to the BackgroundImage to define inputField design
 * \param: signs        string      signs that are not allowed in notation like abc123[1..9]
 * \param: password     string      true or false to show input as * 
 * \param: fontColor    string      color of the text typed in the field
 * \param: fontSize     string      size of the text typed in the field
 * \param: fontFamily   string      family of the text typed in the field
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_InputField(_id, _parent, positionX, positionY, bgColor, width, height, inputFieldOffsetX, inputFieldOffsetY, src, forbiddenSigns, password ,fontColor, fontSize, fontFamily,  extra_css_class, initialShow,zIndex){
    
    
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

    if(forbiddenSigns == null)
        this.mForbiddenSigns = "";
    else
        this.mForbiddenSigns = forbiddenSigns;
    
    if(password == null)
        password = "false";
    
    if(password == "true")
        this.mPassword = true;
    else
        this.mPassword = false;
        
    if(bgColor == null)
        this.mBgColor = "transparent";
    else   
        this.mBgColor = bgColor;

    if(fontColor == null)
        this.mFontColor = "black";
    else
        this.mFontColor = fontColor;

    if(fontColor == null)
        this.mFontColor = "black";
    else
        this.mFontColor = fontColor;
    
    if(fontSize == null)
        this.mFontSize = "10pt";
    else
        this.mFontSize = fontSize;
        
    if(fontFamily == null)
        this.mFontFamily = "Arial";
    else
        this.mFontFamily = fontFamily;
        
                
    if(initialShow == "false")
        this.mInitialShow = false;
    else if(initialShow != false)
        this.mInitialShow = true;
    else
        this.mInitialShow = initialShow;
    
    if(zIndex == null || zIndex == undefined)
        this.mZIndex = 500;
    else
        this.mZIndex = zIndex;
                 
    this.mDomTreeObject = null;
    this.mDomBackground = null;
    this.mDomInputField = null;

    //* private:
    // Holds function Pointer
    this.mMouseOverEvents = new Array();
    this.mMouseOutEvents = new Array();
    this.mMouseClickEvents = new Array();
    this.mKeyPressEvents = new Array();
    
    // ParameterEvents typ: EventParameter()
    this.mMouseOverParams = new Array();
    this.mMouseOutParams = new Array();
    this.mMouseClickParams = new Array()
    this.mKeyPressParams = new Array();
    
    this.registerKeyPressEvent(this.checkSign);
    
  
    
    return this;
}

/**
 * called if inputField lost Focus and some stuff was changed
 * validate the input for forbidden signs 
 */
asdf_InputField.prototype.validate = function(event){
    object = event.currentTarget.nextNode;
    var value = object.mDomInputField.value;
    var wrongSigns = "";
    object.mDomInputField.style.background = "transparent"; 
    var flag = false;
    for(var i=0; i<value.length; i++){
        if(isSubstringOf(value[i], object.mForbiddenSigns)){
            wrongSigns += value[i];
            value = removeElementFromString(i,value);
            flag = true;
        }
        
    }
    if(flag){
        object.mDomInputField.value = value;
    }
    
    
        
        
}
/**
 * Change Background Image to hover Image - if Buttion is not active
 * \param params    EventParameter
 */
asdf_InputField.prototype.checkSign = function(params){
    var object = params.event.currentTarget.nextNode;
    //    alert("KeyCode" + event.keyCode);
    var asciiCode = event.keyCode;
    var insertedSign = String.fromCharCode(asciiCode);
    if(object.mForbiddenSigns.length == 0)
        return;
        
    //! \todo implement stuff like[1..9] [a..z]
    //! \todo connvert ascci sign to string
    if(isSubstringOf(insertedSign, object.mForbiddenSigns)){
        // infoprm user - delete sign is not possible because sign is added after this routine
        alert("Sign: " + insertedSign + " is not allowed in this InputField");
        object.mDomInputField.focus();
        
    }

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
            if(this.mPassword)
                this.mDomInputField = createDomObjectDOM(this, this.mDomTreeObject, (this.mId+"_inputField"), "input type=password ", this.mType, this.extra_css_class);
            else
                this.mDomInputField = createDomObjectDOM(this, this.mDomTreeObject, (this.mId+"_inputField"), "input", this.mType, this.extra_css_class);
    
            //! \todo - check if events handled right - maybe have to change handler to mDomBackground
            $(this.mDomTreeObject).mouseover(onMouseOver);
            $(this.mDomTreeObject).mouseout(onMouseOut);
            $(this.mDomTreeObject).click(onMouseClick);
            $(this.mDomInputField).keypress(onKeyPress);
            $(this.mDomInputField).change(this.validate);
            setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, "absolute");
            setObjectSize(this.mDomTreeObject, this.mWidth, this.mHeight)
            if(this.mBgImage != null){
                this.mDomInputField.style.border= 0;
                this.mDomInputField.style.background = "transparent";
            }
            setObjectPosition(this.mDomInputField, this.mInputOffsetX, this.mInputOffsetY, "absolute");
            setObjectPosition(this.mDomBackground, 0,0,"absolute");
            this.mDomTreeObject.style.background = this.mBgColor;
            
            this.mDomInputField.style.color = this.mFontColor;
            this.mDomInputField.style.fontFamily = this.mFontFamily;
            this.mDomInputField.style.fontSize = this.mFontSize;
            this.mDomTreeObject.style.zIndex = this.mZIndex;
    }
    $(this.mDomTreeObject).show();
}


/**
 * Start InputField Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 * \definition      InputField Actions: getValue (return string)
 */
asdf_InputField.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    object = params.event.currentTarget.nextNode;
    switch(actionName){
        case "getValue":
            return this.mDomInputField.value;
        break;
        default:
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
/**
 * Adds an Function that is called everytime a key is pressed
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_InputField.prototype.registerKeyPressEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mKeyPressEvents[this.mKeyPressEvents.length] = functionName;
    this.mKeyPressParams[this.mKeyPressParams.length] = params;
    
}

//*};
