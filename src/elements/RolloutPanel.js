/**
 * Creates an RollOutPanel is only an placing Element without any visible Elements
 * In Contrast to normal Elements RollOutPanels load DomObject onInit not on Show
 */
//* class RollOutPanel{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the RollOutPanel - relative to parent
 * \param: positionY    int         y Position of the RollOutPanel - relative to parent
 * \param: bgColor      colorHex    bgColor of the Element : Default: transparent
 * \param: width        int         width of the Panel (need if filled with bg Color) : Default: 0
 * \param: height       int         height of the Panel (need if filled with bg Color) : Default: 0
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_RollOutPanel(_id, _parent, positionX, positionY, bgColor, width , height,animationSpeed, positionType, extra_css_class, initialShow, zIndex){
    
	//! \todo add BGColor width and height - not in because working offline    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("RollOutPanel: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("RollOutPanel: Parent is null - cancel");
        return null;
    }

   

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "RollOutPanel";

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: RollOutPanel: positionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: RollOutPanel: positionY is not set");
        this.mPosY = 0;
    }
    else
        this.mPosY      = positionY;
    
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    if(animationSpeed == null){
    	this.mAnimationSpeed = globals.defaultAnimationSpeed;
    } else
    	this.mAnimationSpeed = animationSpeed;
    
     if(bgColor == null)
        this.mBgColor = "transparent";
     else   
        this.mBgColor = bgColor;
        
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
        
    this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.extra_css_class);
    this.mDomTreeObject.style.position = "absolute";
    this.mChildren = new Array();
    
    // set Position
	this.setPosition(this.mPosX, this.mPosY);
    
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
 * instant hide RollOutPanel
 */
asdf_RollOutPanel.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
    this.hideChildren();
    //this.setSize(0,0);
}

asdf_RollOutPanel.prototype.hideChildren = function(){
    for(var i = 0; i < this.mChildren.length; i++){
        var child = this.mChildren[i];
        child.object.hide();
    }
    this.updateSize();
}

asdf_RollOutPanel.prototype.showChildren = function(){
    for(var i = 0; i < this.mChildren.length; i++){
        var child = this.mChildren[i];
        if(child.object.mInitialShow != false)
            child.object.show();
    }
    this.updateSize();
}


/**
 * instant show Panel
 */
asdf_RollOutPanel.prototype.show = function(){

    $(this.mDomTreeObject).show();
    this.mDomTreeObject.style.background = this.mBgColor;
    this.setSize(this.mWidth, this.mHeight);
    this.showChildren();
    this.mDomTreeObject.style.zIndex = this.mZIndex;
    this.updateSize();

}

/**
 * Function set Position for element
 * @param int posX  position X
 * @param int posY  position Y
 */
asdf_RollOutPanel.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, this.mPostionType, this.mUnitX, this.mUnitY);
 
}

asdf_RollOutPanel.prototype.setSize = function(sizeX, sizeY){
    this.mWidth = sizeX;
    this.mHeight = sizeY;
    setObjectSize(this.mDomTreeObject, this.mWidth, this.mHeight, this.mUnitW, this.mUnitH);

}

/**
 * return size of the Element
 * @return sizeX, sizeY
 */
asdf_RollOutPanel.prototype.getSize = function(){

    //this.updateSize();
    var sizeX = getValueWithoutUnits(this.mWidth);
    var sizeY = getValueWithoutUnits(this.mHeight);
       
    var ret = new Size(sizeX, sizeY);
    return ret;
}

/**
 * check the needed Size based on Child size and position
 * and resize if needen
 */
asdf_RollOutPanel.prototype.updateSize = function(){
    var sizeX = getValueWithoutUnits(this.mWidth);
    var sizeY = getValueWithoutUnits(this.mHeight);
    
    for(var i = 0; i < this.mChildren.length; i++){
        var child = this.mChildren[i].object;
        if(child == null)
            continue;
        if(child.mDomTreeObject == null || child.mDomTreeObject == undefined)
            continue;
            
       if(!$(child.mDomTreeObject).is(":visible"))
            continue;
        // if child position + size > mySize -> need resize
        var sz = child.getSize();
        x = sz.x + getValueWithoutUnits(child.mDomTreeObject.style.left);
        y = sz.y+ getValueWithoutUnits(child.mDomTreeObject.style.top);
        if(x > sizeX)
            sizeX = x;
        if(sz.y > sizeY)
            sizeY = y;
    }
    this.setSize(sizeX, sizeY);
}

/**
 * Add Child to the DomTree and save as Child
 * @param child     jsonElement     childElement to addd
 */
asdf_RollOutPanel.prototype.addChild = function(child){
   if(child.object == null){ // child not initialised yet
        init(child, this.mDomTreeObject);
   
        this.mChildren.push(child);

        for(var grandChild in child.children){
            var thisJson = getJsonObject(this.mId);
            var path = getPathWithFromRoot(child.children[grandChild], thisJson);
            showElement(path, thisJson);
        }
        if(child.object.mInitialShow != false){
            child.object.show();
                    // init and add all grandChildren
            
        } else
            child.object.hide();
            
        //this.updateSize();
        
                

    }
}

/**
 * Start Panel Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_RollOutPanel.prototype.specificAction = function(params){
    var actionName = params.parameter[0];
    actionName = actionName.toLowerCase();
    switch(actionName){
		case "toggle": 
            if(this.mDomTreeObject.style.visibility == "visible"){ // hide
                params.parameter[0] = "rollup";
                this.specificAction(params);
            } else{ // show
                params.parameter[0] = "rollout";
                this.specificAction(params);
            }
            
        break;
		
        case "rollout": // no break for runthrough
		case "down":
		case "slidedown":
            //setObjectSize(this.mDomTreeObject, 0,0);
			// for slideDown - hav to be hidden, but need show to initialise childs
            this.show(); this.hide(); this.showChildren();
            $(this.mDomTreeObject).slideDown(this.mAnimationSpeed, this.rollDownCallback);

		break;
		case "rollup":
		case "up":
		case "slideup":
            if(!this.mouseOverPanel(params)){
    			$(this.mDomTreeObject).slideUp(this.mAnimationSpeed, this.rollUpCallback);

   		  }
		break;
        default:
            if(globals.debug > 0)
                alert("RollOutPanel: action name: " + actionName + " unknown!");
        break;
    }
}

/**
 * check if mouse is over the rollOurPanel - and return true if so
 * \return true if mouse over the Panel - false else
 */
asdf_RollOutPanel.prototype.mouseOverPanel = function(params){
    var e = params.event;
    var x = e.pageX - this.mDomTreeObject.offsetLeft;
	var y = e.pageY - this.mDomTreeObject.offsetTop;
	if(x > getValueWithoutUnits(this.mWidth) || y > getValueWithoutUnits(this.mHeight) || x < 0 || y < 0)
	   return false;
    
     return true;
}
/**
  * function called if animation for rollup is finished
  */
asdf_RollOutPanel.prototype.rollDownCallback = function (){
	// ACHTUNG: this is pointing to mDomTreeObject
    //var object = this.parentElement.nextNode;
}

/**
  * function called if animation for rollup is finished
  */
asdf_RollOutPanel.prototype.rollUpCallback = function (){
	// ACHTUNG: this is pointing to mDomTreeObject
    //var object = this.parentElement.nextNode;
    //object.hide();
}
/**
 * Adds an Function that is called everytime Mouse is over the RollOutPanel
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_RollOutPanel.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime RollOutPanel is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_RollOutPanel.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the RollOutPanel
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_RollOutPanel.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
