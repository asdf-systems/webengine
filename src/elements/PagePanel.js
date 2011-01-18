/**
 * Creates an PagePanel is only an placing Element without any visible Elements
 * In Contrast to normal Elements PagePanels load DomObject onInit not on Show
 */
//* class PagePanel{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the PagePanel - relative to parent
 * \param: positionY    int         y Position of the PagePanel - relative to parent
 * \param: bgColor      colorHex    bgColor of the Element : Default: transparent
 * \param: width        int         width of the PagePanel (need if filled with bg Color) : Default: 0
 * \param: height       int         height of the PagePanel (need if filled with bg Color) : Default: 0
 * \param: pages        jsonObject[] all Pages
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_PagePanel(_id, _parent, positionX, positionY, bgColor, width , height, pageSizeX, pageSizeY, animationSpeed, pages, positionType, extra_css_class, initialShow, zIndex){
    
    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("PagePanel: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("PagePanel: Parent is null - cancel");
        return null;
    }

   

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "PagePanel";

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: PagePanel: positionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: PagePanel: positionY is not set");
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
        
    if(width == null)
        this.mWidth = "0";
    else 
        this.mWidth = width;

    if(height == null)
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
    
             
    
    if(pageSizeX == null){
        if(globals.debug > 1)
           alert("Warning: PagePanel: PageSizeX is not set");
        this.mPageSizeX = 0;
    } else 
        this.mPageSizeX = pageSizeX;

    if(pageSizeY == null){
        if(globals.debug > 1)
           alert("Warning: PagePanel: PageSizeY is not set");
        this.mPageSizeY = 0;
    } else 
        this.mPageSizeY = pageSizeY;
    
    if(pages == null){
        if(globals.debug > 0)
            alert("PagePanel: Error on PagePanel : " + this.mId + " cannot create PagePanel without Pages - cancel!!");
        return null;
    }
    if(animationSpeed == null)
        this.mAnimationSpeed = globals.defaultAnimtionSpeed;
    else    
        this.mAnimationSpeed = animationSpeed;
   
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
    
    this.mChildren = new Array();
    this.mPages = pages;
    this.mCurrentPage = 0;
    
    this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.extra_css_class);
    this.mDomPages = createDomObjectDOM(this, this.mDomTreeObject, (this.mId + "_pages"), "div", this.mType, this.extra_css_class);
    this.mDomEvenPages = createDomObjectDOM(this, this.mDomPages, ( this.mId + "_evenPages"), "div", this.mType, this.extra_css_class);
    this.mDomOddPages = createDomObjectDOM(this, this.mDomPages, ( this.mId + "_oddPages"), "div", this.mType, this.extra_css_class);
    
    this.mDomTreeObject.style.position = this.mPositionType;
    this.setPosition(this.mPosX, this.mPosY);
    this.setSize(this.mWidth, this.mHeight);
    
     
    $(this.mDomPages).show();   
    $(this.mDomEvenPages).show();   
    $(this.mDomOddPages).show();   
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
 * instant hide PagePanel
 */
asdf_PagePanel.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
    $(this.mDomPages).hide();
    this.hideChildren();
    this.mCurrentPage = 0;

    
}

asdf_PagePanel.prototype.hideChildren = function(){
    for(var i = 0; i < this.mChildren.length; i++){
        var child = this.mChildren[i];
        child.object.hide();
    }
    
}

asdf_PagePanel.prototype.showChildren = function(){
    for(var i = 0; i < this.mChildren.length; i++){
        var child = this.mChildren[i];
        if(child.object.mInitialShow != false)
            child.object.show();
    }
    
}


/**
 * instant show PagePanel
 */
asdf_PagePanel.prototype.show = function(){

    $(this.mDomTreeObject).show();
    $(this.mDomPages).show();
    this.mDomTreeObject.style.background = this.mBgColor;
    this.showChildren();
    this.mDomTreeObject.style.zIndex = this.mZIndex;

}

/**
 * Function set Position for element
 * @param int posX  position X
 * @param int posY  position Y
 */
asdf_PagePanel.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, this.mPostionType, this.mUnitX, this.mUnitY);
    setObjectPosition(this.mDomPages, 0, 0, "absolute", "px", "px");
    setObjectPosition(this.mDomEvenPages, 0, 0, "absolute", "px", "px");
    setObjectPosition(this.mDomOddPages, this.mPageSizeX, this.mPosY, "absolute","px", "px");

}

asdf_PagePanel.prototype.setSize = function(sizeX, sizeY){
    this.mWidth = sizeX;
    this.mHeight = sizeY;
    setObjectSize(this.mDomOddPages, this.mPageSizeX, this.mPageSizeX, this.mUnitW, this.mUnitH);   
    setObjectSize(this.mDomEvenPages, this.mPageSizeX, this.mPageSizeX, this.mUnitW, this.mUnitH);    
    setObjectSize(this.mDomPages, this.mPageSizeX*2, this.mPageSizeY, this.mUnitW, this.mUnitH);
    setObjectSize(this.mDomTreeObject, this.mWidth, this.mHeight, this.mUnitW, this.mUnitH);   

    
}

/**
 * return real size based on child Size and position
 * @return sizeX, sizeY
 */
asdf_PagePanel.prototype.getSize = function(){

    var sizeX = getValueWithoutUnits(this.mWidth);
    var sizeY = getValueWithoutUnits(this.mHeight);
    var x = getValueWithoutUnits(this.mDomTreeObject.width);
    var y = getValueWithoutUnits(this.mDomTreeObject.height);
    if(x > sizeX)
        sizeX = x;
    if(y > sizeY)
        sizeY = y;
        
    var ret = new Size(sizeX, sizeY);
    return ret;
}
/**
 * Add Child to the DomTree and save as Child
 * @param child     jsonElement     childElement to addd
 */
asdf_PagePanel.prototype.addChild = function(child){
     var parent = this.getParent(child);
     if(child.object == null){ // child not initialised yet

         if(child.object == null) // child not initialised yet
                init(child, parent);
        this.mChildren[this.mChildren.length] = child;
        
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
        
    }
   
    
}


/**
 * check where the childObject should be added in DomTree
 */
asdf_PagePanel.prototype.getParent = function(child){
    for(var i=0; i< this.mPages.length; i++){ // check if child is a Page 
        if(this.mPages[i].id == child.id){ // is an Page
            //put it under special Div for pages
            if(i%2 == 0)
                return this.mDomEvenPages;
            else
                return this.mDomOddPages;
        }
    }
    return this.mDomTreeObject;    
}



/**
 * Start PagePanel Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_PagePanel.prototype.specificAction = function(params){
    var actionName = trimString(params.parameter[0]);
    object = params.event.currentTarget.nextNode;
    
    switch(actionName){
        case "forward" : // no break for runThrough
        case "nextPage":
            this.changePage(+1);
        break;
        case "backward" :
        case "prevPage" : 
        case "previousPage":
            this.changePage(-1);
        break;
        default:
            if(globals.debug > 0)
                alert("PagePanel: action name: " + actionName + " unknown!");
        break;
    }
}

/**
 * Functions change the Panel Content animated
 * @param: direction    +1/-1   direction to change the Pages
 */
asdf_PagePanel.prototype.changePage = function(direction){
    var lastPage = this.mCurrentPage == this.mPages.length-1;
    var firstPage = this.mCurrentPage == 0;
    if(lastPage && direction > 0) // cannot go any further - return
        return;
    if(firstPage && direction < 0) // cannot go any further - return
        return;        

    if(this.mCurrentPage%2 == 0){ // Change Even to odd
        // Put Odd Page in the right Position for Animation
        var value = "";
        if(direction < 0){
            setObjectPosition(this.mDomOddPages, invertValue(this.mPageSizeX), this.mPosY, "absolute", "px", "px");
            value = "+=" + getValueWithUnits(this.mPageSizeX);
            
        }
        else{
            setObjectPosition(this.mDomOddPages, this.mPageSizeX, this.mPosY, "absolute", "px", "px");
            value = "-=" + getValueWithUnits(this.mPageSizeX);
            
        }
                    
        this.mCurrentPage+= direction;
        this.mPages[this.mCurrentPage].object.show();
        $(this.mDomOddPages).show();
        gCurrentAnimationSpeed = this.mAnimSpeed;
        $(this.mDomPages).animate({"left" : value}, gCurrentAnimationSpeed, this.evenToOddCallback);
 
        } else { // change odd to even
            // Put Odd Page in the right Position for Animation
            var value = "";
            if(direction < 0) {
                setObjectPosition(this.mDomEvenPages, 0, this.mPosY, "absolute", "px","px");
                value = "+=" + getValueWithUnits(this.mPageSizeX);
            }
            else{
                setObjectPosition(this.mDomEvenPages, this.mPageSizeX*2, this.mPosY, "absolute", "px", "px");
                value = "-=" + getValueWithUnits(this.mPageSizeX);
            }
            
            this.mCurrentPage+=direction;
            this.mPages[this.mCurrentPage].object.show();
            $(this.mDomEvenPages).show();
            
            gCurrentAnimationSpeed = this.mAnimSpeed;
            $(this.mDomPages).animate({left : value}, gCurrentAnimationSpeed, this.oddToEvenCallback);       
    }


}

/**
 * Called when sliding an animation is finished - fast switch of panel position as
 * prepare for the next Animation
 */
asdf_PagePanel.prototype.evenToOddCallback = function(){

    // ACHTUNG: this is pointing to mDomPages - dont ask me why - ask f*** jQuery
    var object = this.parentElement.nextNode;
    $(object.mDomEvenPages).hide();
    setObjectPosition(object.mDomPages, 0, 0, "absolute", "px", "px");
    setObjectPosition(object.mDomEvenPages, object.mPageSizeX, object.mPosY, "absolute", "px", "px");
    setObjectPosition(object.mDomOddPages, 0,0, "absolute", "px", "px");
    
    // hide left and right
    object.hideLeftAndRightPages(object);
        

}

asdf_PagePanel.prototype.hideLeftAndRightPages = function(object){
    if(object.mCurrentPage-1 >= 0)
        object.mPages[object.mCurrentPage-1].object.hide();
    if(object.mCurrentPage+1 < object.mPages.length)
        object.mPages[object.mCurrentPage+1].object.hide();
}
/**
 * Called when sliding an animation is finished - fast switch of panel position as
 * prepare for the next Animation
 */
asdf_PagePanel.prototype.oddToEvenCallback = function(){

    // ACHTUNG: this is pointing to mDomPages - dont ask me why - ask f*** jQuery
    var object = this.parentElement.nextNode;
    $(object.mDomOddPages).hide();
    setObjectPosition(object.mDomPages, 0, 0, "absolute","px", "px");
    setObjectPosition(object.mDomOddPages, object.mPageSizeX, object.mPosY, "absolute", "px", "px");
    setObjectPosition(object.mDomEvenPages, 0,0, "absolute", "px", "px");
    object.hideLeftAndRightPages(object);    
}

/**
 * Adds an Function that is called everytime Mouse is over the PagePanel
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_PagePanel.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime PagePanel is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_PagePanel.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the PagePanel
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_PagePanel.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
// STATIC FUNCTIONS
function getPages(elem){
    if(elem.type != "PagePanel" && elem.type != "AccordionPanel"){
        if(globals.debug > 0 )
            alert("Error: getPages(): getPages not supported on : " + elem.type);
        return null;
    }
    
    var pageNames = elem.pages;
    var pages = new Array();
    for(var i = 0; i < pageNames.length; i++){
        var name = pageNames[i];
        if(elem.children[name] != null && elem.children[name] != undefined)
            pages.push(elem.children[name]);
    }
    
    return pages;
}
//*};
