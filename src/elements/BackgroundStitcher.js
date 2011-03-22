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
 * \param: width      	int		    width of the element
 * \param: height      	int		    height of the element
 * \param: imgTop      	string		src to the upper BorderImage
 * \param: imgMiddle   	string		src to the image that fills the middle
 * \param: imgBottom    string		src to the lower BorderImage 
 * \param: img_topH     int         height of the top Image
 * \param: img_topW     int         Width of the top Image
 * \param: img_bottomH  int         height of the bottom Image 
 * \param: img_bottomW  int         width of the bottom Image 
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_BackgroundStitcher(_id, _parent, positionX, positionY, bgColor, width, height, imgTop, imgMiddle, imgBottom, positionType, img_topH, img_topW, img_bottomH, img_bottomW, extra_css_class, initialShow, zIndex){
    
    
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
    
    if(imgTop == null || imgTop == undefined){
    	if(globals.debug>0)
    		alert("Error: image_top for BackgroundStitcher: " + this.mId + " is not set - cancel!\n");
    	return null;
    } else
    	this.mImageTop = imgTop;
    
    if(imgMiddle == null || imgMiddle == undefined){
    	if(globals.debug>1)
    		alert("Warning: image_middle for BackgroundStitcher " + this.mId + " is not set - take imgTop!\n");
    	this.mImageMiddle = this.mImageTop;	
    } else 
    	this.mImageMiddle = imgMiddle;
    	
    if(imgBottom == null || imgBottom == undefined){
    	if(globals.debug>1)
    		alert("Warning: image_bottom for BackgroundStitcher " + this.mId + " is not set - take imgTop!\n");
    	this.mImageBottom = this.mImageTop;	
    } else 
    	this.mImageBottom = imgBottom;
    
    if(positionType == undefined || positionType == null){
         if(globals.debug > 2 )
            alert("Warning: PositionType on Element: " + this.mId + " is not set\n");
        this.mPositionType = "absolute";
    } else{
        this.mPositionType = positionType
    }

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "BackgroundStitcher";

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
    
    if(img_topH == null || img_topH == undefined){
        this.mImg_topH = "0px";
        if(globals.debug > 1)
            alert("Warning: BackgroundStitcher: Image Top Height is not set - set to 0");
    } else {
        this.mImg_topH = img_topH; 
    }


    if(img_topW == null || img_topW == undefined){
        this.mImg_topW = "0px";
        if(globals.debug > 1)
            alert("Warning: BackgroundStitcher: Image Top Width is not set - set to 0");
    } else {
        this.mImg_topW = img_topW; 
    }
    
    if(img_bottomH == null || img_bottomH == undefined){
        this.mImg_bottomH = "0px";
        if(globals.debug > 1)
            alert("Warning: BackgroundStitcher: Image Bottom Height is not set - set to 0");
    } else {
        this.mImg_bottomH = img_bottomH; 
    }
    
    if(img_bottomW == null || img_bottomW == undefined){
        this.mImg_bottomW = "0px";
        if(globals.debug > 1)
            alert("Warning: BackgroundStitcher: Image Bottom Width is not set - set to 0");
    } else {
        this.mImg_bottomW = img_bottomW; 
    }
    
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
 * instant hide BackgroundStitcher
 */
asdf_BackgroundStitcher.prototype.hide = function(){
    $(this.mDomTreeObject).hide();

}

/**
 * instant show BackgroundStitcher
 */
asdf_BackgroundStitcher.prototype.show = function(){
	if(this.mDomTreeObject == null){
		this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.mExtraClassCSS);
		this.mDomImageTop = createDomObjectDOM(this, this.mDomTreeObject, this.mId + "_imageTop", "img", this.mType, this.mExtraClassCSS, this.mImageTop);
		this.mDomImageMiddle = createDomObjectDOM(this, this.mDomTreeObject, this.mId + "_imageMiddle", "img", this.mType, this.mExtraClassCSS, this.mImageMiddle); 
		this.mDomImageBottom = createDomObjectDOM(this, this.mDomTreeObject, this.mId + "_imageBottom", "img", this.mType, this.mExtraClassCSS, this.mImageBottom);  
        $(this.mDomTreeObject).mouseover(onMouseOver);
        $(this.mDomTreeObject).mouseout(onMouseOut);
        $(this.mDomTreeObject).click(onMouseClick);
        setObjectSize(this.mDomImageTop, this.mImg_topW, this.mImg_topH, "px", "px");
        setObjectSize(this.mDomImageBottom, this.mImg_bottomW, this.mImg_bottomH, "px", "px");        
        this.mDomTreeObject.style.position = this.mPositionType;
        this.setPosition(this.mPosX, this.mPosY);
        this.setSize(this.mWidth, this.mHeight);
        this.mDomTreeObject.style.background = this.mBgColor;
        this.mDomTreeObject.style.zIndex = this.mZIndex;
		

		var topSize = new Size(this.mImg_topW,this.mImg_topH);
		var bottomSize = new Size(this.mImg_bottomW, this.mImg_bottomH);
		var middleSize = this.getImageSize(this.mDomImageMiddle);
		middleSize.y = getValueWithoutUnits(this.mHeight) - getValueWithoutUnits(topSize.y) - getValueWithoutUnits(bottomSize.y);
		// cut stuff if top + bottom is already to big
		if(middleSize.y < 0){
			this.mDomImageBottom.style.height = getValueWithUnits( getValueWithoutUnits(bottomSize.y) + getValueWithoutUnits(middleSize.y));
			this.mDomImageMiddle.style.height = "0px";
		} else{ // resize Middle
			this.mDomImageMiddle.style.height = getValueWithUnits(middleSize.y);
		}
		
		this.mDomImageMiddle.style.width = this.mWidth;
      	this.mDomImageBottom.style.width = this.mWidth;
   		this.mDomImageTop.style.width = this.mWidth;
		

    }
    $(this.mDomTreeObject).show();

}

/**
 * Function getImage Size for element
 * @param object jsObject
 */
asdf_BackgroundStitcher.prototype.getImageSize = function(object){
	// here we have to query the image resoulution
	var imageX = getValueWithUnits(object.width) ;
	var imageY = getValueWithUnits(object.height) ;
		
    var ret = new Size(imageX, imageY);
    return ret;
}
/**
 * Function set Position for element
 * @param int posX  position X
 * @param int posY  position Y
 */
asdf_BackgroundStitcher.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, this.mPostionType, this.mUnitX, this.mUnitY);

}

asdf_BackgroundStitcher.prototype.setSize = function(sizeX, sizeY){
    setObjectSize(this.mDomTreeObject, sizeX, sizeY, this.mUnitW, this.mUnitH);

}

/**
 * return real size based on child Size and position
 * @return sizeX, sizeY
 */
asdf_BackgroundStitcher.prototype.getSize = function(){

    var sizeX = getValueWithoutUnits(this.mDomTreeObject.width);
    var sizeY = getValueWithoutUnits(this.mDomTreeObject.height);
        
    var ret = new Size(sizeX, sizeY);
    return ret;
}

/**
 * Start BaseElement Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_BackgroundStitcher.prototype.specificAction = function(params){
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
asdf_BackgroundStitcher.prototype.registerOnMouseOverEvent = function(functionName, params){
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
asdf_BackgroundStitcher.prototype.registerOnMouseClickEvent = function(functionName,  params){
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
asdf_BackgroundStitcher.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
