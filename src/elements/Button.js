/**
 * Base Class for all Buttons
 */
//* class Button{
function Button(id, parent, positionX, positionY, image_normal, image_active, image_hover, extra_css_class){
    
    //* public: 
    if(id == null){
        //! \todo some error output
        return;
    }

    if(parent == null){
        //! \todo some error out
        return;
    }

    if(image_normal == null){
        //! \todo some error out
        return;
    }
    
    if(image_active == null){
        //! \todo some error out
        return;
    }
    
    if(image_hover == null){
        //! \todo some error out
        return;
    }    

    this.mImageNormal   = image_normal;
    this.mImageHover   = image_hover;
    this.mImageActive   = image_active;
    this.mParent        = parent; 
    this.mType          = "Button";

    if(positionX == null)
        this.mPosX = 0;
    else
        this.mPosX      = positionX;

    if(positionY == null)
        this.mPosY = 0;
    else
        this.mPosY      = positionY;
    
    if(extra_class_css == null)
        this.mExtraClassCSS = "EXTRA_NOTSET";
    else    
        this.mExtraClassCSS = extra_css_class;

    this.mDomTreeObject = createDomObject("img", mId, mType, extra_css_class, mImageNormal);
    // set Position
    mDomTreeObject.style.left = mPosX + "px";
    mDomTreeObject.style.top = mPosY + "px";
    
    //* private:
    this.mMouseOverEvents;
    this.mMouseOutEvents;
    this.mMouseClickEvents;
    $(this.mDomTreeObject).mouseover(this.onMouseOverEvent);
    $(this.mDomTreeObject).mouseout(this.onMouseOutEvent);
    $(this.mDomTreeObject).mouseclick(this.onMouseClickEvent);
    
    mMouseClickEvents[0] = test;
}


function test(event){
    alert("test");
    alert(event.currentTarget.id);
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

Button.prototype.specificAction = function(actionName){
    switch(actionName){
        case "default":
            //! \todo make some error Output
        break;
    }
}

Button.prototype.onMouseOver = function(event){
    for(f in this.mMouseOverEvents){
        f(event);
    }
}

Button.prototype.onMouseOut = function(event){
    for(f in this.mMouseOutEvents){
        f(event);
    }
}

Button.prototype.onMouseClick = function(event){
    for(f in this.mMouseClickEvents){
        f(event);
    }
}

Button.prototype.registerOnMouseOverEvent = function(functionName){
    mMouseOverEvents[mMouseOverEvents.size] = functionName;
}

Button.prototype.registerOnMouseClickEvent = function(functionName){
    mMouseClickEvents[mMouseClickEvents.size] = functionName;
}

Button.prototype.registerOnMouseOutEvent = function(functionName){
    mMouseOutEvents[mMouseOutEvents.size] = functionName;
}
//*};
