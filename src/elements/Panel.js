/**
 * Creates an Panel is only an placing Element without any visible Elements
 * In Contrast to normal Elements Panels load DomObject onInit not on Show
 */
//* class Panel{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the Panel - relative to parent
 * \param: positionY    int         y Position of the Panel - relative to parent
 * \param: bgColor      colorHex    bgColor of the Element : Default: transparent
 * \param: width        int         width of the Panel (need if filled with bg Color) : Default: 0
 * \param: height       int         height of the Panel (need if filled with bg Color) : Default: 0
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 */
function asdf_Panel(_id, _parent, positionX, positionY, bgColor, width , height, extra_css_class, initialShow){
    
    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("Panel: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("Panel: Parent is null - cancel");
        return null;
    }

   

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "Panel";

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: Panel: positionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: Panel: positionY is not set");
        this.mPosY = 0;
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
        
    if(width == null || width == "")
        this.mWidth = "0";
    else 
        this.mWidth = width;

    if(height == null || height == "")
        this.mHeight = "0";
    else 
        this.mHeight = height;        

    if(initialShow == null)
        this.mInitialShow = true;
    else if(initialShow == "false")
        this.mInitialShow = false;
    else
        this.mInitialShow = true;
        
    this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.extra_css_class);
    this.mChildren = new Array();
    
    // set Position
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, "absolute");

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
 * instant hide Panel
 */
asdf_Panel.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show Panel
 */
asdf_Panel.prototype.show = function(){

    $(this.mDomTreeObject).show();
    this.mDomTreeObject.style.background = this.mBgColor;
    setObjectSize( this.mDomTreeObject, this.mWidth, this.mHeight);
    for(var i = 0; i < this.mChildren.length; i++){
        var child = this.mChildren[i];
        if(child.object.mInitialShow != false)
            child.object.show();
    }
}

/**
 * Add Child to the DomTree and save as Child
 * @param child     jsonElement     childElement to addd
 */
asdf_Panel.prototype.addChild = function(child){
   if(child.object == null){ // child not initialised yet
        init(child, this.mDomTreeObject);
   
        this.mChildren.push(child);

        if(child.object.mInitialShow != false){
            child.object.show();
                    // init and add all grandChildren
            for(var grandChild in child.children){
                 showElement(child.children[grandChild].id);
            }
        }
        

    }
}



/**
 * Start Panel Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_Panel.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    object = params.event.currentTarget.nextNode;
    switch(actionName){
        case "default":
            if(globals.debug > 0)
                alert("Panel: action name: " + actionName + " unknown!");
        break;
    }
}


/**
 * Adds an Function that is called everytime Mouse is over the Panel
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Panel.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime Panel is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Panel.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the Panel
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_Panel.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
