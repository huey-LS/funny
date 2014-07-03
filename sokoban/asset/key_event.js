function keyEvent(){
  var keyCode = {
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down'
  },
  listener = {
    onLeft: function(){},
    onUp: function(){},
    onRight: function(){},
    onDown: function(){}
  };
  window.onkeydown = function(event){
    var event = event || window.event,
      code = event.keyCode
    if(keyCode[code]){
      listener['on'+keyCode[code]](event);
      if ( event && event.preventDefault ) 
        event.preventDefault(); 
      else
        event.returnValue = false; 
      return false;
    }
  }

  return listener;
}