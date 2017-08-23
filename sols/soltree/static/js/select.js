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

function create_third_prompt(picked_str, node){
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
  var explanation_p = $("<p style='font-size:30px'>");
  explanation_p.html('Choose the best summarization you think, it\'s possible to refine it');
  var radio_div = $("<div>");
  var rad1 = $("<input>", {
    type : 'radio',
    value : 1,
    name : 'refining'
  });
  var text1 = $("<span>", {
    css : {
      'font-size' : '25px'
    },
    id : 'text1'
  });
  text1.html(picked_str + "<br>");
  var rad2= $("<input>", {
    type : 'radio',
    value : 2,
    name : 'refining'
  });
  var text2 = $("<span>", {
    css : {
      'font-size' : '25px'
    },
    id : 'text2'
  });
  text2.html(checked.join(", "));
  text2.append("<br>");
  var rad3 = $("<input>", {
    type : 'radio',
    value : 3,
    name : 'refining'
  });
  var text3 = $("<input>", {
    type : 'text',
    width : '80%',
    css : {
      'font-size' : '25px'
    },
    id : 'text3'
  });
  text3.val(checked.join(", "));
  radio_div.append(rad1);
  radio_div.append(text1);
  radio_div.append(rad2);
  radio_div.append(text2);
  radio_div.append(rad3);
  radio_div.append(text3);
  var done_button = $("<input>", {
    type : 'button',
    value : 'done',
    css : {
      margin : '5px',
    }
  });
  done_button.on("click",function (){
    var index = $('input[name=refining]:checked').val();
    refined_str = $("#text"+index).val() || $("#text"+index).html();
    node.find(".node-name").html(refined_str);
    $(this).parent().remove();
    $("#div-body").removeClass('blur');
  });
  var no_button = $("<input>", {
    type : 'button',
    value : 'no',
    css : {
      margin : '5px',
    }
  });
  no_button.on("click",function (){
    $(this).parent().remove();
    $("#div-body").removeClass('blur');
  });

  prompt_div.append(explanation_p);
  prompt_div.append(radio_div);
  prompt_div.append(done_button);
  prompt_div.append(no_button);
  $("body").append(prompt_div);
  prompt_div.css('top', (window.innerHeight - prompt_div.height())/2);
}

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
  p_explanation.html("You're trying to create new solution branch!");

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
      class : 'step_p'
    });
    temp_p.html(temp_div.find('.node-name').html());
    // temp_p.html("Step "+ (index+1) + " : " + $(this).find('.node-name').html());
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
    $(this).prepend("Step "+ (index+1) + " : " );
  });
  prompt_div.css('top', (window.innerHeight - prompt_div.height())/2);
});

$( document ).ready(function() {
    $(".root").click();
});
