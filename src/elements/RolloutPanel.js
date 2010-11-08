/**
 * Creates an RolloutPanel is only an placing Element without any visible Elements
 * In Contrast to normal Elements RolloutPanels load DomObject onInit not on Show
 */
//* class RolloutPanel{
/**
 * \param: _id          string      unique Id for the Element (used also for the HTML elements)
 * \param: _parent      Element     parent Element (need to know where HTML elements add to)
 * \param: positionX    int         x Position of the RolloutPanel - relative to parent
 * \param: positionY    int         y Position of the RolloutPanel - relative to parent
 * \param: extra_css    string      Name of extra css_classes for the HTML Object
 */
function asdf_RolloutPanel(_id, _parent, positionX, positionY, animationSpeed, extra_css_class){
    
	//! \todo add BGColor width and height - not in because working offline    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("RolloutPanel: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("RolloutPanel: Parent is null - cancel");
        return null;
    }

   

    this.mId = _id;
    this.mParent        = _parent; 
    this.mType          = "RolloutPanel";

    if(positionX == null){
        if(globals.debug > 1)
           alert("Warning: RolloutPanel: positionX is not set");
        this.mPosX = 0;
    }
    else
        this.mPosX      = positionX;

    if(positionY == null){
        if(globals.debug > 1)
           alert("Warning: RolloutPanel: positionY is not set");
        this.mPosY = 0;
    }
    else
        this.mPosY      = positionY;
    
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    if(animationSpeed == null){
    	this.mAnimationSpeed = globals.standartAnimSpeed:
    } else
    	this.mAnimationSpeed = animationSpeed;

    this.mDomTreeObject = createDomObject(this, this.mId, "div", this.mType, this.extra_css_class);
    
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
    
	var params = new EventParameter();
	params.parameter[0] = this.mId;
	params.parameter[1] = "rollup";
    this.registerOnMouseOutAction(this.specificAction, params);
    
    return this;
}



/**
 * instant hide RolloutPanel
 */
asdf_RolloutPanel.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show RolloutPanel
 */
asdf_RolloutPanel.prototype.show = function(){

    $(this.mDomTreeObject).show();
}

/**
 * Start RolloutPanel Specific actions. ActionName has to be set on first element of params.parameter
 * \param params    EventParameter
 */
asdf_RolloutPanel.prototype.specificAction = function(params){
    actionName = trimString(params.parameter[0]);
	//! \todo implement to lower or check if exists
    actionName = toLower(actionName);
    object = params.event.currentTarget.nextNode;
    switch(actionName){
		case "rollout": // no break for runthrough
		case "down":
		case "slidedown":
			this.show();
			$(this.mDomTreeObject).slideUp(this.mAnimationSpeed, this.rollDownCallback);
		break;
		case "rollup":
		case "up":
		case "slideup":
			$(this.mDomTreeObject).slideUp(this.mAnimationSpeed, this.rollUpCallback);
		break;
        default:
            if(globals.debug > 0)
                alert("RolloutPanel: action name: " + actionName + " unknown!");
        break;
    }
}

/**
  * function called if animation for rollup is finished
  */
asdf_RolloutPanel.prototype.rollDownCallback = function (){
	
}

/**
  * function called if animation for rollup is finished
  */
asdf_RolloutPanel.prototype.rollUpCallback = function (){
	this.hide();
}
/**
 * Adds an Function that is called everytime Mouse is over the RolloutPanel
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_RolloutPanel.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

/**
 * Adds an Function that is called everytime RolloutPanel is clicked
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_RolloutPanel.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

/**
 * Adds an Function that is called everytime Mouse leave the RolloutPanel
 * \param: functionName    string           Name of the Function
 * \param: params          EventParameter   Parameter for the called functions
 */
asdf_RolloutPanel.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new EventParameter();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
