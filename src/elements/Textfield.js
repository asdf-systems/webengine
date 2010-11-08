/**
 * Creates an Textfield that changes Background Images on MouseOver and Out.
 * Textfield can hold an image if activatet.
 */
//* class Textfield{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the Textfield - relative to parent
 * \param: positionY    int         y Position of the Textfield - relative to parent
 * \param: bgColor      colorHex    bgColor of the Element : Default: transparent
 * \param: text         int         text to show
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * todo klären wer das übersetze der Textfiles übernimmt (also formatierung (rtf, txt, html) -> html)
 */
function asdf_Textfield(_id, _parent, positionX, positionY, bgColor, text, fontFamily, fontSize, extra_css_class){
    
    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("Textfield: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("Textfield: Parent is null - cancel");
        return null;
    }

   

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "Textfield";

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: Textfield: potitionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: Textfield: potitionY is not set");
    }
    else
        this.mPosY      = positionY;
    
    if(text == null){
        this.mText = "";
        if(globals.debug >1)
           alert("Warning: Textfield: Text is not set");    
    } else
        this.mText = text;
        
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    if(fontFamily == null){
        this.mFontFamily = globals.standardFontFamily;
    } else  
        this.mFontFamily = fontFamily;

    if(fontSize == null){
        this.mFontSize = globals.standardFontSize;
    } else  
        this.mFontSize = fontSize;
        
    if(bgColor == null)
        this.mBgColor = "transparent";
    else   
        this.mBgColor = bgColor;
        
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
 * instant hide Textfield
 */
asdf_Textfield.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show Textfield
 */
asdf_Textfield.prototype.show = function(){
	if(this.mDomTreeObject == null){
		this.mDomTreeObject = createDomObject(this, (this.mId+"_start") , "pre", this.mType, this.extra_css_class,null , this.mText);
            $(this.mDomTreeObject).mouseover(onMouseOver);
            $(this.mDomTreeObject).mouseout(onMouseOut);
            $(this.mDomTreeObject).click(onMouseClick);
            this.mDomTreeObject.style.fontFamily = this.mFontFamily;
            this.mDomTreeObject.style.fontSize = this.mFontSize;
            setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, "absolute");
            this.mDomTreeObject.style.background = this.mBgColor;

    }
    $(this.mDomTreeObject).show();
}


/**
 * Start Textfield Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_Textfield.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    object = params.event.currentTarget.nextNode;
    switch(actionName){
        case "default":
            if(globals.debug > 0)
                alert("Textfield: action name: " + actionName + " unknown!");
        break;
    }
}


/**
 * Adds an Function that is called everytime Mouse is over the Textfield
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Textfield.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime Textfield is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Textfield.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the Textfield
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Textfield.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
