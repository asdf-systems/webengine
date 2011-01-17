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
 * \param: fontFamily   string      font Family of the Text : Default : global.standardText
 * \param: fontSize     int         font Size of the Text : Default: global.textSize
 * \param: fontColor    hex         font Family of the Text : Default : global.textColor
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 * todo klären wer das übersetze der Textfiles übernimmt (also formatierung (rtf, txt, html) -> html)
 */
function asdf_Textfield(_id, _parent, positionX, positionY, bgColor, text, fontFamily, fontSize, fontColor, width, height, posititionType, extra_css_class, initialShow, zIndex){
    
    
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
        
    if(fontColor == null){
        this.mFontColor = globals.standardFontColor;
    } else  
        this.mFontColor = fontColor;
        
    if(width == null || width == "")
        this.mWidth = "0";
    else 
        this.mWidth = width;

    if(height == null || height == "")
        this.mHeight = "0";
    else 
        this.mHeight = height;   
        
    this.mUnitW = getUnit(width);
    this.mUnitH = getUnit(height); 
    this.mUnitX = getUnit(this.mPosX);
    this.mUnitY = getUnit(this.mPosY);
    
    if(positionType == undefined || positionType == null){
         if(globals.debug > 2 )
            alert("Warning: PositionType on Element: " + this.mId + " is not set\n");
        this.mPositionType = "absolute";
    } else{
        this.mPositionType = positionType
    }
    
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
        this.mDomTreeObject.style.position = "absolute";
        this.mDomTreeObject.style.fontFamily = this.mFontFamily;
        this.mDomTreeObject.style.fontSize = this.mFontSize;
        this.mDomTreeObject.style.color = this.mFontColor;
        this.setPosition(this.mPosX, this.mPosY, "absolute");
        this.mDomTreeObject.style.background = this.mBgColor;
        this.mDomTreeObject.style.zIndex = this.mZIndex;

    }
    $(this.mDomTreeObject).show();

}

/**
 * Function set Position for element
 * @param int posX  position X
 * @param int posY  position Y
 */
asdf_Textfield.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, this.mPostionType, this.mUnitX, this.mUnitY);

}

asdf_Textfield.prototype.setSize = function(sizeX, sizeY){
    setObjectSize(this.mDomTreeObject, sizeX, sizeY, this.mUnitW, this.mUnitH);

}

/**
 * return real size based on child Size and position
 * @return sizeX, sizeY
 */
asdf_Textfield.prototype.getSize = function(){

    var sizeX = getValueWithoutUnits(this.mDomTreeObject.width);
    var sizeY = getValueWithoutUnits(this.mDomTreeObject.height);
        
    var ret = new Size(sizeX, sizeY);
    return ret;
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
