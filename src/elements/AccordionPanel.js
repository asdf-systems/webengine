/**
 * Creates an Panel is only an placing Element without any visible Elements
 * In Contrast to normal Elements Panels load DomObject onInit not on Show
 * NOT ALLOWED TO HAVE WIDTH AND HIGHT - THIS WILL BE HANDLED BY JQUERY
 */
//* class Panel{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the Panel - relative to parent
 * \param: positionY    int         y Position of the Panel - relative to parent
 * \param: bgColor      colorHex    bgColor of the Element : Default: transparent
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 * \param: collapse     bool        Say if one element has to be open all time or not
 * \param: pages        jsonObject[] Childs that represent the cont in order header,page, header,page and so on
 * \param: initialShow  bool        state if child should be shwon if parent is show
 * \param: z-Index      int         number to show in fore or background - higer is more in Front
 */
function asdf_AccordionPanel(_id, _parent, positionX, positionY, bgColor, positionType, startPage, extra_css_class, collapse, pages, initialShow, zIndex){
    
    
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
    this.mType          = "Accordion";

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
        
    this.mUnitX = getUnit(this.mPosX);
    this.mUnitY = getUnit(this.mPosY);
    
    if(positionType == undefined || positionType == null){
        if(globals.debug > 2 )
            alert("Warning: PositionType on Element: " + this.mId + " is not set\n");
        this.mPositionType = "absolute";
    } else{
        this.mPositionType = positionType;
    }
    
    
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
        this.setHeaderAndPages(pages);
    }
    
    if(startPage == null || startPage == undefined){
        if(globals.debug > 2)
            alert("Startpage not set: " + this.mID + "Accordion. Set to false.");
        this.mStartPage = false;
    } else
        this.mStartPage = startPage;
    
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

        
    this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.mExtraClassCSS);
    this.mDomTreeObject.style.position = this.mPositionType;
    this.mChildren = new Array();
    // set Position
    this.setPosition(this.mPosX, this.mPosY);
    this.create();
    

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
    
    /*$(this.mDomTreeObject).bind('accordionchange', function(event, ui) {
		$(this.mDomTreeObject).accordion("resize");
});*/

    return this;
}



/**
 * instant hide Panel
 */
asdf_AccordionPanel.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
   this.hideChildren();
   //this.setSize(0,0);

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
    //this.updateSize();
}
/**
 * Function set Position for element
 * @param int posX  position X
 * @param int posY  position Y
 */
asdf_AccordionPanel.prototype.setPosition = function(posX, posY){
    this.mPosX = posX;
    this.mPosY = posY;
    setObjectPosition(this.mDomTreeObject, this.mPosX, this.mPosY, this.mPostionType, this.mUnitX, this.mUnitY);

}

asdf_AccordionPanel.prototype.setSize = function(sizeX, sizeY){
    // Dummy function for compatibility with engine- Jquery will handle the with and Height do not fill in stuff!!    
}

/**
 * return size of the Element
 * @return sizeX, sizeY
 */
asdf_AccordionPanel.prototype.getSize = function(){

    // Dummy function for compatibility with engine- Jquery will handle the with and Height do not fill in stuff!!    
    var ret = new Size(0, 0);
    return ret;
}

/**
 * check the needed Size based on Child size and position
 * and resize if needen
 */
asdf_AccordionPanel.prototype.updateSize = function(){
     // Dummy function for compatibility with engine- Jquery will handle the with and Height do not fill in stuff!!    
  
    
}

/**
 * instant show Panel
 */
asdf_AccordionPanel.prototype.show = function(){

    $(this.mDomTreeObject).show();
    this.mDomTreeObject.style.background = this.mBgColor;
    
    this.showChildren();
    this.mDomTreeObject.style.zIndex = this.mZIndex;
    //this.updateSize();

}

/**
 * activate jQueryUI accordion
 */
asdf_AccordionPanel.prototype.setAccordion = function(){

  	//$("#accordion").accordion({ header: ".header",  collapsible: this.mCollapse});
    //$(this.mDomTreeObject).accordion('destroy');
    //var headerString = "." + this.mId + "_asdf_accordion_header";
    //var headerString = headerString.replace(/\//g, "_");
  	//$(this.mDomTreeObject).accordion({ header:  headerString, collapsible: this.mCollapse, autoHeight : false, clearStyle : true});
  	$(this.mDomTreeObject).accordion({ collapsible: this.mCollapse, autoHeight : false, clearStyle : true});
  	

}



/**
 * create all needeed sub <div>s for Accordion segments
 */
asdf_AccordionPanel.prototype.create = function(){

    this.mDomSegments = new Array();
    this.mDomSegmentsHeader = new Array();
    this.mDomSegmentsContent = new Array();
    for(var i=0; i < this.mHeader.length; i++){
        //var segment =  createDomObjectDOM(this, this.mDomTreeObject, (this.mId + "_segment_"+i), "div", this.mType, this.mExtraClassCSS); 
        var header =  createDomObjectDOM(this, this.mDomTreeObject, (this.mId + "_segmentHeader_"+i), "div", this.mType, this.mExtraClassCSS); 
        var content =  createDomObjectDOM(this, this.mDomTreeObject, (this.mId + "_segmentBody_"+i), "div", this.mType, this.mExtraClassCSS); 
        //setObjectPosition(segment, 0, 0, "relative", "px", "px");
        setObjectPosition(header, 0, 0, "relative", "px", "px");
        setObjectPosition(content, 0, 0, "relative", "px", "px");
        
        var headerString = this.mId + "_asdf_accordion_header";
        var headerString = headerString.replace(/\//g, "_");
        //this.mDomSegments.push(segment);
        this.mDomSegmentsHeader.push(header);
        this.mDomSegmentsContent.push(content);
        //segment.style.zIndex = Number(this.mZIndex)+1;
        header.style.zIndex = Number(this.mZIndex)+10;
        content.style.zIndex = Number(this.mZIndex)+1;
        //content.style.height = "auto";
        $(header).addClass(headerString);        
    }
    this.setAccordion();
    /*if(this.mStartPage != false)
        this.mStartPage = Number(this.mStartPage)-1;
    $(this.mDomTreeObject).accordion("activate", this.mStartPage);*/

}

/**
 * read out pages and divide them into header an pages pair by pair
 * started from create();
 */
asdf_AccordionPanel.prototype.setHeaderAndPages = function(pages){
    this.mPages = new Array();
    this.mHeader = new Array();
    if(pages.length %2 != 0){
        if(globals.debug > 0)
            alert("Error AccordionPanel "+this.mId+" has odd number of pages.\n That means that there is an header without body - cancel");
        return null;
    }
    
    for(var i=0; i < pages.length; i+=2){
        this.mHeader.push(pages[i]);
        this.mPages.push(pages[i+1]);
    }
    

}



/**
 * Add Child to the DomTree and save as Child
 * @param child     jsonElement     childElement to addd
 */
asdf_AccordionPanel.prototype.addChild = function(child){

     if(child.object == null){ // child not initialised yet
         this.initChild(child);

        
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
        
        // this function is modded by us and does only the resize
        //$(this.mDomTreeObject).accordion("updateSize", $(child.object.mDomTreeObject)); 
        //$(this.mDomTreeObject).accordion("resize");
        //$(this.mDomTreeObject).accordion("resize");
        //$(child.object.mDomTreeObject).accordion("resize");
        
        
    }
   
    
}


/**
 * check where the childObject should be added in DomTree
 */
asdf_AccordionPanel.prototype.initChild = function(child){

    //check if child is an Header or Page
    for(var i=0; i< this.mHeader.length; i++){
        var flag = false;
        if(this.mHeader[i].id == child.id){
            if(child.object == null) // child not initialised yet
                init(child, this.mDomSegmentsHeader[i]);
            this.mChildren[this.mChildren.length] = child;
            child.object.show();
            setObjectPosition(child.object.mDomTreeObject, child.object.mPosX, child.object.mPosY, "relative", child.object.mUnitX, child.object.mUnitY);
            //setObjectPosition(child.object.mDomTreeObject, 0, 0, "relative", "px", "px");
            
            return;
                   
        } else if(this.mPages[i].id == child.id){
             if(child.object == null) // child not initialised yet
                init(child, this.mDomSegmentsContent[i]);
            this.mChildren[this.mChildren.length] = child;
            child.object.show();
            setObjectPosition(child.object.mDomTreeObject, child.object.mPosX, child.object.mPosY, "relative", child.object.mUnitX,  child.object.mUnitY);
            //setObjectPosition(child.object.mDomTreeObject, 0, 0, "relative", "px", "px");
            return;
        }
        
 
    }
    
    if(child.object == null) // child not initialised yet
         init(child, this.mDomTreeObject);
    this.mChildren[this.mChildren.length] = child;

    return;    
}



/**
 * Start Panel Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_AccordionPanel.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    //object = params.event.currentTarget.nextNode;
    var pageNumber = 0;
    if(params.parameter.length == 2){
        pageNumber = Number(params.parameter[1]);
    }
    switch(actionName){
	   case "close":
	       	$(this.mDomTreeObject).accordion("activate", false);
		break;
		case "show":
          var currentPage = $(this.mDomTreeObject).accordion("option","active");  
          if(currentPage != pageNumber)
    		  $(this.mDomTreeObject).accordion("option","active",Number(pageNumber));
        break;
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
