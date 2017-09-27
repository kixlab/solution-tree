/*
This file is for selecting node with exisitng node
*/

var checked = [];
var refined_str = "";
var is_picking = null;
var is_picking_div = null;
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
    var temp_divs = $(this).find('.step_div');
    temp_divs.each(function(){
      if($(this).html()==is_picking)
      {
        $(this).remove();
      }
    });
  }
  else {
    $(this).addClass("selected");
    var temp_div = $("<div>", {
      class : 'step_div',
    });
    temp_div.on("click", function(e){
      e.stopPropagation();
      $(this).remove();
    });
    $('.mensal').hover(function(e){
    e.stopPropagation();
    });
    temp_div.html(is_picking);
    $(this).find('.div-steps').append(temp_div);
  }
  var cnt = $(".childnode").length;
  if(deepest_div==null)
    deepest_div_pk = 0;
  $(".childnode").each(function(){
    if($(this).find(".div-steps").html())
    {
      var cur_pk = get_pk_from_div($(this));
      if(deepest_div_pk<cur_pk){
        deepest_div_pk = cur_pk;
        deepest_div = $(this);
      }
    }
    else {
      cnt--;
    }
  });
  if(cnt==0)
    deepest_div = null;
  give_token(deepest_div, 0);
  $(".childnode").removeClass("selectable");
  $(".childnode[token='yes']").addClass("selectable");
  if(deepest_div == null)
    $(".childnode").addClass("selectable");
  $(".childnode").attr('token', '');
});

$(".subsum").on("click", function(){
  if(is_picking)
    return;
  $(this).addClass('sum-selecting');
  if($(this).find("input").length!=2)
  {
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
    btn_confirm.on("click", function(e){
      e.stopPropagation();
      $(".selected").removeClass('selected');
      is_picking = null;
      $(this).hide();
      $(this).parent().find('input[value="fix"]').show();
      $(this).parent().parent().removeClass('sum-selecting')
      $(this).parent().parent().addClass('sum-selected');
      if(!$(this).parent().parent().next().hasClass("sum-selected")&&!$(this).parent().parent().next().hasClass("sum-selecting"))
        $(this).parent().parent().next().click();
    })
    btn_fix.on("click", function(e){
      e.stopPropagation();
      $(".subsum").each(function(){
        if($(this).hasClass("sum-selecting"))
        {
          $(this).removeClass('sum-selecting');
          $(this).addClass('sum-selected');
          $(this).find("input[value='confirm']").hide();
          $(this).find("input[value='fix']").show();
        }
      });
      $(this).parent().parent().removeClass('sum-selected');
      $(this).parent().parent().addClass('sum-selecting');
      is_picking = $(this).parent().parent().find(".div_num").html();
      is_picking_div = $(this).parent().parent();
      $(".childnode").each(function(){
        if($(this).find('.div-steps').html().includes(is_picking))
          $(this).addClass("selected");
      })
      $(this).hide();
      $(this).parent().find('input[value="confirm"]').show();
    })
    $(this).find('.div-btn').append(btn_confirm);
    $(this).find('.div-btn').append(btn_fix);
  }
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
      class : 'line_p orig_p'
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
      class : 'edit_img',
      css : {
        'cursor' : 'pointer hand',
        'width' : '30px',
        'height' : '30px'
      },
      src : "/assets/img/edit.png"
    })
    var success_img = $("<img>", {
      class : 'success_img',
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
      $(this).parent().find(".success_img").show();
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
      $(this).parent().find(".edit_img").show();
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
      class : 'line_p add_p'
    });
    var content_div = $("<div>", {
      class : 'content_div',
      css : {
        'float' : 'left',
      }
    });
    var text_input = $("<input>", {
      class : 'new_node',
      type : 'text',
      width :  0.7 * window.innerWidth,
    });
    text_input.autocomplete({
      source : sum_data,
      minLength : 2,
    });

    var temp_span = $("<span>", {
      css : {
        'margin' : '5px',
        'font-size' : '20px',
        'background-color' : 'red',
        'color' : 'white'
      }
    });
    temp_span.append("click check button!");
    temp_span.hide();
    var del_div = $("<div>", {
      class : 'del_div',
      css : {
        'text-align' : 'right',
        'width' : '100%',
      }
    });
    var edit_img = $("<img>", {
      class : 'edit_img',
      css : {
        'cursor' : 'pointer hand',
        'width' : '30px',
        'height' : '30px'
      },
      src : "/assets/img/edit.png"
    })
    var success_img = $("<img>", {
      class : 'success_img',
      css : {
        'cursor' : 'pointer hand',
        'width' : '30px',
        'height' : '30px',
      },
      src : "/assets/img/success.png"
    });
    var del_img = $("<img>", {
      css : {
        'cursor' : 'pointer hand',
        'width' : '30px',
        'height' : '30px'
      },
      src : "/assets/img/error.png"
    });
    edit_img.on("click", function(){
      var text_input = $("<input>", {
        class : 'new_node',
        type : 'text',
        width : 0.7 * window.innerWidth,
        placeholder : $(this).parent().parent().find(".content_div").html()
      });
      text_input.autocomplete({
        source : sum_data,
        minLength : 2,
      });
      var temp_span = $("<span>", {
        css : {
          'margin' : '5px',
          'font-size' : '20px',
          'background-color' : 'red',
          'color' : 'white'
        }
      });
      temp_span.append("click check button!");
      temp_span.hide();
      $(this).hide();
      $(this).parent().find(".success_img").show();
      $(this).parent().parent().find(".content_div").html(text_input);
      $(this).parent().parent().find(".content_div").append(temp_span);
    });
    edit_img.hide();
    success_img.on("click", function(){
      var refine_text = $(this).parent().parent().find("input").val();
      if(refine_text=="")
      {
         refine_text = $(this).parent().parent().find("input").attr('placeholder');
      }
      if(refine_text==undefined)
      {
        refine_text = ""
      }
      $(this).parent().parent().find(".content_div").html(refine_text);
      $(this).hide();
      $(this).parent().find(".edit_img").show();
    })
    del_img.on("click", function(){
      // TODO index update
      $(this).parent().parent().remove();
    });
    del_div.append(success_img);
    del_div.append(edit_img);
    del_div.append(del_img);
    temp_p.html('<span class="step_p" style="float: left;">Step '+(index+1)+' :&nbsp;</span>');
    content_div.append(text_input);
    content_div.append(temp_span);
    temp_p.append(content_div);
    temp_p.append(del_div);
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
    if($(".add_p").length>0)
    {
      if($(".new_node").length>0)
      {
        $(".new_node").each(function(){
          $(this).parent().find("span").show();
        });
        return;
      }
      var parent_pk = null;
      if($(".orig_p").length==0)
      {
        parent_pk = 'root';
      }
      else {
        parent_pk = $(".orig_p").last().find(".content_div").attr("pk");
      }
      var url = window.location.href;
      var re = new RegExp('http://127.0.0.1:8000/problem([0-9]+).*')
      var myarray = re.exec(url);
      var problem_pk = myarray[1];
      var data_dict = {
        'parent_pk' : parent_pk,
        'problem_pk' : problem_pk,
      }
      $(".add_p").each(function(index){
        data_dict['node'+index] = $(this).find(".content_div").html();
      });
      $.ajax({
        url : '/ajax/add_node',
        data : data_dict,
        success : function()
        {
          go_submit();
        }
      })
    }
    else {
      $(this).parent().remove();
      $("#div-body").removeClass('blur');
    }
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


function show_refine(){
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
  p_explanation.html("You picked following steps!");

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
      class : 'edit_img',
      css : {
        'cursor' : 'pointer hand',
        'width' : '30px',
        'height' : '30px'
      },
      src : "/assets/img/edit.png"
    })
    var success_img = $("<img>", {
      class : 'success_img',
      css : {
        'cursor' : 'pointer hand',
        'width' : '30px',
        'height' : '30px',
      },
      src : "/assets/img/success.png"
    });
    success_img.hide();
    edit_img.on("click", function(){
      var text_input = $("<input>", {
        type : 'text',
        width : 0.7 * window.innerWidth,
        placeholder : $(this).parent().parent().find(".content_div").html()
      });
      $(this).hide();
      $(this).parent().find(".success_img").show();
      $(this).parent().parent().find(".content_div").html(text_input);
    })
    success_img.on("click", function(){
      var refine_text = $(this).parent().parent().find("input").val();
      if(refine_text=="")
      {
         refine_text = $(this).parent().parent().find("input").attr('placeholder');
      }
      if(refine_text != $(this).parent().parent().find("input").attr('placeholder'))
      {
        $(this).parent().parent().attr("edited", "true");
      }
      $(this).parent().parent().find(".content_div").html(refine_text);
      $(this).hide();
      $(this).parent().find(".edit_img").show();
    })
    content_div.append(temp_div.find('.node-name').html());
    del_div.append(edit_img);
    del_div.append(success_img);
    // del_div.append(del_img);
    temp_p.append(step_p);
    temp_p.append(content_div);
    temp_p.append(del_div);
    div_picked_item.prepend(temp_p);
    temp_pk = get_pk_from_div(temp_div);
    temp_div = get_parent_div_by_pk(temp_pk);
  }
  var done_button = $("<input>", {
    type : 'button',
    value : 'done',
    css : {
      margin : '5px',
    }
  });
  done_button.on("click",function (){
    var url = window.location.href;
    var re = new RegExp('http://127.0.0.1:8000/problem([0-9]+)/select/([0-9]+)')
    var myarray = re.exec(url);
    var problem_pk = myarray[1];
    var answer_pk = myarray[2];
    if($("input[type='text']").length>0)
    {
      $.toast("<h4>click check button!<h4>", {type : 'danger'});
      return;
    }
    var params = {
      'selected' : '',
    };
    $(".line_p").each(function(){
      var temp_pk = $(this).find(".content_div").attr("pk");
      params['selected'] += temp_pk+" "
    })
    $(".line_p[edited='true']").each(function(){
      var temp_pk = $(this).find(".content_div").attr("pk");
      params[temp_pk] = $(this).find(".content_div").html();
    });
    $.ajax({
      url : '/ajax/refine_node/'+problem_pk+'/'+answer_pk,
      data : params,
      dataType : 'json',
      success : function(data)
      {
        go_submit();
      }
    });
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
  prompt_div.append(done_button);
  prompt_div.append(close_button);
  $("body").append(prompt_div);
  $(".step_p").each(function(index){
    $(this).append("Step "+ (index+1) + " :&nbsp;" );
  });
  prompt_div.css('top', (window.innerHeight - prompt_div.height())/2);
}

function go_submit(method){
  var url = window.location.href;
  var re = new RegExp('http://127.0.0.1:8000/problem([0-9]+).*')
  var myarray = re.exec(url);
  var problem_pk = myarray[1];
  var path = '/problem'+problem_pk+'/explore/';
  method = method || "post";
  var form = document.getElementById("formtag");
  form.setAttribute("action", path);
  form.submit();
}

$("#other-solution-div").hide();
$("#soltree-div").hide();
$("#other-solution-question").hover(
  function(){
    $("#other-solution-div").show();
  },
  function(){
    $("#other-solution-div").hide();
  });
$( document ).ready(function() {
    $(".root").click();
});

$("#soltree-question").hover(
  function(){
    $("#soltree-div").show();
  },
  function(){
    $("#soltree-div").hide();
  });
$( document ).ready(function() {
    $(".root").click();
});

$("#subsum1").click();
