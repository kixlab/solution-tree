var img = document.querySelector('img');

img.addEventListener('load', function(){
  $("#vert-line").height($("#sol-img").height()+1);
  $("#sum-outer-div").height($("#sol-img").height()+5);
  $("#sum-box").height($("#sol-img").height()-53);
});

function get_sum_num(){
  return $(".subsum").length;
};

function check_sum_num()
{
  $(".subsum").each(function(index) {
    var div_num = $(this).find(".div_num");
    div_num.html("&nbsp;Step "+(index+1).toString());
  });
  $(".step_div").each(function(index) {
    $(this).html(("Step "+(index+1)));
  });
};

function ask_summarization(sum, box, step_div) {
  var width_sum = $("#sum-box").width();
  var div_tot = $("<div>", {
    css : {
      height : '100px',
      backgroundColor : "skyblue",
      border : "1px solid rayalblue",
      float : 'left',
    },
    class : 'subsum',
  })
  var p_sum = $("<p>", {
    class : 'p_sum',
    css : {
      margin : '10px',
    }
  });
  var div_num = $('<div>', {
    class : 'div_num',
    css : {
      width : width_sum*0.8.toString()+"px",
      height : '20px',
      float : 'left',
    }
  });
  var div_del = $('<div>', {
    class : 'div_del',
    css : {
      width : width_sum*0.1.toString()+"px",
      height : '20px',
      float : 'left',
    }
  });
  div_num.css('text-align', 'left');
  div_num.append('&nbsp;Step '+(get_sum_num()+1).toString());
  div_del.click(function(){
    div_tot.remove();
    box.remove();
    step_div.remove();
    check_sum_num();
  });
  div_tot.css("margin-left",width_sum*0.05.toString()+'px');
  div_tot.css("margin-right",width_sum*0.05.toString()+'px');
  div_tot.css("margin-top",width_sum*0.05.toString()+'px');
  div_tot.css("width", width_sum*0.9.toString()+"px");
  div_tot.css('word-wrap', 'break-word');
  div_del.css('text-align', 'right');
  div_del.append('x&nbsp;');
  div_del.css('cursor', 'pointer');
  p_sum.css('text-align', 'center');
  p_sum.append('<br>'+sum);
  div_tot.appendTo("#sum-box");
  div_tot.append(div_num);
  div_tot.append(div_del);
  div_tot.append(p_sum);
};

function initDraw(canvas) {
    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX;
            mouse.y = ev.pageY;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX;
            mouse.y = ev.clientY;
        }
    };

    var element = null;
    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
    }

    canvas.onclick = function (e) {
        console.log("click!");
        if (element != null) {
            canvas.style.cursor = "default";
            var sum = prompt(
              `Your summarization Should be
               - Key step for solving this problem
               - not specific, be high-level abstract
              `
            );
            if(sum == null)
            {
              element.parentNode.removeChild(element);
              element = null;
              return;
            }
            var minX = Math.min(mouse.startX, mouse.x);
            var minY = Math.min(mouse.startY, mouse.y);
            var step_div = $('<div>', {
              css :
              {
                position : 'absolute',
                left : minX,
                top : minY - 30,
                color : 'white'
              },
              class : 'step_div'
            })
            step_div.html("Step "+ (get_sum_num()+1));
            $('body').append(step_div);

            ask_summarization(sum, element, step_div);
            element = null;
            console.log("finsihed.");
        } else {
            console.log("begun-1.");
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement('div');
            element.className = 'rectangle'
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            canvas.append(element)
            canvas.style.cursor = "crosshair";
            console.log("begun-2.");
        }
    }
}
initDraw(document.getElementById('div-img'));
