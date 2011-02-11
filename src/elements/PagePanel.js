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
 * \param: animationSpeed int		speed for the page change Animation
 * \param: pages        jsonObject[] all Pages
 * \param: spacing      int			distance between pages
 * \param: orientation  int			orentation of the panel can be horizontal oder vertical
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_PagePanel(_id, _parent, positionX, positionY, bgColor, width , height, animationSpeed, pages, positionType, spacing, orientation, extra_css_class, initialShow, zIndex){
    
    
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

    if(positionX == null || positionX == undefined){
        if(globals.debug > 1)
           alert("Warning: PagePanel: positionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null || positionY == undefined){
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
    
    
    if(pages == null){
        if(globals.debug > 0)
            alert("PagePanel: Error on PagePanel : " + this.mId + " cannot create PagePanel without Pages - cancel!!");
        return null;
    }
    if(animationSpeed == null)
        this.mAnimationSpeed = globals.defaultAnimtionSpeed;
    else    
        this.mAnimationSpeed = animationSpeed;
   
	if(orientation == null || orientation == undefined){
		if(globals.debug > 2)
			alert("Warning: PagePanel: orientation on Panel: " + this.mId + " is not set - set horizontal");
		this.mOrientation = "horizontal";
	} else if(orientation != "vertical" && orientation != "horizontal"){
		if(globals.debug > 1)
			alert("Warning: PagePanel: Orientation is set to an unknown value" + orientation + "\n on Panel: " + this.mId +"please set it to <horizontal> or <vertical>\n");
			
			this.mOrientation = "horizontal";
	} else
		this.mOrientation = orientation
    
    if(spacing == null || spacing == undefined){
    	if(globals.debug > 2)
    		alert("Warning: PagePanel spacing is not set on Panel: " + this.mId + " - take default value 5");
    	this.mSpacing = 5;
    } else
    	this.mSpacing = spacing;
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
    
    this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.mExtraClassCSS);
    this.mDomPageBorder = createDomObjectDOM(this, this.mDomTreeObject, (this.mId + "_pagesBorder"), "div", this.mType, this.mExtraClassCSS);
    this.mDomPages = createDomObjectDOM(this, this.mDomPageBorder, (this.mId + "_pages"), "div", this.mType, this.mExtraClassCSS);
    
    this.mDomTreeObject.style.position = this.mPositionType;
    this.mDomPageBorder.style.position = this.mPositionType;
    this.mDomPages.style.position = this.mPositionType;
    this.mDomPageBorder.style.overflow = "hidden";
    this.setPosition(this.mPosX, this.mPosY);
    this.setSize(this.mWidth, this.mHeight);
    
    this.mPageSizeX = this.mWidth;
    this.mPageSizeY = this.mHeight;
    this.mPagePosX = 0;
    this.mPagePosY = 0;
    $(this.mDomPages).show();   
    this.initPages();

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
 * Function create a count of divs which are the parents for pages
*/
asdf_PagePanel.prototype.initPages = function(){
	this.mDomPagesArray = new Array();
	for(var i=0; i < this.mPages.length; i++){
		var pageId = this.mId + "_page_" + i ;
		var page = createDomObjectDOM(this, this.mDomPages, pageId, "div", this.mType, this.mExtra_css_class);
		page.style.position = "absolute";
		if(this.mOrientation == "horizontal"){
			page.style.left = getValueWithUnits(this.mSpacing, "px");
			page.style.top = "0px";
		} else { // is vertical
			page.style.top = getValueWithUnits(this.mSpacing, "px");
			page.style.left = "0px";
		}
		this.mDomPagesArray.push(page);
	}
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
    setObjectPosition(this.mDomPageBorder, 0, 0, "absolute", "px", "px");
    

}

asdf_PagePanel.prototype.setSize = function(sizeX, sizeY){
    this.mWidth = sizeX;
    this.mHeight = sizeY;
    setObjectSize(this.mDomPages, this.mWidth, this.mHeight, this.mUnitW, this.mUnitH);
    setObjectSize(this.mDomTreeObject, this.mWidth, this.mHeight, this.mUnitW, this.mUnitH);   
    setObjectSize(this.mDomPageBorder, this.mWidth, this.mHeight, this.mUnitW, this.mUnitH);   

    
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
        
		if(parent != this.mDomTreeObject){ // we've added a page
		    // init child
		    child.object.show();
			// update parent size
		    parent.style.width = child.object.mDomTreeObject.style.width;
		    parent.style.height = child.object.mDomTreeObject.style.height;
   			if(child.object.mInitialShow == false)
   				child.object.hide();
			if(this.mOrientation == "horizontal"){
				var newWidth = getValueWithoutUnits(this.mDomPages.style.width) + getValueWithoutUnits(parent.style.width);
	   			this.mDomPages.style.width = getValueWithUnits(newWidth, "px");
	   		} else{
				var newHeight = getValueWithoutUnits(this.mDomPages.style.height) + getValueWithoutUnits(parent.style.height);
	   			this.mDomPages.style.height = getValueWithUnits(newHeight, "px");
	   		}
	   		this.refresh();
		} else{ // added normal child
			if(child.object.mInitialShow != false)
		    	child.object.show();
		    else
		    	child.object.hide();
		}
			
 
    }
   
    
}

/**
 * this function calculate size of each page and arrange the Rest
 */
asdf_PagePanel.prototype.refresh = function(child){
	var posX = 0; 
	var posY = 0;
	for(var i=0; i < this.mDomPagesArray.length; i++){
		var page = this.mDomPagesArray[i];
		page.style.left = getValueWithUnits(posX, "px");
		page.style.top = getValueWithUnits(posY, "px");
		if(this.mOrientation == "horizontal"){
			posX += getValueWithoutUnits(this.mSpacing) + getValueWithoutUnits(page.style.width);
		} else {
			posY += getValueWithoutUnits(this.mSpacing) + getValueWithoutUnits(page.style.height);
		}
	}
}
/**
 * check where the childObject should be added in DomTree
 */
asdf_PagePanel.prototype.getParent = function(child){
    for(var i=0; i< this.mPages.length; i++){ // check if child is a Page 
        if(this.mPages[i].id == child.id){ // is an Page
            return this.mDomPagesArray[i];
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
    var pageNumber = 1;
    if(params.parameter.length == 2)
    	pageNumber = Number(params.parameter[1]);
    
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
        case "showPage":
        	this.showPage(pageNumber-1);
        break;
        default:
            if(globals.debug > 1)
                alert("PagePanel: action name: " + actionName + " unknown!");
        break;
    }
}

/**
 * Functions change the Panel Content animated
 * @param: direction    +1/-1   direction to change the Pages
 */
asdf_PagePanel.prototype.changePage = function(direction){
    if(direction != -1 && direction != 1){
    	if(globals.debug > 0)
    		alert("Error: PagePanel: "  + this.mId + " get wrong changePage direction: " + direction);
    	return;
    }
    var lastPage = this.mCurrentPage == this.mPages.length-1;
    var firstPage = this.mCurrentPage == 0;
    if(lastPage && direction > 0) // cannot go any further - return
        return;
    if(firstPage && direction < 0) // cannot go any further - return
        return;        

	var page = this.mDomPagesArray[this.mCurrentPage];
	var move = 0;
	if(this.mOrientation == "horizontal"){
		move = page.style.width;
	} else 
		move = page.style.height;

	move = getValueWithoutUnits(move) ;
	// make an relative +=Value or -=Value
	if(direction > 0){
		move = "-=" + getValueWithUnits(move, "px");
	} else {
		move = "+=" + getValueWithUnits(move, "px");
	}
	
	this.mCurrentPage += direction;
	gCurrentAnimationSpeed = this.mAnimSpeed;
	        	
	if(this.mOrientation == "horizontal"){
	    $(this.mDomPages).animate({"left" : move}, gCurrentAnimationSpeed, this.animationCallback);
	} else 
		$(this.mDomPages).animate({"top" : move}, gCurrentAnimationSpeed, this.animationCallback);
	
}

/**
 * jump directly to given page
 */
 asdf_PagePanel.prototype.showPage = function(pageNumber){
 	var page = this.mDomPagesArray[this.mCurrentPage];
	var move = 0;
	if(this.mOrientation == "horizontal"){
		move = page.style.width;
	} else 
		move = page.style.height;
		
	var pageDiff = pageNumber - this.mCurrentPage;
	this.mCurrentPage += direction * pageDiff;
	        	
	if(this.mOrientation == "horizontal"){
	    this.mDomPages.style.left += move;
	} else 
		this.mDomPages.style.top += move;
 }
 
/**
 * Called when sliding an animation is finished 
 */
asdf_PagePanel.prototype.animationCallback = function(){
    // ACHTUNG: this is pointing to mDomPages - dont ask me why - ask f*** jQuery
	
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
    if(elem.type != "PagePanel" && elem.type != "AccordionPanel" && elem.type != "HVPanel"){
        if(globals.debug > 0 )
            alert("Error: getPages(): getPages not supported on : " + elem.type);
        return null;
    }
    
    
    var pageNames = elem.pages;
    var pages = new Array();
    if(elem.children == null){
    	if(globals.debug > 0)
    		alert("Error: element.children is null on: " + elem.id + " - cancel");
    	return  ( new Array() ) ;
    	
    } 
    for(var i = 0; i < pageNames.length; i++){
        var name = pageNames[i];
        if(elem.children[name] != null && elem.children[name] != undefined)
            pages.push(elem.children[name]);
    }
    
    return pages;
}
//*};
