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
 */
function Button(_id, _parent, positionX, positionY, image_normal, image_active, image_hover, extra_css_class){
    
    
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
           alert("Button: Image_normal is not set - cancel");
        return null;
    }
    
    if(image_active == null){
        image_active = image_normal;

    }
    
    if(image_hover == null){
        image_hover = image_active;
        return;
    }    

    this.mId = _id;
    this.mImageNormal   = image_normal;
    this.mImageHover   = image_hover;
    this.mImageActive   = image_active;
    this.mParent        = _parent; 
    this.mType          = "Button";

    if(positionX == null)
        this.mPosX = 0;
    else
        this.mPosX      = positionX;

    if(positionY == null)
        this.mPosY = 0;
    else
        this.mPosY      = positionY;
    
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    

    this.mDomTreeObject = null;
    
    //* private:
    this.mMouseOverEvents = new Array();
    this.mMouseOutEvents = new Array();
    this.mMouseClickEvents = new Array();
    
    this.mMouseOverParams = new Array();
    this.mMouseOutParams = new Array();
    this.mMouseClickParams = new Array()
    
    this.registerOnMouseOverEvent(this.setHoverImage);
    this.registerOnMouseOutEvent(this.unsetHoverImage);
    this.mActice = false;
    
    
    return this;
}



/**
 * instant hide Button
 */
Button.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show Button
 * and create all needed DomObjects if not exists
 */
Button.prototype.show = function(){
    if(this.mDomTreeObject == null){
        this.mDomTreeObject = createDomObject(this, this.mId, "img", this.mType, this.extra_css_class, this.mImageNormal);
        $(this.mDomTreeObject).mouseover(onMouseOver);
        $(this.mDomTreeObject).mouseout(onMouseOut);
        $(this.mDomTreeObject).click(onMouseClick);
    }
    
    // set Position
    this.mDomTreeObject.style.left = this.mPosX + "px";
    this.mDomTreeObject.style.top = this.mPosY + "px";
        
    $(this.mDomTreeObject).show();

}

/**
 * Changes Background Image to active Image
 */
Button.prototype.setActiveImage = function(){
    //object = event.currentTarget.nextNode;
    this.mActice = true;
    this.mDomTreeObject.src = this.mImageActive;
}

/**
 * Changes Background Image to normal Image
 */
Button.prototype.setNormalImage = function(){
    this.mActice = false;
    this.mDomTreeObject.src = this.mImageNormal;
}


/**
 * Change Background Image to hover Image - if Buttion is not active
 * \param params    EventParameter
 */
Button.prototype.setHoverImage = function(params){
    if(object.mActice)
        return;
    object = params.event.currentTarget.nextNode;
    object.mDomTreeObject.src = object.mImageHover;
}
/**
 * Change Background Image to normal Image - if Buttion is not active
 * \param params    EventParameter
 */
Button.prototype.unsetHoverImage = function(params){
    object = params.event.currentTarget.nextNode;
    if(object.mActice)
        return;
    object.mDomTreeObject.src = object.mImageNormal;
}

/**
 * Start Button Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 * \definition: Special Actions: Button: activate, deactivate
 */
Button.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    object = params.event.currentTarget.nextNode;
    switch(actionName){
        case "activate":
            object.setActiveImage();
        break;
        case "deactivate":
            object.setNormalImage();
        break;
        case "default":
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
Button.prototype.registerOnMouseOverEvent = function(functionName, params){
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
Button.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new Array();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the Button
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
Button.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new Array();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
