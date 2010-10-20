/**
 * Base Class for all Elements
 */
//* class Element{
function Element(id, parent, positionX, positionY, extra_css_class){
    
    //* public: 
    if(id == null){
        //! \todo some error output
        return;
    }

    if(parent == null){
        //! \todo some error out
        return;
    }

    this.mParent        = parent; 
    this.mType          = "Element";

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

    this.mDomTreeObject = createDomObject("div", mId, mType, extra_css_class);
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
 * instant hide Element
 */
Element.prototype.hide = function(){
    $(this.mDomTreeObject).hide();
}

/**
 * instant show Element
 */
Element.prototype.show = function(){
    $(this.mDomTreeObject).show();
}

Element.prototype.specificAction = function(actionName){
    switch(actionName){
        case default:
            //! \todo make some error Output
        break;
    }
}

Element.prototype.onMouseOver(event){
    for(f in this.mMouseOverEvents){
        f(event);
    }
}

Element.prototype.onMouseOut(event){
    for(f in this.mMouseOutEvents){
        f(event);
    }
}

Element.prototype.onMouseClick(event){
    for(f in this.mMouseClickEvents){
        f(event);
    }
}

Element.prototype.registerOnMouseOverEvent(functionName){
    
}

Element.prototype.registerOnMouseClickEvent(functionName){
    $(this.mDomTreeObject).click(functionName);
}

Element.prototype.registerOnMouseOutEvent(functionName){
    $(this.mDomTreeObject).mouseout(functionName);
}
//*};
