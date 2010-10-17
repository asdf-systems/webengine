/**
 * Class documentation for Button
 */
//* class Button{
function Button(positionX, positionY){

    this.mPosX = positionX;
    this.mPosY = positionY;
}

Button.prototype.hide = function(event) {

}
/**
 * Button show
 */
Button.prototype.show = function(event) {

}

/**
 * Methoddocumentation for Button SpecificAction
 */
Button.prototype.specificAction = function(actionName){
    
    if(actionName == null){
        //! \todo: Do some error output here
        return;
    }
    switch(actionName){
        default:
            //! \todo: do some error Output here
        break;      
    }
}
//*};
