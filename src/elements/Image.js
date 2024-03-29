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
 * \param: src		    string      path to the Image that sould be show
 * \param: alt_key      string      Alt Text on Hover
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_Image(_id, _parent, positionX, positionY, width, height, src, positionType, alt_key, extra_css_class, initialShow,zIndex){
    
    
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

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: Image: potitionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: Image: potitionY is not set");
        this.mPosY = 0;
    }
    else
        this.mPosY      = positionY;
    
    if(alt_key == null || alt_key == undefined){
        this.mAlt = "";
    } else
        this.mAlt = alt_key;
        
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    if(src == null){
		if(globals.debug > 0)
            alert("Image: imageSource is null - cancel");
        return null;
    }
    
    if(width == null || width == undefined){
       if(globals.debug > 1)
            alert("Image: image width from Image: "+this.mId+" is null - set to 0");
        this.mWidth = "0px";
    } else
        this.mWidth = width;
     
	if(height == null || height == undefined){
	   if(globals.debug > 1)
		alert("Image: image height from Image: "+this.mId+" is null - set to 0");
	    this.mHeight = "0px";
	} else
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
 * instant hide Image
 */
asdf_Image.prototype.hide = function(){
    $(this.mDomTreeObject).hide();

}

/**
 * instant show Image
 */
asdf_Image.prototype.show = function(){
	if(this.mDomTreeObject == null){
		this.mDomTreeObject = createDomObject(this, this.mId, "img", this.mType, this.mExtraClassCSS, this.mSource);
		this.mDomTreeObject.setAttribute("alt",this.mAlt);
        $(this.mDomTreeObject).mouseover(onMouseOver);
        $(this.mDomTreeObject).mouseout(onMouseOut);
        $(this.mDomTreeObject).click(onMouseClick);
        // set Position
        this.mDomTreeObject.style.position = this.mPositionType;
        this.setPosition(this.mPosX, this.mPosY);
        this.setSize(this.mWidth, this.mHeight);
        this.mDomTreeObject.style.zIndex = this.mZIndex;
    }
		
    $(this.mDomTreeObject).show();

}

/**
 * Function set Position for element
 * @param int posX  position X
 * @param int posY  position Y
 */
asdf_Image.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, this.mPostionType, this.mUnitX, this.mUnitY);

}

asdf_Image.prototype.setSize = function(sizeX, sizeY){
    setObjectSize(this.mDomTreeObject, sizeX, sizeY, this.mUnitW, this.mUnitH);

}

/**
 * return real size based on child Size and position
 * @return Size
 */
asdf_Image.prototype.getSize = function(){

    var sizeX = getValueWithoutUnits(this.mDomTreeObject.width);
    var sizeY = getValueWithoutUnits(this.mDomTreeObject.height);
        
    var ret = new Size(sizeX, sizeY);
    return ret;
}
/**
 * Start Image Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 * \param params[0]	actionName
 * \param params[1] newSource Path
 * \definition Image actions:
 * "changeImage"    change the source of an image element
 */
asdf_Image.prototype.specificAction = function(params){
    actionName 	= params.parameter[0];
    newSource	= params.parameter[1];
    object = params.event.currentTarget.nextNode;

    switch(actionName){
		case "changeImage":
            this.mDomTreeObject.src = newSource;
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
asdf_Image.prototype.registerOnMouseOverEvent = function(functionName, params){
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
asdf_Image.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the Image
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Image.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
