var checked = [];
var picked_str = "";
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
    $(".last").find('.collapse-switch').click();
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
      selected_steps.each(function(){
        choose_div_steps.append($(this).find('.div_num').html());
      });
    }
  }
})


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
