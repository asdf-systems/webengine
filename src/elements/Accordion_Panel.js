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
 * \param: collapse     bool        Say if one element has to be open all time or not
 * \param: pages        jsonObject[] Childs that represent the cont in order header,page, header,page and so on
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_AccordionPanel(_id, _parent, positionX, positionY, bgColor, width , height, extra_css_class, collapse, pages, initialShow, zIndex){
    
    
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

    if(collapse == null || collapse == undefined)
        this.mCollapse = false;
    else
        this.mCollapse = collapse;
    
    if(pages == null || pages == undefined){
         if(globals.debug > 1)
           alert("Warning: AccordionPanel: " +this.mId+ " is without pages\n");
         this.mPages  = new Array();
         this.mHeader = new Array();
    } else {
        setHeaderAndPages(pages);
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
    this.setAccordion();
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
 * instant hide Panel
 */
asdf_AccordionPanel.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
   this.hideChildren();
   this.setSize(0,0);

}

asdf_AccordionPanel.prototype.hideChildren = function(){
    for(var i = 0; i < this.mChildren.length; i++){
        var child = this.mChildren[i];
        child.object.hide();
    }

}

asdf_AccordionPanel.prototype.showChildren = function(){
    for(var i = 0; i < this.mChildren.length; i++){
        var child = this.mChildren[i];
        if(child.object.mInitialShow != false)
            child.object.show();
        else
            child.object.hide();
    }
    this.updateSize();
}
/**
 * Function set Position for element
 * @param int posX  position X
 * @param int posY  position Y
 */
asdf_AccordionPanel.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY);

}

asdf_AccordionPanel.prototype.setSize = function(sizeX, sizeY){
    this.mWidth = sizeX;
    this.mHeight = sizeY;
    setObjectSize(this.mDomTreeObject, this.mWidth, this.mHeight);

    
}

/**
 * return size of the Element
 * @return sizeX, sizeY
 */
asdf_AccordionPanel.prototype.getSize = function(){

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
asdf_AccordionPanel.prototype.updateSize = function(){

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
 * instant show Panel
 */
asdf_AccordionPanel.prototype.show = function(){

    $(this.mDomTreeObject).show();
    this.mDomTreeObject.style.background = this.mBgColor;
    setObjectSize( this.mDomTreeObject, this.mWidth, this.mHeight);
    this.showChildren();
    this.mDomTreeObject.style.zIndex = this.mZIndex;
    this.updateSize();
    this.create();

}

/**
 * activate jQueryUI accordion
 */
asdf_AccordionPanel.prototype.setAccordion() = function(){

  	//$("#accordion").accordion({ header: ".header",  collapsible: this.mCollapse});
  	$(this.mDomTreeObject).accordion({ header: ".header",  collapsible: this.mCollapse});
}



/**
 * create all needeed sub <div>s for Accordion segments
 */
asdf_AccordionPanel.prototype.create = function(){

    this.mSegements = new Array();
    for(var i=0; i < this.mHeader.length; i++){
        var segment =  createDomObjectDOM(this, this.mDomTreeObject, (this.mId + "_segment_"+i), "div", this.mType, this.extra_css_class); 
        this.mDomSegments.push(segment);
    }
    this.setAccordion();

}

/**
 * read out pages and divide them into header an pages pair by pair
 * started from create();
 */
asdf_AccordionPanel.prototype.setHeaderAndPages = function(pages){
    this.mPages = new Array();
    this.mHeader = new Array();
    if(pages.length() %2 != 0){
        if(globals.debug > 0)
            alert("Error AccordionPanel "+this.mId+" has odd number of pages.\n That means that there is an header without body - cancel");
        return null;
    }
    
    for(var i=0; i < pages.size(); i+=2){
        this.mHeader.push(pages[i]);
        this.mPages.push(pages[i+1]);
    }
    

}



/**
 * Add Child to the DomTree and save as Child
 * @param child     jsonElement     childElement to addd
 */
asdf_AccordionPanel.prototype.addChild = function(child){
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
asdf_AccordionPanel.prototype.getParent = function(child){

    //check if child is an Header or Page
    for(var i=0; i< this.mHeader.length; i++){
        boolean flag = false;
        if(this.mHeader[i].id == child.id){
            $(this.mHeader.object.mDomTreeObject).addClass("asdf_accordion_header");
            flag = true;
            
        } else if (this.mPages[i] == child.id){
            flag = true;
        }
        
        if(flag){
            return this.mDomSegments[i];
        }
    }
    
    return this.mDomTreeObject;    
}



/**
 * Start Panel Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_AccordionPanel.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    //object = params.event.currentTarget.nextNode;
    switch(actionName){
        default:
            // check if children has action
            for(var i =0; i< this.mChildren.length; i++){
                this.mChildren[i].object.specificAction(params);  
            }
            //if(globals.debug > 0)
              //  alert("Panel: action name: " + actionName + " unknown!");
        break;
    }
}


/**
 * Adds an Function that is called everytime Mouse is over the Panel
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_AccordionPanel.prototype.registerOnMouseOverEvent = function(functionName, params){
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
asdf_AccordionPanel.prototype.registerOnMouseClickEvent = function(functionName,  params){
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
asdf_AccordionPanel.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
