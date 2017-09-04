/*
This file is for selecting node with exisitng node
*/

var checked = [];
var refined_str = "";
var is_picking = null;
var deepest_div = null;
var deepest_div_pk = 0;

$(".childnode").append($("<div>", {
  "class": 'div-steps',
  css : {
  "padding-bottom" : '10px'
  },
}));

$(".subsum").append($("<div>", {
  'class' : 'div-btn',
  'align' : 'right',
}));

$(".childnode").on("click", function(){
  if(!is_picking)
    return;
  if(!$(this).hasClass('selectable'))
    return;
  if($(this).find('.div-steps').html().includes(is_picking))
  {
    $(this).removeClass("selected");
    var temp_div = $(this).find('.div-steps')
    temp_div.html(temp_div.html().replace(is_picking, ""));
  }
  else {
    $(this).addClass("selected");
    $(this).find('.div-steps').append(is_picking);
  }

  $(".childnode").each(function(){
    if($(this).find(".div-steps").html())
    {
      var cur_pk = get_pk_from_div($(this));
      if(deepest_div_pk<cur_pk){
        deepest_div_pk = cur_pk;
        deepest_div = $(this);
      }
    }
  });
  give_token(deepest_div, 0);
  $(".childnode").removeClass("selectable");
  $(".childnode[token='yes']").addClass("selectable");
  if(deepest_div == null)
    $(".childnode").addClass("selectable");
  $(".childnode").attr('token', '');
});

$(".subsum").on("click", function(){
  if($(this).hasClass('sum-selected') || is_picking)
    return;
  $(this).addClass('sum-selected');
  var btn_confirm = $("<input>", {
    type : 'button',
    value : 'confirm',
    css : {
      'margin' : '4px'
    },
    width : '55px'
  });
  var btn_fix = $("<input>", {
    type : 'button',
    value : 'fix',
    css : {
      'margin' : '4px',
      'display' : 'none'
    },
    width : '55px'
  });
  btn_confirm.on("click", function(){
    $(".selected").removeClass('selected');
    is_picking = null;
    $(this).hide();
    $(this).parent().find('input[value="fix"]').show();
  })
  btn_fix.on("click", function(){
    is_picking = $(this).parent().parent().find(".div_num").html();
    $(".childnode").each(function(){
      if($(this).find('.div-steps').html().includes(is_picking))
        $(this).addClass("selected");
    })
    $(this).hide();
    $(this).parent().find('input[value="confirm"]').show();
  })
  $(this).find('.div-btn').append(btn_confirm);
  $(this).find('.div-btn').append(btn_fix);
  is_picking = $(this).find(".div_num").html();
})

$(".add_sol").on('click', function(){
  $("#div-body").addClass('blur');
  var prompt_div = $("<div>", {
    css : {
      position : 'absolute',
      left : 0.05*window.innerWidth,
      width : 0.9 * window.innerWidth,
      backgroundColor : 'white',
      border : '1px solid black'
    },
    class : 'prompt'
  });
  var p_explanation = $("<p>", {
    css : {
      'font-size' : '30px'
    }
  });
  p_explanation.html("You're trying to add new solution branch!");

  var div_picked_item = $("<div>", {
    css : {
      'font-size' : '25px',
    }
  });
  temp_div = deepest_div;
  while(temp_div!=null)
  {
    if(temp_div.hasClass('root'))
      break;
    var temp_p = $("<p>", {
      class : 'line_p'
    });
    var step_p = $("<span>", {
      class : 'step_p',
      css : {
        'float' : 'left',
      }
    });
    var content_div = $("<div>", {
      class : 'content_div',
      pk : parseInt(temp_div.attr("id").replace("node_","")),
      css : {
        'float' : 'left',
      }
    });
    var del_div = $("<div>", {
      class : 'del_div',
      css : {
        'text-align' : 'right',
        'width' : '100%',
      }
    });
    var edit_img = $("<img>", {
      css : {
        'cursor' : 'pointer hand',
        'width' : '30px',
        'height' : '30px'
      },
      src : "/assets/img/edit.png"
    })
    var success_img = $("<img>", {
      css : {
        'cursor' : 'pointer hand',
        'width' : '30px',
        'height' : '30px',
      },
      src : "/assets/img/success.png"
    });
    success_img.hide();
    var del_img = $("<img>", {
      css : {
        'cursor' : 'pointer hand',
        'width' : '30px',
        'height' : '30px'
      },
      src : "/assets/img/error.png"
    });
    // del_span.html("X");
    edit_img.on("click", function(){
      var text_input = $("<input>", {
        type : 'text',
        width : 0.7 * window.innerWidth,
        placeholder : $(this).parent().parent().find(".content_div").html()
      });
      $(this).hide();
      success_img.show();
      $(this).parent().parent().find(".content_div").html(text_input);
    })
    success_img.on("click", function(){
      var refine_text = $(this).parent().parent().find("input").val();
      if(refine_text=="")
      {
         refine_text = $(this).parent().parent().find("input").attr('placeholder');
      }
      $(this).parent().parent().find(".content_div").html(refine_text);
      $(this).hide();
      edit_img.show();
    })
    del_img.on("click", function(){
      // TODO index update
      $(this).parent().parent().remove();
    });
    content_div.append(temp_div.find('.node-name').html());
    del_div.append(edit_img);
    del_div.append(success_img);
    del_div.append(del_img);
    temp_p.append(step_p);
    temp_p.append(content_div);
    temp_p.append(del_div);
    div_picked_item.prepend(temp_p);
    temp_pk = get_pk_from_div(temp_div);
    temp_div = get_parent_div_by_pk(temp_pk);
  }

  var div_add = $("<div>");
  var add_img = $("<img>",{
    src : '/assets/img/plus.png',
    css : {
      width : '30px',
      height : '30px',
    }
  });
  var span_add = $("<span>", {
    css : {
      'font-size' : '30px',
    }
  });
  span_add.html("Add step");
  div_add.append(add_img);
  div_add.append(span_add);

  div_add.on("click", function(){
    var index = $('.step_p').length;
    var temp_p = $("<p>", {
      class : 'step_p'
    });
    var text_input = $("<input>", {
      class : 'new_node',
      type : 'text',
      width : '80%',
    })
    temp_p.html("Step "+ (index+1) + " : ");
    temp_p.append(text_input);
    div_picked_item.append(temp_p);
  });
  var done_button = $("<input>", {
    type : 'button',
    value : 'done',
    css : {
      margin : '5px',
    }
  });
  done_button.on("click",function (){
    make_new_chart_config();
    $(this).parent().remove();
    $("#div-body").removeClass('blur');
  });
  var close_button = $("<input>", {
    type : 'button',
    value : 'close',
    css : {
      margin : '5px',
    }
  });
  close_button.on("click",function (){
    $(this).parent().remove();
    not_from_close = false;
    $(".last").click();
    $("#div-body").removeClass('blur');
  });

  prompt_div.append(p_explanation);
  prompt_div.append(div_picked_item);
  prompt_div.append(div_add);
  prompt_div.append(done_button);
  prompt_div.append(close_button);
  $("body").append(prompt_div);
  $(".step_p").each(function(index){
    $(this).append("Step "+ (index+1) + " :&nbsp;" );
  });
  prompt_div.css('top', (window.innerHeight - prompt_div.height())/2);
});

jQuery.fn.reverse = [].reverse;
var new_chart_config = chart_config;
var parent_key = 2;
function make_new_chart_config(){
  new_chart_config = jQuery.extend([], chart_config);
  var last_pk = parseInt($(".content_div").last().attr('pk'));
  var child_config = null;
  if($(".new_node").length == 0)
  {
    return;
  }
  $(".new_node").reverse().each(function(){
    var temp_config = {
      HTMLclass : 'childnode selectable new',
      text : {
        name : $(this).val(),
      },
      children : [],
    };
    if(child_config)
    {
      temp_config['children'].push(child_config);
      child_config['new_parent'] = temp_config;
    }
    new_chart_config.push(temp_config);
    child_config = temp_config;
  });
  if($(".content_div").length==0)
  {
    new_chart_config[1]['children'].push(child_config);
    child_config['new_parent'] = new_chart_config[1];
  }
  else{
    for(i=0;i<chart_config.length;i++)
    {
      if(new_chart_config[i]['pk']==last_pk)
      {
        new_chart_config[i]['children'].push(child_config);
        child_config['new_parent'] = new_chart_config[i];
      }
    }
  }
  var tree = new Treant(new_chart_config, null, $);
  return 0;
}
function go_submit(method){
  var path = '/problem/submit/';
  method = method || "post";
  params = {
    parent_key : parent_key,
  };
  for(var i=0;i<new_chart_config.length - chart_config.length;i++)
  {
    params[i+''] = new_chart_config[chart_config.length+i]['text']['name'];
  }
  var form = document.getElementById("formtag");
  form.setAttribute("action", path);
  for(var key in params){
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
}


$( document ).ready(function() {
    $(".root").click();
});
