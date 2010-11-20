/**
 * Creates an BaseElement that changes Background Images on MouseOver and Out.
 * BaseElement can hold an image if activatet.
 */
//* class BaseElement{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the BaseElement - relative to parent
 * \param: positionY    int         y Position of the BaseElement - relative to parent
 * \param: bgColor      colorHex    bgColor of the Element : Default: transparent
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_BaseElement(_id, _parent, positionX, positionY, bgColor, extra_css_class, initialShow, zIndex){
    
    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("BaseElement: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("BaseElement: Parent is null - cancel");
        return null;
    }

   

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "BaseElement";

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: BaseElement: potitionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: BaseElement: potitionY is not set");
    }
    else
        this.mPosY      = positionY;
    
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    if(bgColor == null)
        this.mBgColor = "transparent";
    else   
        this.mBgColor = bgColor;

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
    this.mMouseClickParams = new Array();
    
  
    
    return this;
}



/**
 * instant hide BaseElement
 */
asdf_BaseElement.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show BaseElement
 */
asdf_BaseElement.prototype.show = function(){
	if(this.mDomTreeObject == null){
		this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.extra_css_class);
            $(this.mDomTreeObject).mouseover(onMouseOver);
            $(this.mDomTreeObject).mouseout(onMouseOut);
            $(this.mDomTreeObject).click(onMouseClick);
            this.setPosition(this.mPosX, this.mPosY);
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
asdf_BaseElement.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, "absolute");
    notifyParent(this);
}

asdf_BaseElement.prototype.setSize = function(sizeX, sizeY){
    setObjectSize(this.mDomTreeObject, sizeX, sizeY);
    notifyParent(this);
}


/**
 * Start BaseElement Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_BaseElement.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    object = params.event.currentTarget.nextNode;
    switch(actionName){
        case "default":
            if(globals.debug > 0)
                alert("BaseElement: action name: " + actionName + " unknown!");
        break;
    }
}


/**
 * Adds an Function that is called everytime Mouse is over the BaseElement
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_BaseElement.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime BaseElement is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_BaseElement.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the BaseElement
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_BaseElement.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
