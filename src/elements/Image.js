/**
 * Creates an Image that changes Background Images on MouseOver and Out.
 * Image can hold an image if activatet.
 */
//* class Image{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the Image - relative to parent
 * \param: positionY    int         y Position of the Image - relative to parent
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: src		    string      path to the Image that sould be show
 */
function Image(_id, _parent, positionX, positionY, extra_css_class, src){
    
    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("Image: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("Image: Parent is null - cancel");
        return null;
    }

   

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "Image";

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

    if(src == null){
		if(globals.debug > 0)
            alert("Image: imageSource is null - cancel");
        return null;
    }
    
    this.mSource = src;
    else    
        this.mExtraClassCSS = extra_css_class;

    this.mDomTreeObject = null; 

    // set Position
    this.mDomTreeObject.style.left = this.mPosX + "px";
    this.mDomTreeObject.style.top = this.mPosY + "px";
    
    //* private:
    this.mMouseOverEvents = new Array();
    this.mMouseOutEvents = new Array();
    this.mMouseClickEvents = new Array();
    
    this.mMouseOverParams = new Array();
    this.mMouseOutParams = new Array();
    this.mMouseClickParams = new Array()
    
    $(this.mDomTreeObject).mouseover(onMouseOver);
    $(this.mDomTreeObject).mouseout(onMouseOut);
    $(this.mDomTreeObject).click(onMouseClick);
    
    return this;
}



/**
 * instant hide Image
 */
Image.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show Image
 */
Image.prototype.show = function(){
	if(this.mDomTreeObject == null)
		this.mDomTreeObject = createDomObject(this, this.mId, "img", this.mType, this.extra_css_class, this.mSource);
		
    $(this.mDomTreeObject).show();
}


/**
 * Start Image Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 * \param params[0]	actionName
 * \param params[1] newSource Path
 */
Image.prototype.specificAction = function(params){
    actionName 	= params.parameter[0];
    newSource	= params.parameter[1];
    object = params.event.currentTarget.nextNode;
    switch(actionName){
		case "changeSource":
			$(object.mDomTreeObject).src = newSource;
		break;
        case "default":
            if(globals.debug > 0)
                alert("Image: action name: " + actionName + " unknown!");
        break;
    }
}


/**
 * Adds an Function that is called everytime Mouse is over the Image
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
Image.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime Image is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
Image.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new Array();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the Image
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
Image.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new Array();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};