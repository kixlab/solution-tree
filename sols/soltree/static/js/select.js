var checked = [];
var refined_str = "";
var choose_step = false;
var choose_div_steps = null;

$(".childnode").append($("<div>", {
  "class": 'div-steps',
  css : {
  "padding-bottom" : '10px'
  },
}));
$(".childnode").append($("<div>", {
  'class' : 'div-btn',
  'align' : 'right',
}));

$(".childnode").on("click", function(){
  if(!$(this).hasClass("last"))
    return;

  choose_div_steps = $(this).find('.div-steps');
  $(this).find('.div-steps').html("Matching step : nothing")
  var btn_confirm = $("<input>", {
    type : 'button',
    value : 'confirm',
    css : {
      'padding' : '2px'
    },
    width : '50px'
  });
  $(this).find('.div-btn').append(btn_confirm);
  choose_step = true;

  btn_confirm.on("click", function(e){
    e.stopPropagation();
    var btn_refine = $("<input>", {
      type : 'button',
      value : 'refine',
      css : {
        'padding' : '2px'
      },
      width : '50px'
    });
    $(".last").find('.div-btn').append(btn_refine);
    $('.sum-selected').removeClass('sum-selected');
    btn_refine.on('click', function(e){
      e.stopPropagation();
      var nn = $(this).parent().parent().find('.node-name').html();
      create_third_prompt(nn, $(this).parent().parent());
    });
    $(".last").find('.collapse-switch').click();
    choose_div_steps = null;
    choose_step = false;
    $(this).remove();
  })
});

$(".subsum").on("click", function(){
  if(choose_step)
  {
    $(this).toggleClass('sum-selected');

    var selected_steps = $('.sum-selected');
    if(selected_steps.length==0)
    {
      choose_div_steps.html("Matching step : nothing");
    }
    else {
      choose_div_steps.html("Matching step : ");
      checked = []
      selected_steps.each(function(){
        choose_div_steps.append($(this).find('.div_num').html());
        checked.push($(this).find(".p_sum").html().replace("<br>",""));
      });
    }
  }
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

$(".addsum").on('click', function(){
  if(!$(this).hasClass("last"))
    return;
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
  $('.childnode.selected').each(function(index){
    var temp_p = $("<p>", {
      class : 'step_p'
    });
    temp_p.html("Step "+ (index+1) + " : " + $(this).find('.node-name').html());
    div_picked_item.append(temp_p);
  });
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
  prompt_div.css('top', (window.innerHeight - prompt_div.height())/2);
});

$( document ).ready(function() {
    $(".root").click();
});
