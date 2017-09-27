
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
      backgroundColor : "gray",
      border : "1px solid rayalblue",
      float : 'left',
      color : 'white',
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
  div_num.css('text-align', 'left');
  div_num.append('&nbsp;Step '+(get_sum_num()+1).toString());
  div_tot.attr('id', 'subsum'+(get_sum_num()+1));
  div_tot.css("margin-left",width_sum*0.05.toString()+'px');
  div_tot.css("margin-right",width_sum*0.05.toString()+'px');
  div_tot.css("margin-top",'20px');
  div_tot.css("width", width_sum*0.9.toString()+"px");
  div_tot.css('word-wrap', 'break-word');
  p_sum.css('text-align', 'center');
  p_sum.append('<br>'+sum);
  div_tot.appendTo("#sum-box");
  div_tot.append(div_num);
  div_tot.append(p_sum);
};
