var RADIUS = "radius";
var OBJ_X = "object_x";
var OBJ_Y = "object_y"

/*
 *  returns the object that causes the collision. Null if no
 *  object is intersected
 */
function collides(objectArr, curX, curY) {
    var toRet = null;
    for(var i = 0; i < objectArr.length && toRet == null; i++){
        var x = objectArr[i][OBJ_X];
        var y = objectArr[i][OBJ_Y];
        var radius = objectArr[i][RADIUS];    
    
        if (sqrt( ((x - curX)*(x - curX) + (y - curY)*(y - curY)) < radius)) {
            toRet = objectArr[i];
        }
    }
    
    return toRet;
}