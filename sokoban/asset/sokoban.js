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
function draw_box(box){
  var _data = box.get(),
    len = _data.length,
    i = 0;
  for(;i<len;i++){
    container.appendChild(_data[i].element);
    _data[i].element.style.left = _data[i].x*size + 'px';
    _data[i].element.style.top = _data[i].y*size + 'px';
  }
}

function move_box(box, x, y){
  box.x = x;
  box.y = y;
  box.element.style.left = x*size + 'px';
  box.element.style.top = y*size + 'px';
  check_box(box);
}

function check_box(box){
  var x = box.x,
    y = box.y;
  if(map_data[y][x] === 2){
    box.checked = 1;
    check_success();
  }else{
    box.checked = 0;
  }
}

function check_success(){
  var checked_number = box_data.get({checked: 1}),
    all_number = box_data.get();
  if(all_number.length === checked_number.length){
    alert('game success');
  }
}

function check_place(x, y){
  var r = {check: 0},
    check_box = box_data.get({x: x, y: y});
  
  if(check_box.length > 0){
    r.check = 'box';
    r.box = check_box[0];
  }else{
    var check_map = map_data[y][x];
    r.check = check_map;
  }
  return r;
}

function direction_get(x, y, direction){
  var x = x, y = y;
  if(direction == 1){
    y -= 1;
  }else if(direction == 2){
    x += 1;
  }else if(direction == 3){
    y += 1;
  }else if(direction == 4){
    x -= 1;
  }else{
    return false;
  }
  return [x, y];
}

function move(direction){
  var _target = direction_get(role_data.x, role_data.y, direction),
    check = check_place(_target[0], _target[1]);
  if(check.check){
    if(check.check === 'box'){
      var _target2 = direction_get(_target[0], _target[1], direction),
        check2 = check_place(_target2[0], _target2[1]);
      if(check2.check && check2.check!='box'){
        role_data.x = _target[0];
        role_data.y = _target[1];
        draw_role(role_data);
        move_box(check.box, _target2[0], _target2[1]);
      }
    }else{
      role_data.x = _target[0];
      role_data.y = _target[1];
      draw_role(role_data);
    }
  }
}

function init(){
  var the_map = map[level],
    the_role = the_map['role'],
    the_box = the_map['box'],
    i, len,
    role = document.createElement('div'),
    box,
    key = keyEvent();

  role.className = 'role';
  role_data = {x:the_role[0], y:the_role[1], element: role};

  map_data = the_map['land'];

  for(i = 0, len = the_box.length; i<len; i++){
    box = document.createElement('div');
    box.className = 'box';
    box_data.set({
      element: box,
      id: i,
      x: the_box[i][0],
      y: the_box[i][1]
    })
  }

  draw_map(map_data);
  container.appendChild(role);
  draw_role(role_data);

  draw_box(box_data);

  key.onUp = function(){
    move(1);
  }
  key.onRight = function(){
    move(2);
  }
  key.onDown = function(){
    move(3);
  }
  key.onLeft = function(){
    move(4);
  }
}
init();