var map_data,
  role_data,
  box_data = new datadepot(),
  level = 0,
  size = 30,
  container = document.getElementById('sokoban');

function draw_map(map){
  var x, y, xMap, rMap = '';

  container.innerHTML = '';
  for(y = 0, len = map.length; y<len; y++){
    xMap = map[y];
    for(x = 0, xlen = xMap.length; x<xlen; x++){
      rMap += '<div style="position:absolute;left:'+x*size+'px;top:'+y*size+'px;" class="place place'+xMap[x]+'"></div>';
    }
  }
  container.innerHTML = rMap;
}
function draw_role(role){
  var element = role.element,
    x = role.x*size,
    y = role.y*size;
  element.style.left = x+'px';
  element.style.top = y+'px';
}
function draw_box(){
  
}

function check_place(){

}

function init(){
  var the_map = map[level],
    the_role = the_map['role'],
    the_box = the_map['box'],
    i, len,
    role = document.createElement('div'),
    key = keyEvent();

  role.className = 'role';
  role_data = {x:the_role[0], y:the_role[1], element: role};

  map_data = the_map['land'];

  
  for(i = 0, len = the_box.legnth; i<len; i++){
    box_data.set({
      id: i,
      x: the_box[i][0],
      y: the_box[i][1]
    })
  }
  
  draw_map(map_data);
  container.appendChild(role);
  draw_role(role_data);

  key.onUp = function(){
    var _target_y = role_data.y - 1;
    role_data.y = _target_y;
    draw_role(role_data);
  }
  key.onRight = function(){
    var _target_x = role_data.x + 1;
    role_data.x = _target_x;
    draw_role(role_data);
  }
  key.onDown = function(){
    var _target_y = role_data.y + 1;
    role_data.y = _target_y;
    draw_role(role_data);
  }
  key.onLeft = function(){
    var _target_x = role_data.x - 1;
    role_data.x = _target_x;
    draw_role(role_data);
  }
}
init();