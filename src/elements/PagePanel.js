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
 */
function asdf_PagePanel(_id, _parent, positionX, positionY, bgColor, width , height, pageSizeX, pageSizeY, animationSpeed, pages, extra_css_class, initialShow){
    
    
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
         
    if(initialShow == null)
        this.mInitialShow = true;
    else if(initialShow == "false")
        this.mInitialShow = false;
    else
        this.mInitialShow = true;
        
    this.mChildren = new Array();
    this.mPages = pages;
    this.mCurrentPage = 0;
    
    this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.extra_css_class);
    this.mDomPages = createDomObjectDOM(this, this.mDomTreeObject, (this.mId + "_pages"), "div", this.mType, this.extra_css_class);
    this.mDomEvenPages = createDomObjectDOM(this, this.mDomPages, ( this.mId + "_evenPages"), "div", this.mType, this.extra_css_class);
    this.mDomOddPages = createDomObjectDOM(this, this.mDomPages, ( this.mId + "_oddPages"), "div", this.mType, this.extra_css_class);
    // set Position for Panels
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, "absolute");
    setObjectSize(this.mDomTreeObject, this.mWidth, this.mHeight, "absolute");

    setObjectPosition(this.mDomPages, 0, 0, "absolute");
    setObjectSize(this.mDomPages, this.mPageSizeX*2, this.mPageSizeY, "absolute");
    
    setObjectPosition(this.mDomEvenPages, 0, 0, "absolute");
    setObjectSize(this.mDomEvenPages, this.mPageSizeX, this.mPageSizeX, "absolute");    

    setObjectPosition(this.mDomOddPages, this.mPageSizeX, this.mPosY, "absolute");
    setObjectSize(this.mDomOddPages, this.mPageSizeX, this.mPageSizeX, "absolute");    
    
     
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
}

/**
 * instant show PagePanel
 */
asdf_PagePanel.prototype.show = function(){

    $(this.mDomTreeObject).show();
    this.mDomTreeObject.style.background = this.mBgColor;

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
        
        if(child.object.mInitialShow != false){
            if(!isElementOf(child, this.mPages) || child == this.mPages[0])
                child.object.show();
            else
                child.object.hide();
            // init and add all grandChildren
            for(var grandChild in child.children){
                showElement(child.children[grandChild].id);
            }
        } 
    }
    if(parent == this.mDomEvenPages || parent == this.mDomOddPages) // child is page
            this.mPages[this.mPages.length] = child;
    
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

    //this.mPages[this.mCurrentPage].object.hide(); // hide current
    if(this.mCurrentPage%2 == 0){ // Change Even to odd
        // Put Odd Page in the right Position for Animation
        if(direction < 0)
            setObjectPosition(this.mDomOddPages, invertValue(this.mPageSizeX), this.mPosY, "absolute");
        else
            setObjectPosition(this.mDomOddPages, this.mPageSizeX, this.mPosY, "absolute");
                    
            this.mCurrentPage+= direction;
            this.mPages[this.mCurrentPage].object.show();
            $(this.mDomOddPages).show();
            var value = getValueWithUnits(this.mPageSizeX);
            value = "+="+ invertValue(value);
            gCurrentAnimationSpeed = this.mAnimSpeed;
            $(this.mDomPages).animate({"left" : value}, gCurrentAnimationSpeed, this.evenToOddCallback());
 
        } else { // change odd to even
            // Put Odd Page in the right Position for Animation
            if(direction < 0) 
                setObjectPosition(this.mDomEvenPages, 0, this.mPosY, "absolute");
            else
                setObjectPosition(this.mDomEvenPages, this.mPageSizeX*2, this.mPosY, "absolute");
            this.mCurrentPage+=direction;
            this.mPages[this.mCurrentPage].object.show();
            $(this.mDomEvenPages).show();
            var value = "+=" + getValueWithUnits(this.mPageSizeX);
            gCurrentAnimationSpeed = this.mAnimSpeed;
            $(this.mDomPages).animate({left : value}, gCurrentAnimationSpeed, this.oddToEvenCallback());       
        }


}

/**
 * Called when sliding an animation is finished - fast switch of panel position as
 * prepare for the next Animation
 */
asdf_PagePanel.prototype.evenToOddCallback = function(){

    //$(this.mDomEvenPages).hide();
    //setObjectPosition(this.mDomEvenPages, 0, 0, "absolute");
    //setObjectPosition(this.mDomEvenPages, this.mPageSizeX, this.mPosY, "absolute");
    //setObjectPosition(this.mDomOddPages, 0,0, "absolute");

}

/**
 * Called when sliding an animation is finished - fast switch of panel position as
 * prepare for the next Animation
 */
asdf_PagePanel.prototype.oddToEvenCallback = function(){

    //$(this.mDomOddPages).hide();
    //setObjectPosition(this.mDomOddPages, 0, 0, "absolute");
    //setObjectPosition(this.mDomOddPages, this.mPageSizeX, this.mPosY, "absolute");
    //setObjectPosition(this.mDomEvenPages, 0,0, "absolute");

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
    if(elem.type != "PagePanel"){
        if(globals.debug > 0 )
            alert("Error: getPages(): getPages not supported on : " + elem.type);
        return null;
    }
    
    var pageNames = elem.pages;
    var pages = new Array();
    for(var i = 0; i < pageNames.length; i++){
        var name = pageNames[i];
        if(elem.children[name] != null && elem.children[name] != undefined)
            pages[pages.length] = elem.children[name];
    }
    
    return pages;
}
//*};
