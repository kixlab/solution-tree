
function get_sum_num(){
  return $(".subsum").length;
};

function check_sum_num()
{
  $(".subsum").each(function(index) {
    var div_num = $(this).find(".div_num");
    div_num.html("&nbsp;Step "+(index+1).toString());
  })
};

function ask_summarization(sum, box) {
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
    },
    unselectable : "on",
    onselectstart : "return false;"
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
  div_tot.attr('id', 'subsum'+(get_sum_num()+1));
  div_del.click(function(){
    div_tot.remove();
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
  // var div_offset = div_tot.offset();
  // var div_drag = $("<div>", {
  //   class : 'div_drag',
  //   css : {
  //     position : 'absolute',
  //     top : div_offset.top,
  //     left : div_offset.left,
  //     width :  width_sum*0.9.toString()+"px",
  //     height : '100px',
  //   }
  // });
  // div_drag.attr('id', 'div_drag'+get_sum_num());
  // div_drag.appendTo("#sum-box");
  // div_drag.html("&nbsp;Step "+get_sum_num());
};
