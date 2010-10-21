/**
 * Base Class for all Buttons
 */
//* class Button{
function Button(_id, _parent, positionX, positionY, image_normal, image_active, image_hover, extra_css_class){
    
    
    //* public: 
    if(_id == null){

      if(globals.debug > 0)
           alert("Button: Id is not set - cancel");
        return null;
    }

    if(_parent == null){

        if(globals.debug > 0)
            alert("Button: Parent is null - cancel");
        return null;
    }

    if(image_normal == null){
        if(globals.debug > 0)
           alert("Button: Image_normal is not set - cancel");
        return null;
    }
    
    if(image_active == null){
        image_active = image_normal;

    }
    
    if(image_hover == null){
        image_hover = image_active;
        return;
    }    

    this.mId = _id;
    this.mImageNormal   = image_normal;
    this.mImageHover   = image_hover;
    this.mImageActive   = image_active;
    this.mParent        = _parent; 
    this.mType          = "Button";

    if(positionX == null)
        this.mPosX = 0;
    else
        this.mPosX      = positionX;

    if(positionY == null)
        this.mPosY = 0;
    else
        this.mPosY      = positionY;
    
    if(extra_css_class == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    

    this.mDomTreeObject = createDomObject(this, this.mId, "img", this.mType, this.extra_css_class, this.mImageNormal);

    // set Position
    this.mDomTreeObject.style.left = this.mPosX + "px";
    this.mDomTreeObject.style.top = this.mPosY + "px";
    
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
    
    this.registerOnMouseOverEvent(this.setHoverImage);
    this.registerOnMouseOutEvent(this.unsetHoverImage);
    this.mActice = false;
    
    
    return this;
}



/**
 * instant hide Button
 */
Button.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show Button
 */
Button.prototype.show = function(){
    $(this.mDomTreeObject).show();
}

Button.prototype.setActiveImage = function(){
    //object = event.currentTarget.nextNode;
    this.mActice = true;
    this.mDomTreeObject.src = this.mImageActive;
}

Button.prototype.setNormalImage = function(){
    this.mActice = false;
    this.mDomTreeObject.src = this.mImageNormal;
}


Button.prototype.setHoverImage = function(params){
    if(object.mActice)
        return;
    object = params.event.currentTarget.nextNode;
    object.mDomTreeObject.src = object.mImageHover;
}

Button.prototype.unsetHoverImage = function(params){
    object = params.event.currentTarget.nextNode;
    if(object.mActice)
        return;
    object.mDomTreeObject.src = object.mImageNormal;
}

Button.prototype.specificAction = function(params){
    actionName = params.parameter[0];
    object = params.event.currentTarget.nextNode;
    switch(actionName){
        case "activate":
            object.setActiveImage();
        break;
        case "deactivate":
        break;
        case "default":
            if(globals.debug > 0)
                alert("Button: action name: " + actionName + " unknown!");
        break;
    }
}

function onMouseOver(event){
    object = event.currentTarget.nextNode;
    for(var i=0; i< object.mMouseOverEvents.length; i++){
        params = new EventParameter();
        params.parameter = object.mMouseOverParams[i];
        params.event = event;
        object.mMouseOverEvents[i](params);
    }
}

function onMouseOut(event){
    object = event.currentTarget.nextNode;
    for(var i=0; i< object.mMouseOutEvents.length; i++){
        params = new EventParameter();
        params.parameter = object.mMouseOutParams[i];
        params.event = event;
        object.mMouseOutEvents[i](params);
    }
}

function onMouseClick(event){
    object = event.currentTarget.nextNode;
    for(var i=0; i< object.mMouseClickEvents.length; i++){
        params = new EventParameter();
        params.parameter = object.mMouseClickParams[i];
        params.event = event;
        object.mMouseClickEvents[i](params);
    }
}

Button.prototype.registerOnMouseOverEvent = function(functionName, params){
    if(params == null)
        params = new EventParameter();
    this.mMouseOverEvents[this.mMouseOverEvents.length] = functionName;
    this.mMouseOverParams[this.mMouseOverParams.length] = params;

}

Button.prototype.registerOnMouseClickEvent = function(functionName,  params){
    if(params == null)
        params = new Array();
        
    this.mMouseClickEvents[this.mMouseClickEvents.length] = functionName;
    this.mMouseClickParams[this.mMouseClickParams.length] = params;
}

Button.prototype.registerOnMouseOutEvent = function(functionName,  params){
    if(params == null)
        params = new Array();
        
    this.mMouseOutEvents[this.mMouseOutEvents.length] = functionName;
    this.mMouseOutParams[this.mMouseOutParams.length] = params;
    
}
//*};
