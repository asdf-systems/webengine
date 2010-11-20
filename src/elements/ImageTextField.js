/**
 * Creates an ImageTextField that changes Background ImageTextFields on MouseOver and Out.
 * ImageTextField can hold an ImageTextField if activatet.
 */
//* class ImageTextField{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the ImageTextField - relative to parent
 * \param: positionY    int         y Position of the ImageTextField - relative to parent
 * \param: src		    string      path to the Image that sould be show
 * \param: textField    Element     textField that should be shown if click on : showText
 * \param: showTextBtn  Element     Button that opens the TextField
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_ImageTextField(_id, _parent, positionX, positionY, src, textField, showButton, extra_css_class, initialShow, zIndex){
    
    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("ImageTextField: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("ImageTextField: Parent is null - cancel");
        return null;
    }

   

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "ImageTextField";

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: ImageTextField: potitionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: ImageTextField: potitionY is not set");
        this.mPosY = 0;
    }
    else
        this.mPosY      = positionY;
    
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    if(src == null){
		if(globals.debug > 0)
            alert("ImageTextField: ImageTextFieldSource is null - cancel");
        return null;
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
        
    this.mSource = src;
    this.mDomTreeObject = null; 

    //* private:
    this.mMouseOverEvents = new Array();
    this.mMouseOutEvents = new Array();
    this.mMouseClickEvents = new Array();
    
    this.mMouseOverParams = new Array();
    this.mMouseOutParams = new Array();
    this.mMouseClickParams = new Array()
    
  
    
    return this;
}



/**
 * instant hide ImageTextField
 */
asdf_ImageTextField.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show ImageTextField
 */
asdf_ImageTextField.prototype.show = function(){
	if(this.mDomTreeObject == null){
		this.mDomTreeObject = createDomObject(this, this.mId, "img", this.mType, this.extra_css_class, this.mSource);
        $(this.mDomTreeObject).mouseover(onMouseOver);
        $(this.mDomTreeObject).mouseout(onMouseOut);
        $(this.mDomTreeObject).click(onMouseClick);
        // set Position
       this.setPosition(this.mPosX, this.mPosY, "absolute");
        this.mDomTreeObject.style.zIndex = this.mZIndex;
    }
		
    $(this.mDomTreeObject).show();

}

/**
 * Function set Position for element
 * @param int posX  position X
 * @param int posY  position Y
 */
asdf_IamgeTextField.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, "absolute");
    notifyParent(this);
}

/**
 * Start ImageTextField Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 * \param params[0]	actionName
 * \param params[1] newSource Path
 * \definition ImageTextField actions:
 * "changeImageTextField"    change the source of an ImageTextField element
 */
asdf_ImageTextField.prototype.specificAction = function(params){
    actionName 	= params.parameter[0];
    newSource	= params.parameter[1];
    object = params.event.currentTarget.nextNode;

    switch(actionName){
		case "changeImageTextField":
            object.mDomTreeObject.src = newSource;
		break;
        case "default":
            if(globals.debug > 0)
                alert("ImageTextField: action name: " + actionName + " unknown!");
        break;
    }
}


/**
 * Adds an Function that is called everytime Mouse is over the ImageTextField
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_ImageTextField.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime ImageTextField is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_ImageTextField.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the ImageTextField
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_ImageTextField.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
