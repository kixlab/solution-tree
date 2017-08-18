$('.subsum').attr('draggable', 'true');
$('.subsum').on('dragstart', function(event) {
  event.originalEvent.dataTransfer.setData('text', event.originalEvent.target.id);
});

$('.childnode').on('drop', function(event){
  ev = event.originalEvent;
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  $("#"+data).attr('draggable', 'false');
  var text = "Step " + data.replace('subsum',"");
  var step_div = $("<div>", {
    css : {
      backgroundColor : 'brown',
      height : '20px',
      width : '50px',
      float : 'left',
    },
    draggable : 'true'
  });
  step_div.html(text);
  var span = $("<span>", {
    css : {
      'font-size':'5px',
    }
  });
  span.html("  X");
  step_div.append(span);
  span.on('click', function(){
    $(this).parent().remove();
    $("#"+data).attr('draggable', 'true');
  });
  $(this).append(step_div);
});
$('.childnode').on('dragover', function(event){
    event.preventDefault();
});
$('.addsum').on('drop', function(event){
  ev = event.originalEvent;
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  $("#"+data).attr('draggable', 'false');
  var text = "Step " + data.replace('subsum',"");
  var step_div = $("<div>", {
    css : {
      backgroundColor : 'brown',
      height : '20px',
      width : '50px',
      float : 'left',
    },
    draggable : 'true'
  });
  step_div.html(text);
  var span = $("<span>", {
    css : {
      'font-size':'5px',
    }
  });
  span.html("  X");
  step_div.append(span);
  span.on('click', function(){
    $(this).parent().remove();
    $("#"+data).attr('draggable', 'true');
  });
  $(this).append(step_div);
});
$('.addsum').on('dragover', function(event){
    event.preventDefault();
});


// var clicked_obj = null;
//
// function create_floating_div(left, top, text){
//   var div = $('<div>', {
//     class : 'floating_div',
//     css : {
//       'position' : 'absolute',
//       'height' : '100px',
//       'width' : '100px',
//       'backgroundColor' : 'red',
//       'left' : left,
//       'top' : top
//     },
//     isclick : 'true'
//   });
//   div.html(text);
//   return div;
// }
// // $('body').append(create_floating_div('100px', '100px'));
//
// $('.subsum').on('mousedown', function(e){
//   var text = this.getElementsByClassName("div_num")[0].innerHTML;
//   var div_float = create_floating_div(e.clientX+'px', e.clientY+'px', text);
//   clicked_obj = div_float;
//   $('body').append(div_float);
//   $('.floating_div').on('mousedown', function(e){
//     clicked_obj = $(this);
//   });
// });
//
// $('body').on('mouseup', function(){
//   clicked_obj = null;
// });
//
// $('.nodeExample1').on('mouseup', function(){
//   console.log("mouse up!");
//
// })
//
// $('body').on('mousemove', function(e){
//   if(clicked_obj)
//   {
//     clicked_obj.css('left', (e.clientX+2)+'px');
//     clicked_obj.css('top', (e.clientY+2)+'px');
//   }
// });
//
// $('.node').on('mousemove', function(e){
//
// })

// div.addEventListener('mousedown', function(e) {
//     isDown = true;
//     offset = [
//         div.offsetLeft - e.clientX,
//         div.offsetTop - e.clientY
//     ];
// }, true);
//
// document.addEventListener('mouseup', function() {
//     isDown = false;
// }, true);
//
// document.addEventListener('mousemove', function(event) {
//     event.preventDefault();
//     if (isDown) {
//         mousePosition = {
//
//             x : event.clientX,
//             y : event.clientY
//
//         };
//         div.style.left = (mousePosition.x + offset[0]) + 'px';
//         div.style.top  = (mousePosition.y + offset[1]) + 'px';
//     }
// }, true);
