/**
 * Creates an Button that changes Background Images on MouseOver and Out.
 * Button can hold an image if activatet.
 */
//* class Button{
/**
 * Create a Button - but images dont show up till Button.show() is called
 * 
 * \param: id	        string		unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the Button - relative to parent
 * \param: positionY    int         y Position of the Button - relative to parent
 * \param: image_normal string      Path to Image that showed if nothing is done to the Button
 * \param: image_active string      Path to Image that showd if Button is activated. Default: = image_normal
 * \param: image_hover  string      Path to Image that showed if Mouse is over Button. Default: =image_normal
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_Button(_id, _parent, positionX, positionY, image_normal, image_active, image_hover, extra_css_class, initialShow, zIndex){
    
    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("Button: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("Button: Parent is null - cancel");
        return null;
    }

    if(image_normal == null){
        if(globals.debug > 0)
           alert("Button: Image_normal is not set - cancel " + _id);
        return null;
    }
    
    if(image_active == null){
        image_active = image_normal;

    }
    
    if(image_hover == null){
        image_hover = image_active;
    }    

    this.mId = _id;
    this.mImageNormal   = image_normal;
    this.mImageHover   = image_hover;
    this.mImageActive   = image_active;
    this.mParent        = _parent; 
    this.mType          = "Button";

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: Button: potitionX is not set");
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: Button: potitionY is not set");
        this.mPosY = 0;
    }
    else
        this.mPosY      = positionY;
    
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

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
    this.mMouseOverEvents = new Array();
    this.mMouseOutEvents = new Array();
    this.mMouseClickEvents = new Array();
    
    this.mMouseOverParams = new Array();
    this.mMouseOutParams = new Array();
    this.mMouseClickParams = new Array();
    
    this.registerOnMouseOverEvent(this.setHoverImage);
    this.registerOnMouseOutEvent(this.unsetHoverImage);
    this.mActive = false;
    
    
    return this;
}



/**
 * instant hide Button
 */
asdf_Button.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
    notifyParent(this);
}

/**
 * instant show Button
 * and create all needed DomObjects if not exists
 */
asdf_Button.prototype.show = function(){
    if(this.mDomTreeObject == null){
        this.mDomTreeObject = createDomObject(this, this.mId, "img", this.mType, this.extra_css_class, this.mImageNormal);
        $(this.mDomTreeObject).mouseover(onMouseOver);
        $(this.mDomTreeObject).mouseout(onMouseOut);
        $(this.mDomTreeObject).click(onMouseClick);
        // set Position
        this.setPosition(this.mPosX,this.mPosY);
        this.mDomTreeObject.style.zIndex = this.mZIndex;

    }
    
    $(this.mDomTreeObject).show();
    notifyParent(this);

}

/**
 * Function set Position for element
 * @param int posX  position X
 * @param int posY  position Y
 */
asdf_Button.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, "absolute");
    notifyParent(this);
}

asdf_Button.prototype.setSize = function(sizeX, sizeY){
    setObjectSize(this.mDomTreeObject, sizeX, sizeY);
    notifyParent(this);
}

/**
 * return real size based on child Size and position
 * @return sizeX, sizeY
 */
asdf_Button.prototype.getSize = function(){

    var sizeX = getValueWithoutUnits(this.mDomTreeObject.width);
    var sizeY = getValueWithoutUnits(this.mDomTreeObject.height);
        
    var ret = new Size(sizeX, sizeY);
    return ret;
}

/**
 * Changes Background Image to active Image
 */
asdf_Button.prototype.setActiveImage = function(){
    //object = event.currentTarget.nextNode;
    if(this.mDomTreeObject == null)
        return;
    this.mActive = true;
    this.mDomTreeObject.src = this.mImageActive;
}

/**
 * Changes Background Image to normal Image
 */
asdf_Button.prototype.setNormalImage = function(){
    if(this.mDomTreeObject == null)
        return;
    this.mActive = false;
    this.mDomTreeObject.src = this.mImageNormal;
}


/**
 * Change Background Image to hover Image - if Buttion is not active
 * \param params    EventParameter
 */
asdf_Button.prototype.setHoverImage = function(params){
    object = params.event.currentTarget.nextNode;
    if(object.mActive)
        return;
    object = params.event.currentTarget.nextNode;
    object.mDomTreeObject.src = object.mImageHover;
}
/**
 * Change Background Image to normal Image - if Buttion is not active
 * \param params    EventParameter
 */
asdf_Button.prototype.unsetHoverImage = function(params){
    object = params.event.currentTarget.nextNode;
    if(object.mActive)
        return;
    object.mDomTreeObject.src = object.mImageNormal;
}

/**
 * Start Button Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 * \definition: Special Actions: Button: activate, deactivate
 */
asdf_Button.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    switch(actionName){
        case "activate":
            this.setActiveImage();
        break;
        case "deactivate":
            this.setNormalImage();
        break;
        default:
            if(globals.debug > 0)
                alert("Button: action name: " + actionName + " unknown!");
        break;
    }
}


/**
 * Adds an Function that is called everytime Mouse is over the Button
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Button.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime Button is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Button.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the Button
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Button.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
