
function asdf_Button(_id,_parent,positionX,positionY,image_normal,image_active,image_hover,width,height,positionType,alt_key,extra_css_class,initialShow,zIndex){if(_id==null){if(globals.debug>0)
alert("Button: Id is not set - cancel");return null;}
if(_parent==null){if(globals.debug>0)
alert("Button: Parent is null - cancel");return null;}
if(image_normal==null){if(globals.debug>0)
alert("Button: Image_normal is not set - cancel "+_id);return null;}
if(image_active==null){image_active=image_normal;}
if(image_hover==null){image_hover=image_active;}
if(width==null||width=="")
this.mWidth="0";else
this.mWidth=width;if(height==null||height=="")
this.mHeight="0";else
this.mHeight=height;this.mUnitW=getUnit(width);this.mUnitH=getUnit(height);this.mUnitX=getUnit(this.mPosX);this.mUnitY=getUnit(this.mPosY);if(positionType==undefined||positionType==null){if(globals.debug>2)
alert("Warning: PositionType on Element: "+this.mId+" is not set\n");this.mPositionType="absolute";}else{this.mPositionType=positionType}
this.mId=_id;this.mImageNormal=image_normal;this.mImageHover=image_hover;this.mImageActive=image_active;this.mParent=_parent;this.mType="Button";if(positionX==null){if(globals.debug>1)
alert("Warning: Button: potitionX is not set");}
else
this.mPosX=positionX;if(positionY==null){if(globals.debug>1)
alert("Warning: Button: potitionY is not set");this.mPosY=0;}
else
this.mPosY=positionY;if(alt_key==null||alt_key==undefined){this.mAlt="";}else
this.mAlt=alt_key;if(extra_css_class==null)
this.mExtraClassCSS="EXTRA_NOTSET";else
this.mExtraClassCSS=extra_css_class;if(initialShow=="false")
this.mInitialShow=false;else if(initialShow!=false)
this.mInitialShow=true;else
this.mInitialShow=initialShow;if(zIndex==null||zIndex==undefined)
this.mZIndex=500;else
this.mZIndex=zIndex;this.mDomTreeObject=null;this.mMouseOverEvents=new Array();this.mMouseOutEvents=new Array();this.mMouseClickEvents=new Array();this.mMouseOverParams=new Array();this.mMouseOutParams=new Array();this.mMouseClickParams=new Array();this.registerOnMouseOverEvent(this.setHoverImage);this.registerOnMouseOutEvent(this.unsetHoverImage);this.mActive=false;return this;}
asdf_Button.prototype.hide=function(){$(this.mDomTreeObject).hide();}
asdf_Button.prototype.show=function(){if(this.mDomTreeObject==null){this.mDomTreeObject=createDomObject(this,this.mId,"img",this.mType,this.mExtraClassCSS,this.mImageNormal);this.mDomTreeObject.setAttribute("alt",this.mAlt);$(this.mDomTreeObject).mouseover(onMouseOver);$(this.mDomTreeObject).mouseout(onMouseOut);$(this.mDomTreeObject).click(onMouseClick);this.mDomTreeObject.style.position=this.mPositionType;this.setPosition(this.mPosX,this.mPosY);this.mDomTreeObject.style.zIndex=this.mZIndex;this.setSize(this.mWidth,this.mHeight);}
$(this.mDomTreeObject).show();}
asdf_Button.prototype.setPosition=function(posX,posY){this.mPosX=posX;this.mPosY=posY;setObjectPosition(this.mDomTreeObject,this.mPosX,this.mPosY,this.mPostionType,this.mUnitX,this.mUnitY);}
asdf_Button.prototype.setSize=function(sizeX,sizeY){setObjectSize(this.mDomTreeObject,sizeX,sizeY,this.mUnitW,this.mUnitH);}
asdf_Button.prototype.getSize=function(){var sizeX=getValueWithoutUnits(this.mDomTreeObject.width);var sizeY=getValueWithoutUnits(this.mDomTreeObject.height);var ret=new Size(sizeX,sizeY);return ret;}
asdf_Button.prototype.setActiveImage=function(){if(this.mDomTreeObject==null)
return;this.mActive=true;this.mDomTreeObject.src=this.mImageActive;}
asdf_Button.prototype.setNormalImage=function(){if(this.mDomTreeObject==null)
return;this.mActive=false;this.mDomTreeObject.src=this.mImageNormal;}
asdf_Button.prototype.setHoverImage=function(params){object=params.event.currentTarget.nextNode;if(object.mActive)
return;object=params.event.currentTarget.nextNode;object.mDomTreeObject.src=object.mImageHover;}
asdf_Button.prototype.unsetHoverImage=function(params){object=params.event.currentTarget.nextNode;if(object.mActive)
return;object.mDomTreeObject.src=object.mImageNormal;}
asdf_Button.prototype.specificAction=function(params){var actionName=params.parameter[0];var id=null;if(params.parameter.length>1){id=params.parameter[1];}
if(this.mId=="main/wrap/07_termine/april_header/header_btn")
var x=5;if(this.mId=="main/wrap/07_termine/april_header/arrow_btn.txt")
var x=5;switch(actionName){case"activate":if(id!=null){if(id==this.mId)
break;}
this.setActiveImage();break;case"deactivate":if(id!=null){if(id==this.mId)
break;}
this.setNormalImage();break;case"toggle_active":if(id!=null){if(id==this.mId)
break;}
if(this.mActive==false)
this.setActiveImage();else
this.setNormalImage();break;default:if(globals.debug>0)
alert("Button: action name: "+actionName+" unknown!");break;}}
asdf_Button.prototype.registerOnMouseOverEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOverEvents[this.mMouseOverEvents.length]=functionName;this.mMouseOverParams[this.mMouseOverParams.length]=params;}
asdf_Button.prototype.registerOnMouseClickEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseClickEvents[this.mMouseClickEvents.length]=functionName;this.mMouseClickParams[this.mMouseClickParams.length]=params;}
asdf_Button.prototype.registerOnMouseOutEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOutEvents[this.mMouseOutEvents.length]=functionName;this.mMouseOutParams[this.mMouseOutParams.length]=params;}
function asdf_Panel(_id,_parent,positionX,positionY,bgColor,width,height,positionType,extra_css_class,initialShow,zIndex){if(_id==null){if(globals.debug>0)
alert("Panel: Id is not set - cancel");return null;}
if(_parent==null){if(globals.debug>0)
alert("Panel: Parent is null - cancel");return null;}
this.mId=_id;this.mParent=_parent;this.mType="Panel";if(positionX==null){if(globals.debug>1)
alert("Warning: Panel: positionX is not set");this.mPosX=0;}
else
this.mPosX=positionX;if(positionY==null){if(globals.debug>1)
alert("Warning: Panel: positionY is not set");this.mPosY=0;}
else
this.mPosY=positionY;if(extra_css_class==null)
this.mExtraClassCSS="EXTRA_NOTSET";else
this.mExtraClassCSS=extra_css_class;if(bgColor==null)
this.mBgColor="transparent";else
this.mBgColor=bgColor;if(width==null||width=="")
this.mWidth="0";else
this.mWidth=width;if(height==null||height=="")
this.mHeight="0";else
this.mHeight=height;this.mUnitW=getUnit(width);this.mUnitH=getUnit(height);this.mUnitX=getUnit(this.mPosX);this.mUnitY=getUnit(this.mPosY);if(positionType==undefined||positionType==null){if(globals.debug>2)
alert("Warning: PositionType on Element: "+this.mId+" is not set\n");this.mPositionType="absolute";}else{this.mPositionType=positionType}
if(initialShow=="false")
this.mInitialShow=false;else if(initialShow!=false)
this.mInitialShow=true;else
this.mInitialShow=initialShow;if(zIndex==null||zIndex==undefined)
this.mZIndex=500;else
this.mZIndex=zIndex;this.mDomTreeObject=createDomObject(this,this.mId,"div",this.mType,this.mExtraClassCSS);this.mDomTreeObject.style.position=this.mPositionType;this.mChildren=new Array();this.setPosition(this.mPosX,this.mPosY);this.mMouseOverEvents=new Array();this.mMouseOutEvents=new Array();this.mMouseClickEvents=new Array();this.mMouseOverParams=new Array();this.mMouseOutParams=new Array();this.mMouseClickParams=new Array()
$(this.mDomTreeObject).mouseover(onMouseOver);$(this.mDomTreeObject).mouseout(onMouseOut);$(this.mDomTreeObject).click(onMouseClick);return this;}
asdf_Panel.prototype.hide=function(){$(this.mDomTreeObject).hide();this.hideChildren();}
asdf_Panel.prototype.hideChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];child.object.hide();}}
asdf_Panel.prototype.showChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];if(child.object.mInitialShow!=false)
child.object.show();else
child.object.hide();}}
asdf_Panel.prototype.setPosition=function(posX,posY){this.mPosX=posX;this.mPosY=posY;setObjectPosition(this.mDomTreeObject,this.mPosX,this.mPosY,this.mPostionType,this.mUnitX,this.mUnitY);}
asdf_Panel.prototype.setSize=function(sizeX,sizeY){this.mWidth=sizeX;this.mHeight=sizeY;setObjectSize(this.mDomTreeObject,this.mWidth,this.mHeight,this.mUnitW,this.mUnitH);}
asdf_Panel.prototype.getSize=function(){var sizeX=getValueWithoutUnits(this.mWidth);var sizeY=getValueWithoutUnits(this.mHeight);var ret=new Size(sizeX,sizeY);return ret;}
asdf_Panel.prototype.updateSize=function(){var sizeX=getValueWithoutUnits(this.mWidth);var sizeY=getValueWithoutUnits(this.mHeight);for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i].object;if(child==null)
continue;if(child.mDomTreeObject==null||child.mDomTreeObject==undefined)
continue;if(!$(child.mDomTreeObject).is(":visible"))
continue;var sz=child.getSize();x=sz.x+getValueWithoutUnits(child.mDomTreeObject.style.left);y=sz.y+getValueWithoutUnits(child.mDomTreeObject.style.top);if(x>sizeX)
sizeX=x;if(sz.y>sizeY)
sizeY=y;}
this.setSize(sizeX,sizeY);}
asdf_Panel.prototype.show=function(){$(this.mDomTreeObject).show();this.mDomTreeObject.style.background=this.mBgColor;this.setSize(this.mWidth,this.mHeight);this.showChildren();this.mDomTreeObject.style.zIndex=this.mZIndex;}
asdf_Panel.prototype.addChild=function(child){if(child.object==null){init(child,this.mDomTreeObject);this.mChildren.push(child);for(var grandChild in child.children){var thisJson=getJsonObject(this.mId);var path=getPathWithFromRoot(child.children[grandChild],thisJson);showElement(path,thisJson);}
if(child.object.mInitialShow!=false){child.object.show();}else
child.object.hide();}}
asdf_Panel.prototype.specificAction=function(params){actionName=params.parameter[0];switch(actionName){default:for(var i=0;i<this.mChildren.length;i++){this.mChildren[i].object.specificAction(params);}
break;}}
asdf_Panel.prototype.registerOnMouseOverEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOverEvents[this.mMouseOverEvents.length]=functionName;this.mMouseOverParams[this.mMouseOverParams.length]=params;}
asdf_Panel.prototype.registerOnMouseClickEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseClickEvents[this.mMouseClickEvents.length]=functionName;this.mMouseClickParams[this.mMouseClickParams.length]=params;}
asdf_Panel.prototype.registerOnMouseOutEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOutEvents[this.mMouseOutEvents.length]=functionName;this.mMouseOutParams[this.mMouseOutParams.length]=params;}
function asdf_Image(_id,_parent,positionX,positionY,width,height,src,positionType,alt_key,extra_css_class,initialShow,zIndex){if(_id==null){if(globals.debug>0)
alert("Image: Id is not set - cancel");return null;}
if(_parent==null){if(globals.debug>0)
alert("Image: Parent is null - cancel");return null;}
this.mId=_id;this.mParent=_parent;this.mType="Image";if(positionX==null){if(globals.debug>1)
alert("Warning: Image: potitionX is not set");this.mPosX=0;}
else
this.mPosX=positionX;if(positionY==null){if(globals.debug>1)
alert("Warning: Image: potitionY is not set");this.mPosY=0;}
else
this.mPosY=positionY;if(alt_key==null||alt_key==undefined){this.mAlt="";}else
this.mAlt=alt_key;if(extra_css_class==null)
this.mExtraClassCSS="EXTRA_NOTSET";else
this.mExtraClassCSS=extra_css_class;if(src==null){if(globals.debug>0)
alert("Image: imageSource is null - cancel");return null;}
if(width==null||width==undefined){if(globals.debug>1)
alert("Image: image width from Image: "+this.mId+" is null - set to 0");this.mWidth="0px";}else
this.mWidth=width;if(height==null||height==undefined){if(globals.debug>1)
alert("Image: image height from Image: "+this.mId+" is null - set to 0");this.mHeight="0px";}else
this.mHeight=height;this.mUnitW=getUnit(width);this.mUnitH=getUnit(height);this.mUnitX=getUnit(this.mPosX);this.mUnitY=getUnit(this.mPosY);if(positionType==undefined||positionType==null){if(globals.debug>2)
alert("Warning: PositionType on Element: "+this.mId+" is not set\n");this.mPositionType="absolute";}else{this.mPositionType=positionType}
if(initialShow=="false")
this.mInitialShow=false;else if(initialShow!=false)
this.mInitialShow=true;else
this.mInitialShow=initialShow;if(zIndex==null||zIndex==undefined)
this.mZIndex=500;else
this.mZIndex=zIndex;this.mSource=src;this.mDomTreeObject=null;this.mMouseOverEvents=new Array();this.mMouseOutEvents=new Array();this.mMouseClickEvents=new Array();this.mMouseOverParams=new Array();this.mMouseOutParams=new Array();this.mMouseClickParams=new Array()
return this;}
asdf_Image.prototype.hide=function(){$(this.mDomTreeObject).hide();}
asdf_Image.prototype.show=function(){if(this.mDomTreeObject==null){this.mDomTreeObject=createDomObject(this,this.mId,"img",this.mType,this.mExtraClassCSS,this.mSource);this.mDomTreeObject.setAttribute("alt",this.mAlt);$(this.mDomTreeObject).mouseover(onMouseOver);$(this.mDomTreeObject).mouseout(onMouseOut);$(this.mDomTreeObject).click(onMouseClick);this.mDomTreeObject.style.position=this.mPositionType;this.setPosition(this.mPosX,this.mPosY);this.setSize(this.mWidth,this.mHeight);this.mDomTreeObject.style.zIndex=this.mZIndex;}
$(this.mDomTreeObject).show();}
asdf_Image.prototype.setPosition=function(posX,posY){this.mPosX=posX;this.mPosY=posY;setObjectPosition(this.mDomTreeObject,this.mPosX,this.mPosY,this.mPostionType,this.mUnitX,this.mUnitY);}
asdf_Image.prototype.setSize=function(sizeX,sizeY){setObjectSize(this.mDomTreeObject,sizeX,sizeY,this.mUnitW,this.mUnitH);}
asdf_Image.prototype.getSize=function(){var sizeX=getValueWithoutUnits(this.mDomTreeObject.width);var sizeY=getValueWithoutUnits(this.mDomTreeObject.height);var ret=new Size(sizeX,sizeY);return ret;}
asdf_Image.prototype.specificAction=function(params){actionName=params.parameter[0];newSource=params.parameter[1];object=params.event.currentTarget.nextNode;switch(actionName){case"changeImage":this.mDomTreeObject.src=newSource;break;case"default":if(globals.debug>0)
alert("Image: action name: "+actionName+" unknown!");break;}}
asdf_Image.prototype.registerOnMouseOverEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOverEvents[this.mMouseOverEvents.length]=functionName;this.mMouseOverParams[this.mMouseOverParams.length]=params;}
asdf_Image.prototype.registerOnMouseClickEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseClickEvents[this.mMouseClickEvents.length]=functionName;this.mMouseClickParams[this.mMouseClickParams.length]=params;}
asdf_Image.prototype.registerOnMouseOutEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOutEvents[this.mMouseOutEvents.length]=functionName;this.mMouseOutParams[this.mMouseOutParams.length]=params;}
function asdf_Textfield(_id,_parent,positionX,positionY,bgColor,text,fontFamily,fontSize,fontColor,width,height,positionType,extra_css_class,initialShow,zIndex){if(_id==null){if(globals.debug>0)
alert("Textfield: Id is not set - cancel");return null;}
if(_parent==null){if(globals.debug>0)
alert("Textfield: Parent is null - cancel");return null;}
this.mId=_id;this.mParent=_parent;this.mType="Textfield";if(positionX==null){if(globals.debug>1)
alert("Warning: Textfield: potitionX is not set");this.mPosX=0;}
else
this.mPosX=positionX;if(positionY==null){if(globals.debug>1)
alert("Warning: Textfield: potitionY is not set");}
else
this.mPosY=positionY;if(text==null){this.mText="";if(globals.debug>1)
alert("Warning: Textfield: Text is not set");}else{this.mText=text;this.mText=this.mText.replace(/\n/g,"<br>");}
if(extra_css_class==null)
this.mExtraClassCSS="EXTRA_NOTSET";else
this.mExtraClassCSS=extra_css_class;if(fontFamily==null){this.mFontFamily=globals.standardFontFamily;}else
this.mFontFamily=fontFamily;if(fontSize==null){this.mFontSize=globals.standardFontSize;}else
this.mFontSize=fontSize;if(bgColor==null)
this.mBgColor="transparent";else
this.mBgColor=bgColor;if(fontColor==null){this.mFontColor=globals.standardFontColor;}else
this.mFontColor=fontColor;if(width==null||width=="")
this.mWidth="0";else
this.mWidth=width;if(height==null||height=="")
this.mHeight="0";else
this.mHeight=height;this.mUnitW=getUnit(width);this.mUnitH=getUnit(height);this.mUnitX=getUnit(this.mPosX);this.mUnitY=getUnit(this.mPosY);if(positionType==undefined||positionType==null){if(globals.debug>2)
alert("Warning: PositionType on Element: "+this.mId+" is not set\n");this.mPositionType="absolute";}else{this.mPositionType=positionType}
if(initialShow=="false")
this.mInitialShow=false;else if(initialShow!=false)
this.mInitialShow=true;else
this.mInitialShow=initialShow;if(zIndex==null||zIndex==undefined)
this.mZIndex=500;else
this.mZIndex=zIndex;this.mDomTreeObject=null;this.mMouseOverEvents=new Array();this.mMouseOutEvents=new Array();this.mMouseClickEvents=new Array();this.mMouseOverParams=new Array();this.mMouseOutParams=new Array();this.mMouseClickParams=new Array()
return this;}
asdf_Textfield.prototype.hide=function(){$(this.mDomTreeObject).hide();}
asdf_Textfield.prototype.show=function(){if(this.mDomTreeObject==null){this.mDomTreeObject=createDomObject(this,this.mId,"div",this.mType,this.mExtraClassCSS,null,this.mText);$(this.mDomTreeObject).mouseover(onMouseOver);$(this.mDomTreeObject).mouseout(onMouseOut);$(this.mDomTreeObject).click(onMouseClick);this.mDomTreeObject.style.position=this.mPositionType;this.mDomTreeObject.style.fontFamily=this.mFontFamily;this.mDomTreeObject.style.fontSize=this.mFontSize;this.mDomTreeObject.style.color=this.mFontColor;this.setPosition(this.mPosX,this.mPosY,"absolute");this.mDomTreeObject.style.background=this.mBgColor;this.mDomTreeObject.style.zIndex=this.mZIndex;this.setSize(this.mWidth,this.mHeight);}
$(this.mDomTreeObject).show();}
asdf_Textfield.prototype.setPosition=function(posX,posY){this.mPosX=posX;this.mPosY=posY;setObjectPosition(this.mDomTreeObject,this.mPosX,this.mPosY,this.mPostionType,this.mUnitX,this.mUnitY);}
asdf_Textfield.prototype.setSize=function(sizeX,sizeY){setObjectSize(this.mDomTreeObject,sizeX,sizeY,this.mUnitW,this.mUnitH);}
asdf_Textfield.prototype.getSize=function(){var sizeX=getValueWithoutUnits(this.mDomTreeObject.width);var sizeY=getValueWithoutUnits(this.mDomTreeObject.height);var ret=new Size(sizeX,sizeY);return ret;}
asdf_Textfield.prototype.specificAction=function(params){actionName=params.parameter[0];object=params.event.currentTarget.nextNode;switch(actionName){case"default":if(globals.debug>0)
alert("Textfield: action name: "+actionName+" unknown!");break;}}
asdf_Textfield.prototype.registerOnMouseOverEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOverEvents[this.mMouseOverEvents.length]=functionName;this.mMouseOverParams[this.mMouseOverParams.length]=params;}
asdf_Textfield.prototype.registerOnMouseClickEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseClickEvents[this.mMouseClickEvents.length]=functionName;this.mMouseClickParams[this.mMouseClickParams.length]=params;}
asdf_Textfield.prototype.registerOnMouseOutEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOutEvents[this.mMouseOutEvents.length]=functionName;this.mMouseOutParams[this.mMouseOutParams.length]=params;}
function asdf_PagePanel(_id,_parent,positionX,positionY,bgColor,width,height,animationSpeed,pages,positionType,spacing,orientation,extra_css_class,initialShow,zIndex){if(_id==null){if(globals.debug>0)
alert("PagePanel: Id is not set - cancel");return null;}
if(_parent==null){if(globals.debug>0)
alert("PagePanel: Parent is null - cancel");return null;}
this.mId=_id;this.mParent=_parent;this.mType="PagePanel";if(positionX==null||positionX==undefined){if(globals.debug>1)
alert("Warning: PagePanel: positionX is not set");this.mPosX=0;}
else
this.mPosX=positionX;if(positionY==null||positionY==undefined){if(globals.debug>1)
alert("Warning: PagePanel: positionY is not set");this.mPosY=0;}
else
this.mPosY=positionY;if(extra_css_class==null)
this.mExtraClassCSS="EXTRA_NOTSET";else
this.mExtraClassCSS=extra_css_class;if(bgColor==null)
this.mBgColor="transparent";else
this.mBgColor=bgColor;if(width==null)
this.mWidth="0";else
this.mWidth=width;if(height==null)
this.mHeight="0";else
this.mHeight=height;this.mUnitW=getUnit(width);this.mUnitH=getUnit(height);this.mUnitX=getUnit(this.mPosX);this.mUnitY=getUnit(this.mPosY);if(positionType==undefined||positionType==null){if(globals.debug>2)
alert("Warning: PositionType on Element: "+this.mId+" is not set\n");this.mPositionType="absolute";}else{this.mPositionType=positionType}
if(pages==null){if(globals.debug>0)
alert("PagePanel: Error on PagePanel : "+this.mId+" cannot create PagePanel without Pages - cancel!!");return null;}
if(animationSpeed==null)
this.mAnimationSpeed=globals.defaultAnimtionSpeed;else
this.mAnimationSpeed=animationSpeed;if(orientation==null||orientation==undefined){if(globals.debug>2)
alert("Warning: PagePanel: orientation on Panel: "+this.mId+" is not set - set horizontal");this.mOrientation="horizontal";}else if(orientation!="vertical"&&orientation!="horizontal"){if(globals.debug>1)
alert("Warning: PagePanel: Orientation is set to an unknown value"+orientation+"\n on Panel: "+this.mId+"please set it to <horizontal> or <vertical>\n");this.mOrientation="horizontal";}else
this.mOrientation=orientation
if(spacing==null||spacing==undefined){if(globals.debug>2)
alert("Warning: PagePanel spacing is not set on Panel: "+this.mId+" - take default value 5");this.mSpacing=5;}else
this.mSpacing=spacing;if(initialShow=="false")
this.mInitialShow=false;else if(initialShow!=false)
this.mInitialShow=true;else
this.mInitialShow=initialShow;if(zIndex==null||zIndex==undefined)
this.mZIndex=500;else
this.mZIndex=zIndex;this.mChildren=new Array();this.mPages=pages;this.mCurrentPage=0;this.mDomTreeObject=createDomObject(this,this.mId,"div",this.mType,this.mExtraClassCSS);this.mDomPageBorder=createDomObjectDOM(this,this.mDomTreeObject,(this.mId+"_pagesBorder"),"div",this.mType,this.mExtraClassCSS);this.mDomPages=createDomObjectDOM(this,this.mDomPageBorder,(this.mId+"_pages"),"div",this.mType,this.mExtraClassCSS);this.mDomTreeObject.style.position=this.mPositionType;this.mDomPageBorder.style.position=this.mPositionType;this.mDomPages.style.position=this.mPositionType;this.mDomPageBorder.style.overflow="hidden";this.setPosition(this.mPosX,this.mPosY);this.setSize(this.mWidth,this.mHeight);this.mPageSizeX=this.mWidth;this.mPageSizeY=this.mHeight;this.mPagePosX=0;this.mPagePosY=0;$(this.mDomPages).show();this.initPages();this.mMouseOverEvents=new Array();this.mMouseOutEvents=new Array();this.mMouseClickEvents=new Array();this.mMouseOverParams=new Array();this.mMouseOutParams=new Array();this.mMouseClickParams=new Array()
$(this.mDomTreeObject).mouseover(onMouseOver);$(this.mDomTreeObject).mouseout(onMouseOut);$(this.mDomTreeObject).click(onMouseClick);return this;}
asdf_PagePanel.prototype.hide=function(){$(this.mDomTreeObject).hide();$(this.mDomPages).hide();this.hideChildren();}
asdf_PagePanel.prototype.hideChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];child.object.hide();}}
asdf_PagePanel.prototype.showChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];if(child.object.mInitialShow!=false)
child.object.show();}}
asdf_PagePanel.prototype.show=function(){$(this.mDomTreeObject).show();$(this.mDomPages).show();this.mDomTreeObject.style.background=this.mBgColor;this.showChildren();this.mDomTreeObject.style.zIndex=this.mZIndex;}
asdf_PagePanel.prototype.initPages=function(){this.mDomPagesArray=new Array();for(var i=0;i<this.mPages.length;i++){var pageId=this.mId+"_page_"+i;var page=createDomObjectDOM(this,this.mDomPages,pageId,"div",this.mType,this.mExtra_css_class);page.style.position="absolute";if(this.mOrientation=="horizontal"){page.style.left=getValueWithUnits(this.mSpacing,"px");page.style.top="0px";}else{page.style.top=getValueWithUnits(this.mSpacing,"px");page.style.left="0px";}
this.mDomPagesArray.push(page);}}
asdf_PagePanel.prototype.setPosition=function(posX,posY){this.mPosX=posX;this.mPosY=posY;setObjectPosition(this.mDomTreeObject,this.mPosX,this.mPosY,this.mPostionType,this.mUnitX,this.mUnitY);setObjectPosition(this.mDomPages,0,0,"absolute","px","px");setObjectPosition(this.mDomPageBorder,0,0,"absolute","px","px");}
asdf_PagePanel.prototype.setSize=function(sizeX,sizeY){this.mWidth=sizeX;this.mHeight=sizeY;setObjectSize(this.mDomPages,this.mWidth,this.mHeight,this.mUnitW,this.mUnitH);setObjectSize(this.mDomTreeObject,this.mWidth,this.mHeight,this.mUnitW,this.mUnitH);setObjectSize(this.mDomPageBorder,this.mWidth,this.mHeight,this.mUnitW,this.mUnitH);}
asdf_PagePanel.prototype.getSize=function(){var sizeX=getValueWithoutUnits(this.mWidth);var sizeY=getValueWithoutUnits(this.mHeight);var x=getValueWithoutUnits(this.mDomTreeObject.width);var y=getValueWithoutUnits(this.mDomTreeObject.height);if(x>sizeX)
sizeX=x;if(y>sizeY)
sizeY=y;var ret=new Size(sizeX,sizeY);return ret;}
asdf_PagePanel.prototype.addChild=function(child){var parent=this.getParent(child);if(child.object==null){if(child.object==null)
init(child,parent);this.mChildren[this.mChildren.length]=child;for(var grandChild in child.children){var thisJson=getJsonObject(this.mId);var path=getPathWithFromRoot(child.children[grandChild],thisJson);showElement(path,thisJson);}
if(parent!=this.mDomTreeObject){child.object.show();parent.style.width=child.object.mDomTreeObject.style.width;parent.style.height=child.object.mDomTreeObject.style.height;if(child.object.mInitialShow==false)
child.object.hide();if(this.mOrientation=="horizontal"){var newWidth=getValueWithoutUnits(this.mDomPages.style.width)+getValueWithoutUnits(parent.style.width);this.mDomPages.style.width=getValueWithUnits(newWidth,"px");}else{var newHeight=getValueWithoutUnits(this.mDomPages.style.height)+getValueWithoutUnits(parent.style.height);this.mDomPages.style.height=getValueWithUnits(newHeight,"px");}
this.refresh();}else{if(child.object.mInitialShow!=false)
child.object.show();else
child.object.hide();}}}
asdf_PagePanel.prototype.refresh=function(child){var posX=0;var posY=0;for(var i=0;i<this.mDomPagesArray.length;i++){var page=this.mDomPagesArray[i];page.style.left=getValueWithUnits(posX,"px");page.style.top=getValueWithUnits(posY,"px");if(this.mOrientation=="horizontal"){posX+=getValueWithoutUnits(this.mSpacing)+getValueWithoutUnits(page.style.width);}else{posY+=getValueWithoutUnits(this.mSpacing)+getValueWithoutUnits(page.style.height);}}}
asdf_PagePanel.prototype.getParent=function(child){for(var i=0;i<this.mPages.length;i++){if(this.mPages[i].id==child.id){return this.mDomPagesArray[i];}}
return this.mDomTreeObject;}
asdf_PagePanel.prototype.specificAction=function(params){var actionName=trimString(params.parameter[0]);object=params.event.currentTarget.nextNode;var pageNumber=1;if(params.parameter.length==2)
pageNumber=Number(params.parameter[1]);switch(actionName){case"forward":case"nextPage":this.changePage(+1);break;case"backward":case"prevPage":case"previousPage":this.changePage(-1);break;case"showPage":this.showPage(pageNumber-1);break;default:if(globals.debug>1)
alert("PagePanel: action name: "+actionName+" unknown!");break;}}
asdf_PagePanel.prototype.changePage=function(direction){if(direction!=-1&&direction!=1){if(globals.debug>0)
alert("Error: PagePanel: "+this.mId+" get wrong changePage direction: "+direction);return;}
var lastPage=this.mCurrentPage==this.mPages.length-1;var firstPage=this.mCurrentPage==0;if(lastPage&&direction>0)
return;if(firstPage&&direction<0)
return;var page=this.mDomPagesArray[this.mCurrentPage];var move=0;if(this.mOrientation=="horizontal"){move=page.style.width;}else
move=page.style.height;move=getValueWithoutUnits(move);if(direction>0){move="-="+getValueWithUnits(move,"px");}else{move="+="+getValueWithUnits(move,"px");}
this.mCurrentPage+=direction;gCurrentAnimationSpeed=this.mAnimSpeed;if(this.mOrientation=="horizontal"){$(this.mDomPages).animate({"left":move},gCurrentAnimationSpeed,this.animationCallback);}else
$(this.mDomPages).animate({"top":move},gCurrentAnimationSpeed,this.animationCallback);}
asdf_PagePanel.prototype.showPage=function(pageNumber){var page=this.mDomPagesArray[this.mCurrentPage];var move=0;if(this.mOrientation=="horizontal"){move=page.style.width;}else
move=page.style.height;var pageDiff=pageNumber-this.mCurrentPage;move=getValueWithoutUnits(move);move*=pageDiff*-1;this.mCurrentPage+=pageDiff;if(this.mOrientation=="horizontal"){var value=getValueWithoutUnits(this.mDomPages.style.left)+move+this.mUnitX;this.mDomPages.style.left=getValueWithUnits(value,"px");}else{var value=getValueWithoutUnits(this.mDomPages.style.top)+move+this.mUnitY;this.mDomPages.style.top=getValueWithUnits(value,"px");}}
asdf_PagePanel.prototype.animationCallback=function(){}
asdf_PagePanel.prototype.registerOnMouseOverEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOverEvents[this.mMouseOverEvents.length]=functionName;this.mMouseOverParams[this.mMouseOverParams.length]=params;}
asdf_PagePanel.prototype.registerOnMouseClickEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseClickEvents[this.mMouseClickEvents.length]=functionName;this.mMouseClickParams[this.mMouseClickParams.length]=params;}
asdf_PagePanel.prototype.registerOnMouseOutEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOutEvents[this.mMouseOutEvents.length]=functionName;this.mMouseOutParams[this.mMouseOutParams.length]=params;}
function getPages(elem){if(elem.type!="PagePanel"&&elem.type!="AccordionPanel"&&elem.type!="HVPanel"){if(globals.debug>0)
alert("Error: getPages(): getPages not supported on : "+elem.type);return null;}
var pageNames=elem.pages;var pages=new Array();if(elem.children==null){if(globals.debug>0)
alert("Error: element.children is null on: "+elem.id+" - cancel");return(new Array());}
for(var i=0;i<pageNames.length;i++){var name=pageNames[i];if(elem.children[name]!=null&&elem.children[name]!=undefined)
pages.push(elem.children[name]);}
return pages;}
function asdf_RollOutPanel(_id,_parent,positionX,positionY,bgColor,width,height,animationSpeed,positionType,extra_css_class,initialShow,zIndex){if(_id==null){if(globals.debug>0)
alert("RollOutPanel: Id is not set - cancel");return null;}
if(_parent==null){if(globals.debug>0)
alert("RollOutPanel: Parent is null - cancel");return null;}
this.mId=_id;this.mParent=_parent;this.mType="RollOutPanel";if(positionX==null){if(globals.debug>1)
alert("Warning: RollOutPanel: positionX is not set");this.mPosX=0;}
else
this.mPosX=positionX;if(positionY==null){if(globals.debug>1)
alert("Warning: RollOutPanel: positionY is not set");this.mPosY=0;}
else
this.mPosY=positionY;if(extra_css_class==null)
this.mExtraClassCSS="EXTRA_NOTSET";else
this.mExtraClassCSS=extra_css_class;if(animationSpeed==null){this.mAnimationSpeed=globals.defaultAnimationSpeed;}else
this.mAnimationSpeed=animationSpeed;if(bgColor==null)
this.mBgColor="transparent";else
this.mBgColor=bgColor;if(width==null||width=="")
this.mWidth="0";else
this.mWidth=width;if(height==null||height=="")
this.mHeight="0";else
this.mHeight=height;this.mUnitW=getUnit(width);this.mUnitH=getUnit(height);this.mUnitX=getUnit(this.mPosX);this.mUnitY=getUnit(this.mPosY);if(positionType==undefined||positionType==null){if(globals.debug>2)
alert("Warning: PositionType on Element: "+this.mId+" is not set\n");this.mPositionType="absolute";}else{this.mPositionType=positionType}
if(initialShow=="false")
this.mInitialShow=false;else if(initialShow!=false)
this.mInitialShow=true;else
this.mInitialShow=initialShow;if(zIndex==null||zIndex==undefined)
this.mZIndex=500;else
this.mZIndex=zIndex;this.mDomTreeObject=createDomObject(this,this.mId,"div",this.mType,this.mExtraClassCSS);this.mDomTreeObject.style.position=this.mPositionType;this.mChildren=new Array();this.setPosition(this.mPosX,this.mPosY);this.mMouseOverEvents=new Array();this.mMouseOutEvents=new Array();this.mMouseClickEvents=new Array();this.mMouseOverParams=new Array();this.mMouseOutParams=new Array();this.mMouseClickParams=new Array()
$(this.mDomTreeObject).mouseover(onMouseOver);$(this.mDomTreeObject).mouseout(onMouseOut);$(this.mDomTreeObject).click(onMouseClick);return this;}
asdf_RollOutPanel.prototype.hide=function(){$(this.mDomTreeObject).hide();this.hideChildren();}
asdf_RollOutPanel.prototype.hideChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];child.object.hide();}
this.updateSize();}
asdf_RollOutPanel.prototype.showChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];if(child.object.mInitialShow!=false)
child.object.show();}
this.updateSize();}
asdf_RollOutPanel.prototype.show=function(){$(this.mDomTreeObject).show();this.mDomTreeObject.style.background=this.mBgColor;this.setSize(this.mWidth,this.mHeight);this.showChildren();this.mDomTreeObject.style.zIndex=this.mZIndex;this.updateSize();}
asdf_RollOutPanel.prototype.setPosition=function(posX,posY){this.mPosX=posX;this.mPosY=posY;setObjectPosition(this.mDomTreeObject,this.mPosX,this.mPosY,this.mPostionType,this.mUnitX,this.mUnitY);}
asdf_RollOutPanel.prototype.setSize=function(sizeX,sizeY){this.mWidth=sizeX;this.mHeight=sizeY;setObjectSize(this.mDomTreeObject,this.mWidth,this.mHeight,this.mUnitW,this.mUnitH);}
asdf_RollOutPanel.prototype.getSize=function(){var sizeX=getValueWithoutUnits(this.mWidth);var sizeY=getValueWithoutUnits(this.mHeight);var ret=new Size(sizeX,sizeY);return ret;}
asdf_RollOutPanel.prototype.updateSize=function(){var sizeX=getValueWithoutUnits(this.mWidth);var sizeY=getValueWithoutUnits(this.mHeight);for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i].object;if(child==null)
continue;if(child.mDomTreeObject==null||child.mDomTreeObject==undefined)
continue;if(!$(child.mDomTreeObject).is(":visible"))
continue;var sz=child.getSize();x=sz.x+getValueWithoutUnits(child.mDomTreeObject.style.left);y=sz.y+getValueWithoutUnits(child.mDomTreeObject.style.top);if(x>sizeX)
sizeX=x;if(sz.y>sizeY)
sizeY=y;}
this.setSize(sizeX,sizeY);}
asdf_RollOutPanel.prototype.addChild=function(child){if(child.object==null){init(child,this.mDomTreeObject);this.mChildren.push(child);for(var grandChild in child.children){var thisJson=getJsonObject(this.mId);var path=getPathWithFromRoot(child.children[grandChild],thisJson);showElement(path,thisJson);}
if(child.object.mInitialShow!=false){child.object.show();}else
child.object.hide();}}
asdf_RollOutPanel.prototype.specificAction=function(params){var actionName=params.parameter[0];actionName=actionName.toLowerCase();switch(actionName){case"toggle":if(this.mDomTreeObject.style.visibility=="visible"){params.parameter[0]="rollup";this.specificAction(params);}else{params.parameter[0]="rollout";this.specificAction(params);}
break;case"rollout":case"down":case"slidedown":this.show();this.hide();this.showChildren();$(this.mDomTreeObject).slideDown(this.mAnimationSpeed,this.rollDownCallback);break;case"rollup":case"up":case"slideup":if(!this.mouseOverPanel(params)){$(this.mDomTreeObject).slideUp(this.mAnimationSpeed,this.rollUpCallback);}
break;default:if(globals.debug>0)
alert("RollOutPanel: action name: "+actionName+" unknown!");break;}}
asdf_RollOutPanel.prototype.mouseOverPanel=function(params){var e=params.event;var x=e.pageX-this.mDomTreeObject.offsetLeft;var y=e.pageY-this.mDomTreeObject.offsetTop;if(x>getValueWithoutUnits(this.mWidth)||y>getValueWithoutUnits(this.mHeight)||x<0||y<0)
return false;return true;}
asdf_RollOutPanel.prototype.rollDownCallback=function(){}
asdf_RollOutPanel.prototype.rollUpCallback=function(){}
asdf_RollOutPanel.prototype.registerOnMouseOverEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOverEvents[this.mMouseOverEvents.length]=functionName;this.mMouseOverParams[this.mMouseOverParams.length]=params;}
asdf_RollOutPanel.prototype.registerOnMouseClickEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseClickEvents[this.mMouseClickEvents.length]=functionName;this.mMouseClickParams[this.mMouseClickParams.length]=params;}
asdf_RollOutPanel.prototype.registerOnMouseOutEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOutEvents[this.mMouseOutEvents.length]=functionName;this.mMouseOutParams[this.mMouseOutParams.length]=params;}
function asdf_HVPanel(_id,_parent,positionX,positionY,bgColor,width,height,spacing,orientation,positionType,pages,extra_css_class,initialShow,zIndex){if(_id==null){if(globals.debug>0)
alert("Panel: Id is not set - cancel");return null;}
if(_parent==null){if(globals.debug>0)
alert("Panel: Parent is null - cancel");return null;}
this.mId=_id;this.mParent=_parent;this.mType="HVPanel";if(positionX==null){if(globals.debug>1)
alert("Warning: Panel: positionX is not set");this.mPosX=0;}
else
this.mPosX=positionX;if(positionY==null){if(globals.debug>1)
alert("Warning: Panel: positionY is not set");this.mPosY=0;}
else
this.mPosY=positionY;if(extra_css_class==null)
this.mExtraClassCSS="EXTRA_NOTSET";else
this.mExtraClassCSS=extra_css_class;if(bgColor==null)
this.mBgColor="transparent";else
this.mBgColor=bgColor;if(width==null||width=="")
this.mWidth="0";else
this.mWidth=width;if(height==null||height=="")
this.mHeight="0";else
this.mHeight=height;this.mUnitW=getUnit(width);this.mUnitH=getUnit(height);this.mUnitX=getUnit(this.mPosX);this.mUnitY=getUnit(this.mPosY);if(positionType==undefined||positionType==null){if(globals.debug>2)
alert("Warning: PositionType on Element: "+this.mId+" is not set\n");this.mPositionType="absolute";}else{this.mPositionType=positionType}
if(pages==null||pages==undefined){if(globals.debug>1)
alert("Warning: HVPanel: "+this.mId+" has no pages\n");this.mPages=new Array();}else
this.mPages=pages;if(initialShow=="false")
this.mInitialShow=false;else if(initialShow!=false)
this.mInitialShow=true;else
this.mInitialShow=initialShow;if(zIndex==null||zIndex==undefined)
this.mZIndex=500;else
this.mZIndex=zIndex;if(spacing==null||spacing==undefined)
this.mSpacing=5;else
this.mSpacing=spacing;if(orientation!="horizontal")
this.mOrientation="vertical";else
this.mOrientation="horizontal";this.mDomTreeObject=createDomObject(this,this.mId,"div",this.mType,this.mExtraClassCSS);this.mChildren=new Array();this.mDomTreeObject.style.position=this.mPositionType;this.setPosition(this.mPosX,this.mPosY);this.setupPages();this.mMouseOverEvents=new Array();this.mMouseOutEvents=new Array();this.mMouseClickEvents=new Array();this.mMouseOverParams=new Array();this.mMouseOutParams=new Array();this.mMouseClickParams=new Array()
$(this.mDomTreeObject).mouseover(onMouseOver);$(this.mDomTreeObject).mouseout(onMouseOut);$(this.mDomTreeObject).click(onMouseClick);return this;}
asdf_HVPanel.prototype.hide=function(){$(this.mDomTreeObject).hide();this.hideChildren();}
asdf_HVPanel.prototype.hideChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];child.object.hide();}
this.updateSize();}
asdf_HVPanel.prototype.showChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];if(child.object.mInitialShow!=false)
child.object.show();else
child.object.hide();}
this.updateSize();}
asdf_HVPanel.prototype.show=function(){$(this.mDomTreeObject).show();this.mDomTreeObject.style.background=this.mBgColor;this.setSize(this.mWidth,this.mHeight);this.showChildren();this.mDomTreeObject.style.zIndex=this.mZIndex;this.updateSize();}
asdf_HVPanel.prototype.setupPages=function(){this.mDomPages=new Array();this.mPageChildren=new Array();for(i=0;i<this.mPages.length;i++){var page=createDomObjectDOM(this,this.mDomTreeObject,(this.mId+"_page"+i),"div",this.mType,this.mExtraClassCSS);this.mDomPages.push(page);}}
asdf_HVPanel.prototype.setPosition=function(posX,posY){this.mPosX=posX;this.mPosY=posY;setObjectPosition(this.mDomTreeObject,this.mPosX,this.mPosY,this.mPostionType,this.mUnitX,this.mUnitY);}
asdf_HVPanel.prototype.setSize=function(sizeX,sizeY){this.mWidth=sizeX;this.mHeight=sizeY;setObjectSize(this.mDomTreeObject,this.mWidth,this.mHeight,this.mUnitW,this.mUnitH);}
asdf_HVPanel.prototype.getSize=function(){var sizeX=getValueWithoutUnits(this.mWidth);var sizeY=getValueWithoutUnits(this.mHeight);var ret=new Size(sizeX,sizeY);return ret;}
asdf_HVPanel.prototype.updateSize=function(){var sizeX=getValueWithoutUnits(this.mWidth);var sizeY=getValueWithoutUnits(this.mHeight);for(var i=0;i<this.mPageChildren.length;i++){var child=this.mPageChildren[i].object;if(child==null)
continue;if(child.mDomTreeObject==null||child.mDomTreeObject==undefined)
continue;if(!$(child.mDomTreeObject).is(":visible"))
continue;var sz=child.getSize();x=sz.x+getValueWithoutUnits(child.mDomTreeObject.style.left);y=sz.y+getValueWithoutUnits(child.mDomTreeObject.style.top);if(x>sizeX)
sizeX=x;if(sz.y>sizeY)
sizeY=y;}
this.setSize(sizeX,sizeY);}
asdf_HVPanel.prototype.arrangeChildren=function(){this.initFirstChild();for(var i=0;i<this.mDomPages.length-1;i++){var child=this.mDomPages[i];var nextChild=this.mDomPages[i+1];if(nextChild==null)
break;var sizeX=child.style.width;var sizeY=child.style.height;var posX=child.style.left;var posY=child.style.top;var newPosX=nextChild.style.left;var newPosY=nextChild.style.top;if(this.mOrientation=="horizontal"){newPosX=getValueWithoutUnits(posX)+getValueWithoutUnits(sizeX)+getValueWithoutUnits(this.mSpacing);newPosY=0;}else{newPosY=getValueWithoutUnits(posY)+getValueWithoutUnits(sizeY)+getValueWithoutUnits(this.mSpacing);newPosX=0;}
setObjectPosition(nextChild,newPosX,newPosY,"absolute",this.mUnitX,this.mUnitY);}}
asdf_HVPanel.prototype.initFirstChild=function(){if(this.mDomPages.length>=1){var child=this.mDomPages[0];setObjectPosition(child,0,0,"absolute",this.mUnitX,this.mUnitY);}}
asdf_HVPanel.prototype.getNextChild=function(index){var retElement=null;for(var i=index+1;i<this.mChildren.length;i++){var child=this.mChildren[i].object;if(child.mDomTreeObject.style.visibility=="hidden"||child.mDomTreeObject.style.display=="none")
continue;retElement=child;break;}
return retElement;}
asdf_HVPanel.prototype.addChild=function(child){if(child.object==null){this.initChild(child);for(var grandChild in child.children){var thisJson=getJsonObject(this.mId);var path=getPathWithFromRoot(child.children[grandChild],thisJson);showElement(path,thisJson);}
if(child.object.mInitialShow!=false){child.object.show();child.object.mDomTreeObject.style.position="relative";this.arrangeChildren();}else
child.object.hide();this.arrangeChildren();}}
asdf_HVPanel.prototype.initChild=function(child){for(var i=0;i<this.mPages.length;i++){if(this.mPages[i].id==child.id){flag=true;if(child.object==null)
init(child,this.mDomPages[i]);this.mPageChildren.push(child);child.object.show();setObjectPosition(child.object.mDomTreeObject,child.object.mPosX,child.object.mPosY,"relative",child.object.mUnitX,child.object.mUnitY);var size=child.object.getSize();setObjectSize(this.mDomPages[i],size.x,size.y,child.object.mUnitW,child.object.mUnitH);return;}}
if(child.object==null)
init(child,this.mDomTreeObject);this.mChildren.push(child);child.object.show();setObjectPosition(child.object.mDomTreeObject,child.object.mPosX,child.object.mPosY,"relative",child.object.mUnitX,child.object.mUnitY);return;}
asdf_HVPanel.prototype.specificAction=function(params){actionName=params.parameter[0];switch(actionName){default:for(var i=0;i<this.mChildren.length;i++){this.mChildren[i].object.specificAction(params);}
break;}}
asdf_HVPanel.prototype.registerOnMouseOverEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOverEvents[this.mMouseOverEvents.length]=functionName;this.mMouseOverParams[this.mMouseOverParams.length]=params;}
asdf_HVPanel.prototype.registerOnMouseClickEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseClickEvents[this.mMouseClickEvents.length]=functionName;this.mMouseClickParams[this.mMouseClickParams.length]=params;}
asdf_HVPanel.prototype.registerOnMouseOutEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOutEvents[this.mMouseOutEvents.length]=functionName;this.mMouseOutParams[this.mMouseOutParams.length]=params;}
function asdf_AccordionPanel(_id,_parent,positionX,positionY,bgColor,positionType,startPage,extra_css_class,collapse,pages,initialShow,zIndex){if(_id==null){if(globals.debug>0)
alert("Panel: Id is not set - cancel");return null;}
if(_parent==null){if(globals.debug>0)
alert("Panel: Parent is null - cancel");return null;}
this.mId=_id;this.mParent=_parent;this.mType="Accordion";if(positionX==null){if(globals.debug>1)
alert("Warning: Panel: positionX is not set");this.mPosX=0;}
else
this.mPosX=positionX;if(positionY==null){if(globals.debug>1)
alert("Warning: Panel: positionY is not set");this.mPosY=0;}
else
this.mPosY=positionY;if(extra_css_class==null)
this.mExtraClassCSS="EXTRA_NOTSET";else
this.mExtraClassCSS=extra_css_class;if(bgColor==null)
this.mBgColor="transparent";else
this.mBgColor=bgColor;this.mUnitX=getUnit(this.mPosX);this.mUnitY=getUnit(this.mPosY);if(positionType==undefined||positionType==null){if(globals.debug>2)
alert("Warning: PositionType on Element: "+this.mId+" is not set\n");this.mPositionType="absolute";}else{this.mPositionType=positionType;}
if(collapse==null||collapse==undefined)
this.mCollapse=false;else
this.mCollapse=collapse;if(pages==null||pages==undefined){if(globals.debug>1)
alert("Warning: AccordionPanel: "+this.mId+" is without pages\n");this.mPages=new Array();this.mHeader=new Array();}else{this.setHeaderAndPages(pages);}
if(startPage==null||startPage==undefined){if(globals.debug>2)
alert("Startpage not set: "+this.mID+"Accordion. Set to false.");this.mStartPage=false;}else
this.mStartPage=startPage;if(initialShow=="false")
this.mInitialShow=false;else if(initialShow!=false)
this.mInitialShow=true;else
this.mInitialShow=initialShow;if(zIndex==null||zIndex==undefined)
this.mZIndex=500;else
this.mZIndex=zIndex;this.mDomTreeObject=createDomObject(this,this.mId,"div",this.mType,this.mExtraClassCSS);this.mDomTreeObject.style.position=this.mPositionType;this.mChildren=new Array();this.setPosition(this.mPosX,this.mPosY);this.create();this.mMouseOverEvents=new Array();this.mMouseOutEvents=new Array();this.mMouseClickEvents=new Array();this.mMouseOverParams=new Array();this.mMouseOutParams=new Array();this.mMouseClickParams=new Array()
$(this.mDomTreeObject).mouseover(onMouseOver);$(this.mDomTreeObject).mouseout(onMouseOut);$(this.mDomTreeObject).click(onMouseClick);return this;}
asdf_AccordionPanel.prototype.hide=function(){$(this.mDomTreeObject).hide();this.hideChildren();}
asdf_AccordionPanel.prototype.hideChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];child.object.hide();}}
asdf_AccordionPanel.prototype.showChildren=function(){for(var i=0;i<this.mChildren.length;i++){var child=this.mChildren[i];if(child.object.mInitialShow!=false)
child.object.show();else
child.object.hide();}}
asdf_AccordionPanel.prototype.setPosition=function(posX,posY){this.mPosX=posX;this.mPosY=posY;setObjectPosition(this.mDomTreeObject,this.mPosX,this.mPosY,this.mPostionType,this.mUnitX,this.mUnitY);}
asdf_AccordionPanel.prototype.setSize=function(sizeX,sizeY){}
asdf_AccordionPanel.prototype.getSize=function(){var ret=new Size(0,0);return ret;}
asdf_AccordionPanel.prototype.updateSize=function(){}
asdf_AccordionPanel.prototype.show=function(){$(this.mDomTreeObject).show();this.mDomTreeObject.style.background=this.mBgColor;this.showChildren();this.mDomTreeObject.style.zIndex=this.mZIndex;}
asdf_AccordionPanel.prototype.setAccordion=function(){$(this.mDomTreeObject).accordion({collapsible:this.mCollapse,autoHeight:false,clearStyle:true});}
asdf_AccordionPanel.prototype.create=function(){this.mDomSegments=new Array();this.mDomSegmentsHeader=new Array();this.mDomSegmentsContent=new Array();for(var i=0;i<this.mHeader.length;i++){var header=createDomObjectDOM(this,this.mDomTreeObject,(this.mId+"_segmentHeader_"+i),"div",this.mType,this.mExtraClassCSS);var content=createDomObjectDOM(this,this.mDomTreeObject,(this.mId+"_segmentBody_"+i),"div",this.mType,this.mExtraClassCSS);setObjectPosition(header,0,0,"relative","px","px");setObjectPosition(content,0,0,"relative","px","px");var headerString=this.mId+"_asdf_accordion_header";var headerString=headerString.replace(/\//g,"_");this.mDomSegmentsHeader.push(header);this.mDomSegmentsContent.push(content);header.style.zIndex=Number(this.mZIndex)+10;content.style.zIndex=Number(this.mZIndex)+1;$(header).addClass(headerString);}
this.setAccordion();}
asdf_AccordionPanel.prototype.setHeaderAndPages=function(pages){this.mPages=new Array();this.mHeader=new Array();if(pages.length%2!=0){if(globals.debug>0)
alert("Error AccordionPanel "+this.mId+" has odd number of pages.\n That means that there is an header without body - cancel");return null;}
for(var i=0;i<pages.length;i+=2){this.mHeader.push(pages[i]);this.mPages.push(pages[i+1]);}}
asdf_AccordionPanel.prototype.addChild=function(child){if(child.object==null){this.initChild(child);for(var grandChild in child.children){var thisJson=getJsonObject(this.mId);var path=getPathWithFromRoot(child.children[grandChild],thisJson);showElement(path,thisJson);}
if(child.object.mInitialShow!=false){child.object.show();}else
child.object.hide();}}
asdf_AccordionPanel.prototype.initChild=function(child){for(var i=0;i<this.mHeader.length;i++){var flag=false;if(this.mHeader[i].id==child.id){if(child.object==null)
init(child,this.mDomSegmentsHeader[i]);this.mChildren[this.mChildren.length]=child;child.object.show();setObjectPosition(child.object.mDomTreeObject,child.object.mPosX,child.object.mPosY,"relative",child.object.mUnitX,child.object.mUnitY);return;}else if(this.mPages[i].id==child.id){if(child.object==null)
init(child,this.mDomSegmentsContent[i]);this.mChildren[this.mChildren.length]=child;child.object.show();setObjectPosition(child.object.mDomTreeObject,child.object.mPosX,child.object.mPosY,"relative",child.object.mUnitX,child.object.mUnitY);return;}}
if(child.object==null)
init(child,this.mDomTreeObject);this.mChildren[this.mChildren.length]=child;return;}
asdf_AccordionPanel.prototype.specificAction=function(params){actionName=params.parameter[0];var pageNumber=0;if(params.parameter.length==2){pageNumber=Number(params.parameter[1]);}
switch(actionName){case"close":$(this.mDomTreeObject).accordion("activate",false);break;case"show":var currentPage=$(this.mDomTreeObject).accordion("option","active");if(currentPage!=pageNumber)
$(this.mDomTreeObject).accordion("option","active",Number(pageNumber));break;default:for(var i=0;i<this.mChildren.length;i++){this.mChildren[i].object.specificAction(params);}
break;}}
asdf_AccordionPanel.prototype.registerOnMouseOverEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOverEvents[this.mMouseOverEvents.length]=functionName;this.mMouseOverParams[this.mMouseOverParams.length]=params;}
asdf_AccordionPanel.prototype.registerOnMouseClickEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseClickEvents[this.mMouseClickEvents.length]=functionName;this.mMouseClickParams[this.mMouseClickParams.length]=params;}
asdf_AccordionPanel.prototype.registerOnMouseOutEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOutEvents[this.mMouseOutEvents.length]=functionName;this.mMouseOutParams[this.mMouseOutParams.length]=params;}
function asdf_BackgroundStitcher(_id,_parent,positionX,positionY,bgColor,width,height,imgTop,imgMiddle,imgBottom,positionType,extra_css_class,initialShow,zIndex){if(_id==null){if(globals.debug>0)
alert("BaseElement: Id is not set - cancel");return null;}
if(_parent==null){if(globals.debug>0)
alert("BaseElement: Parent is null - cancel");return null;}
if(width==null||width=="")
this.mWidth="0";else
this.mWidth=width;if(height==null||height=="")
this.mHeight="0";else
this.mHeight=height;this.mUnitW=getUnit(width);this.mUnitH=getUnit(height);this.mUnitX=getUnit(this.mPosX);this.mUnitY=getUnit(this.mPosY);if(imgTop==null||imgTop==undefined){if(globals.debug>0)
alert("Error: image_top for BackgroundStitcher: "+this.mId+" is not set - cancel!\n");return null;}else
this.mImageTop=imgTop;if(imgMiddle==null||imgMiddle==undefined){if(globals.debug>1)
alert("Warning: image_middle for BackgroundStitcher "+this.mId+" is not set - take imgTop!\n");this.mImageMiddle=this.mImageTop;}else
this.mImageMiddle=imgMiddle;if(imgBottom==null||imgBottom==undefined){if(globals.debug>1)
alert("Warning: image_bottom for BackgroundStitcher "+this.mId+" is not set - take imgTop!\n");this.mImageBottom=this.mImageTop;}else
this.mImageBottom=imgBottom;if(positionType==undefined||positionType==null){if(globals.debug>2)
alert("Warning: PositionType on Element: "+this.mId+" is not set\n");this.mPositionType="absolute";}else{this.mPositionType=positionType}
this.mId=_id;this.mParent=_parent;this.mType="BackgroundStitcher";if(positionX==null){if(globals.debug>1)
alert("Warning: BaseElement: potitionX is not set");this.mPosX=0;}
else
this.mPosX=positionX;if(positionY==null){if(globals.debug>1)
alert("Warning: BaseElement: potitionY is not set");}
else
this.mPosY=positionY;if(extra_css_class==null)
this.mExtraClassCSS="EXTRA_NOTSET";else
this.mExtraClassCSS=extra_css_class;if(bgColor==null)
this.mBgColor="transparent";else
this.mBgColor=bgColor;if(initialShow=="false")
this.mInitialShow=false;else if(initialShow!=false)
this.mInitialShow=true;else
this.mInitialShow=initialShow;if(zIndex==null||zIndex==undefined)
this.mZIndex=500;else
this.mZIndex=zIndex;this.mDomTreeObject=null;this.mMouseOverEvents=new Array();this.mMouseOutEvents=new Array();this.mMouseClickEvents=new Array();this.mMouseOverParams=new Array();this.mMouseOutParams=new Array();this.mMouseClickParams=new Array();return this;}
asdf_BackgroundStitcher.prototype.hide=function(){$(this.mDomTreeObject).hide();}
asdf_BackgroundStitcher.prototype.show=function(){if(this.mDomTreeObject==null){this.mDomTreeObject=createDomObject(this,this.mId,"div",this.mType,this.mExtraClassCSS);this.mDomImageTop=createDomObjectDOM(this,this.mDomTreeObject,this.mId+"_imageTop","img",this.mType,this.mExtraClassCSS,this.mImageTop);this.mDomImageMiddle=createDomObjectDOM(this,this.mDomTreeObject,this.mId+"_imageMiddle","img",this.mType,this.mExtraClassCSS,this.mImageMiddle);this.mDomImageBottom=createDomObjectDOM(this,this.mDomTreeObject,this.mId+"_imageBottom","img",this.mType,this.mExtraClassCSS,this.mImageBottom);$(this.mDomTreeObject).mouseover(onMouseOver);$(this.mDomTreeObject).mouseout(onMouseOut);$(this.mDomTreeObject).click(onMouseClick);this.mDomTreeObject.style.position=this.mPositionType;this.setPosition(this.mPosX,this.mPosY);this.setSize(this.mWidth,this.mHeight);this.mDomTreeObject.style.background=this.mBgColor;this.mDomTreeObject.style.zIndex=this.mZIndex;var topSize=this.getImageSize(this.mDomImageTop);var bottomSize=this.getImageSize(this.mDomImageBottom);var middleSize=this.getImageSize(this.mDomImageMiddle);middleSize.y=getValueWithoutUnits(this.mHeight)-getValueWithoutUnits(topSize.y)-getValueWithoutUnits(bottomSize.y);if(middleSize.y<0){this.mDomImageBottom.style.height=getValueWithUnits(getValueWithoutUnits(bottomSize.y)+getValueWithoutUnits(middleSize.y));}else{this.mDomImageMiddle.style.height=getValueWithUnits(middleSize.y);}
this.mDomImageMiddle.style.width=this.mWidth;this.mDomImageBottom.style.width=this.mWidth;this.mDomImageTop.style.width=this.mWidth;}
$(this.mDomTreeObject).show();}
asdf_BackgroundStitcher.prototype.getImageSize=function(object){var imageX=getValueWithUnits(object.width);var imageY=getValueWithUnits(object.height);var ret=new Size(imageX,imageY);return ret;}
asdf_BackgroundStitcher.prototype.setPosition=function(posX,posY){this.mPosX=posX;this.mPosY=posY;setObjectPosition(this.mDomTreeObject,this.mPosX,this.mPosY,this.mPostionType,this.mUnitX,this.mUnitY);}
asdf_BackgroundStitcher.prototype.setSize=function(sizeX,sizeY){setObjectSize(this.mDomTreeObject,sizeX,sizeY,this.mUnitW,this.mUnitH);}
asdf_BackgroundStitcher.prototype.getSize=function(){var sizeX=getValueWithoutUnits(this.mDomTreeObject.width);var sizeY=getValueWithoutUnits(this.mDomTreeObject.height);var ret=new Size(sizeX,sizeY);return ret;}
asdf_BackgroundStitcher.prototype.specificAction=function(params){actionName=params.parameter[0];object=params.event.currentTarget.nextNode;switch(actionName){case"default":if(globals.debug>0)
alert("BaseElement: action name: "+actionName+" unknown!");break;}}
asdf_BackgroundStitcher.prototype.registerOnMouseOverEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOverEvents[this.mMouseOverEvents.length]=functionName;this.mMouseOverParams[this.mMouseOverParams.length]=params;}
asdf_BackgroundStitcher.prototype.registerOnMouseClickEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseClickEvents[this.mMouseClickEvents.length]=functionName;this.mMouseClickParams[this.mMouseClickParams.length]=params;}
asdf_BackgroundStitcher.prototype.registerOnMouseOutEvent=function(functionName,params){if(params==null)
params=new EventParameter();this.mMouseOutEvents[this.mMouseOutEvents.length]=functionName;this.mMouseOutParams[this.mMouseOutParams.length]=params;}
var gTimer;function changeContent(objectList){showObjectList(globals.static);showObjectList(objectList);}
function showObjectList(objectList){elements=objectList.split(",");for(var i=0;i<elements.length;i++){var elem=elements[i];elem=cleanPath(elem);if(elem=="/"){if(globals.debug>1)
alert("Warning: show up / will show nothing!!");}
showElement(elem);}}
function hideElement(elementId){var object=getJsonObject(elementId).object;if(object!=null){object.hide();}}
function showElement(elementId,elem){elementId=cleanPath(elementId);var path=elementId.split("/");if(elem==null){elem=jsonObject;var parentObject=$("#mainBody").get(0);initAndShowElements(elem,parentObject);}
var name="";for(var i=0;i<path.length;i++){elem.object.show();if(elem.children==null)
break;name=path[i];if(name=="")
break;var child=elem.children[name];if(child==null||child==undefined){if(globals.debug>1)
alert("showElement(): Warning: ElementChild: "+name+"was not found");break;}
if(child.object==null&&elem.object.addChild!=undefined)
elem.object.addChild(child);elem=child;}
if(elem!=null&&elem.object!=null&&elem.object!=undefined&&name!="")
elem.object.show();}
function initAndShowElements(element,parentObject){if(element.object==null)
init(element,parentObject);element.object.show();}
function setObjectPosition(element,left,top,type,unitW,unitH){left+="";top+="";if(left==null||left=="px"||left==""){if(globals.debug>0)
alert("setObjectPosition(): Invalid Value(Left): X"+left+"X on element "+element.id);}
if(top==null||top=="px"||top==""){if(globals.debug>0)
alert("setObjectPosition(): Invalid Value(Top): X"+top+"X on element "+element.id);}
if(type!=null)
element.style.position=type;if(unitW==null||unitW==undefined)
unitW="px";if(unitH==null||unitH==undefined)
unitH="px"
element.style.left=getValueWithUnits(left,unitW);element.style.top=getValueWithUnits(top,unitH);}
function setObjectSize(element,width,height,unitW,unitH){if(width==undefined)
width=5000;if(height==undefined)
height=5000;if(unitW=="")
untiW=globals.stdUnit;if(unitH=="")
unitH=globals.stdUnit;var v1=getValueWithUnits(width,unitW);element.style.width=v1;var v2=getValueWithUnits(height,unitH);element.style.height=v2;}
function ActionEventDelay(params){var nextAction=params.parameter[0];var time=params.paramter[1];gTimer=setTimeout(function(){nextAction(params.event)},time);}
function ActionHandlerShow(params){showElement(params.parameter[0]);}
function ActionHandlerToggle(params){var object=getJsonObject(params.parameter[0])
if(object!=null&&object.object!=null){if(object.object.mDomTreeObject!=null&&$(object.object.mDomTreeObject).is(":visible")){if(object.object!=null)
object.object.hide();}else{if(object.object!=null)
object.object.show();}}}
function ActionHandlerHide(params){var elementName=params.parameter[0];hideElement(elementName);}
function ActionHandlerSpecific(params){var object=getJsonObject(params.parameter[0]).object;if(object==null&&getJsonObject(params.parameter[0])!=null)
showElement(params.parameter[0])
object=getJsonObject(params.parameter[0]).object;var actionParameter=new EventParameter();for(i=1;i<params.parameter.length;i++)
actionParameter.parameter[actionParameter.parameter.length]=params.parameter[i];actionParameter.event=params.event;object.specificAction(actionParameter);}
function ActionHandlerSend(params){}
function ActionHandlerLink(params){var actionParameter=new EventParameter();for(i=1;i<params.parameter.length;i++)
actionParameter.parameter[actionParameter.parameter.length]=params.parameter[i];var link=actionParameter.parameter[0];if(link.match(/^mailto:/)){window.location=link;}else{if(!link.match(/http:\/\//))
link="http://"+link;window.open(link);}}
function notifyParent(object){}
function onMouseOver(event){var object=event.currentTarget.nextNode;for(var i=0;i<object.mMouseOverEvents.length;i++){params=new EventParameter();params=object.mMouseOverParams[i];params.event=event;object.mMouseOverEvents[i](params);}}
function onMouseOut(event){var object=event.currentTarget.nextNode;for(var i=0;i<object.mMouseOutEvents.length;i++){params=new EventParameter();params=object.mMouseOutParams[i];params.event=event;object.mMouseOutEvents[i](params);}}
function onMouseClick(event){var object=event.currentTarget.nextNode;for(var i=0;i<object.mMouseClickEvents.length;i++){params=new EventParameter();params=object.mMouseClickParams[i];params.event=event;object.mMouseClickEvents[i](params);}}
function onKeyPress(event){object=event.currentTarget.nextNode;if(object.mKeyPressEvents==null){if(globals.debug>1)
alert("Warning: Object: "+object.mId+" cannot handle Keypress Events");return;}
for(var i=0;i<object.mKeyPressEvents.length;i++){params=new EventParameter();params=object.mKeyPressParams[i];params.event=event;object.mKeyPressEvents[i](params);}}
function EventParameter(){this.event=null;this.parameter=new Array();}
ROOT="/webengine";function main(){var elem=jsonObject[0];changeContent(globals.start);}
function linkCalled(id){if(id=="./"){main();var params=disassembleURL();if(params.query!=""){hideElement("./");changeContent(params.query);}}else{location.href=ROOT+"/index.html?"+id;}}
function init(elem,parentObject){if(parentObject==null){if(globals.debug>0)
alert("init: ParentObject is null - cancel");return;}
elem.id=cleanPath(elem.id);switch(elem.type){case"Button":elem.object=new asdf_Button(elem.id,parentObject,elem.position_x,elem.position_y,elem.standard_src,elem.active_src,elem.hover_src,elem.width,elem.height,elem.position_type,elem.alt_text,elem.extra_css,elem.initial_show,elem.layer_level);registerActions(elem);break;case"BackgroundStitcher":elem.object=new asdf_BackgroundStitcher(elem.id,parentObject,elem.position_x,elem.position_y,elem.background_color,elem.width,elem.height,elem.image_top_src,elem.image_middle_src,elem.image_bottom_src,elem.position_type,elem.extra_css,elem.initial_show,elem.layer_level);registerActions(elem);break;case"Panel":elem.object=new asdf_Panel(elem.id,parentObject,elem.position_x,elem.position_y,elem.background_color,elem.width,elem.height,elem.position_type,elem.extra_css,elem.initial_show,elem.layer_level);registerActions(elem);break;case"AccordionPanel":var pages=getPages(elem);elem.object=new asdf_AccordionPanel(elem.id,parentObject,elem.position_x,elem.position_y,elem.background_color,elem.position_type,elem.start_page,elem.extra_css,elem.collapse,pages,elem.initial_show,elem.layer_level);registerActions(elem);break;case"Image":elem.object=new asdf_Image(elem.id,parentObject,elem.position_x,elem.position_y,elem.width,elem.height,elem.src,elem.position_type,elem.alt_key,elem.extra_css,elem.initial_show,elem.layer_level);registerActions(elem);break;case"InputField":elem.object=new asdf_InputField(elem.id,parentObject,elem.position_x,elem.position_y,elem.background_color,elem.width,elem.height,elem.input_sensitiv_field_offsetX,elem.input_sensitiv_field_offsetY,elem.backgroundImage_src,elem.forbidden_signs,elem.password_modus,elem.font_color,elem.font_size,elem.font_family,elem.position_type,elem.extra_css,elem.initial_show,elem.layer_level);registerActions(elem);break;case"TextField":elem.object=new asdf_Textfield(elem.id,parentObject,elem.position_x,elem.position_y,elem.background_color,elem.texts,elem.font_family,elem.font_size,elem.font_color,elem.width,elem.height,elem.position_type,elem.extra_css,elem.initial_show,elem.layer_level);registerActions(elem);break;case"PagePanel":var pages=getPages(elem);elem.object=new asdf_PagePanel(elem.id,parentObject,elem.position_x,elem.position_y,elem.background_color,elem.width,elem.height,elem.animation_speed,pages,elem.position_type,elem.spacing,elem.orientation,elem.extra_css,elem.initial_show,elem.layer_level);registerActions(elem);break;case"RollOutPanel":elem.object=new asdf_RollOutPanel(elem.id,parentObject,elem.position_x,elem.position_y,elem.background_color,elem.width,elem.height,elem.animation_speed,elem.position_type,elem.extra_css,elem.initial_show,elem.layer_level);registerActions(elem);break;case"HVPanel":var pages=getPages(elem);elem.object=new asdf_HVPanel(elem.id,parentObject,elem.position_x,elem.position_y,elem.background_color,elem.width,elem.height,elem.space_between_elements,elem.orientation,elem.position_type,pages,elem.extra_css,elem.initial_show,elem.layer_level);registerActions(elem);break;default:alert("Unknown type: "+elem.type+" on Element: "+elem.id);break;}
if(elem.object==null){if(globals.debug>0)
alert("Error on create Element"+elem.id);}}
function registerActions(element){var actions=["action_click","action_hover","action_out"];for(var i=0;i<actions.length;i++){var name=actions[i];var actionElement=new Array();if(element[name]!=null||element[name]!=undefined){actionElement=element[name];if(typeof actionElement!=Array)
var bal=5;for(var x=0;x<actionElement.length;x++){var actionHandler=getActionHandler(actionElement[x]);var actionParameter=getActionParameter(actionElement[x]);if(actionHandler==null){if(globals.debug>0){alert("Warning: "+element.object.mId+" has unknown action \""+actionElement[x].name+"\"");}
continue;}
switch(i){case 0:element.object.registerOnMouseClickEvent(actionHandler,actionParameter);break;case 1:element.object.registerOnMouseOverEvent(actionHandler,actionParameter);break;case 2:element.object.registerOnMouseOutEvent(actionHandler,actionParameter);break;default:if(globals.debug>0)
alert("Error: registeAction(): unknown MouseAction: "+mouseAction);break;}}}else{if(globals.debug>2)
alert("Warning: init(): Elemement "+element.id+" has no "+actions[i]+" action defined");}}}
function getActionHandler(actionElement){actionElement.name=trimString(actionElement.name);actionElement.name=actionElement.name.toLowerCase();if(actionElement.name=="show")
return ActionHandlerShow;if(actionElement.name=="hide")
return ActionHandlerHide;if(actionElement.name=="toggle_visibility")
return ActionHandlerToggle;if(actionElement.name=="delay")
return ActionHandlerDelay;if(actionElement.name=="specific")
return ActionHandlerSpecific;if(actionElement.name=="send")
return ActionHandlerSend;if(actionElement.name=="link")
return ActionHandlerLink;else{return null;}}
function getActionParameter(actionElement){var parameter=new EventParameter();parameter.parameter=actionElement.parameters;return parameter;}
function getUnit(value){value+="";if(value.match(".*%"))
return"%";if(value.match(".*px"))
return"px";return"";}
function getValueWithUnits(value,unit){if(unit==null||unit==""||unit==undefined){unit=globals.stdUnit;}
value+="";var currUnit=getUnit(value);if(currUnit==unit)
return value;if(currUnit=="")
return(value+unit);return getValueWithoutUnits(value)+unit;}
function getValueWithoutUnits(value){value+="";value=value.replace(/px/,"");value=value.replace(/%/,"");return Number(value);}
function invertValue(value){value+="";var number=0;var unit=globals.stdUnit;if(value.match(".*%")){number=Number(value.replace(/%/,""));unit="%";}
else if(value.match(".*px")){number=Number(value.replace(/px/,""));unit="px";}
return(number*-1+unit);}
function createDomObject(parent,id,type,css,extra_css,src,extraContent){return(createDomObjectDOM(parent,parent.mParent,id,type,css,extra_css,src,extraContent));}
function createDomObjectDOM(parent,domparent,id,type,css,extra_css,src,extraContent){if(parent==null){if(globals.debug>0)
alert("Error Creating Dom Object - no parent set!");return null;}
if(domparent==null){if(globals.debug>0)
alert("Error Creating Dom Object - no DOM parent set!");return null;}
if(id==null){if(globals.debug>0)
alert("Error Creating Dom Object - no id set!");return null;}
if(type==null)
type="div";if(css==null)
css="NOTSET";if(extra_css==null)
extra_css=="EXTRA_NOTSET";var cmd;if(type.match(/input.*password/)){cmd="<input id=\""+id+"\" type=\"password\" class =\""+css+" "+extra_css+"\">";type="input";}
else if(src!=null)
cmd="<"+type+" id=\""+id+"\" class =\""+css+" "+extra_css+"\" src=\""+src+"\">";else
cmd="<"+type+" id=\""+id+"\" class =\""+css+" "+extra_css+"\">";if(extraContent==null)
extraContent="";var ending=checkForTypesWithEnding(type);if(ending)
cmd+=extraContent+"</"+type+">";$(domparent).append(cmd);var domObject=$(type+"[id="+id+"]").get(0);domObject.nextNode=parent;return domObject;}
function checkForTypesWithEnding(type){var flag=false
flag|=type.match(/^h?/);flag|=type=="p";flag|=type=="pre";flag|=type=="b";flag|=type=="div";return flag;}
function getJsonObject(id){id=cleanPath(id);var path=id.split("/");var elem=jsonObject;for(var i=0;i<path.length;i++){var name=path[i];if(name=="")
break;elem=elem.children[name];if(elem==undefined||elem==null){if(globals.debug>0)
alert("Warning: cannot found object: <"+id+"> Maybe wrong reference an action?\n getJsonObejct():  ")}}
return elem;}
function getPathWithFromRoot(element,root){if(element.id.match(root.id+/.+/)){var path=element.id.replace(root.id,"");return cleanPath(path);}else{if(globals.debug>0){alert("Error: getPathWithNewRoot(): element: "+element.id+"is no child of :"+root.id);return"";}}}
function isSubstringOf(small,big){var subLen=small.length;var flag=false;for(var i=0;i<(big.length-subLen);i++){if(small==big.substring(i,i+subLen)){flag=true;break;}}
return flag;}
function removeElementFromArray(index,array){var ret=new Array();for(var i=0;i<array.length;i++){if(i!=index)
ret[ret.length]=array[i];}
return ret;}
function removeElementFromString(index,string){var ret="";for(var i=0;i<string.length;i++){if(i!=index)
ret+=string[i];}
return ret;}
function trimString(string){if(string==null||string==undefined){if(globals.debug>0)
alert("Error: trimString(), String is undefined ");return string;}
return string.replace(/^\s*/,"").replace(/\s*$/,"");}
function isElementOf(element,array){for(var i=0;i<array.length;i++){if(array[i]==element)
return true;}
return false;}
function cleanPath(path){path=path.replace(/\/\//,"/");path=path.replace(/\.\//,"");return path;}
function checkBrowser(){var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/)||[])[1],chrome:/chrome/.test(userAgent),safari:/webkit/.test(userAgent)&&!/chrome/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};return jQuery.browser;}
function getParent(object){if(object==null)
return null;if(object.mParent==null)
return null;return object.mParent.nextNode;}
function disassembleURL(){var fullURL=document.location;var regex=/([a-zA-Z]+):\/\/([^/:]+)(:[0-9]+)?(([^\/]+\/)*\/[^?#]*)(\?([^#]+))?(#.+)?/;regex.exec(fullURL);return{"scheme":RegExp.$1,"authority":RegExp.$2,"port":RegExp.$3,"path":RegExp.$4,"query":RegExp.$7,"fragment":RegExp.$8}}
function Size(valueX,valueY){this.x=valueX;this.y=valueY;}