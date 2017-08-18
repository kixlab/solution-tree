var checked = [];
var picked_str = "";
var refined_str = "";

$(".childnode").on("click", function(){
  if(!$(this).hasClass("last"))
    return;
  $("#div-body").addClass('blur');
  // div wrapping promopt
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

  //showing currently picked step
  var picked_div = $("<div>",{
    css : {
      'font-size' : '30px',
    }
  });
  picked_div.html("You Picked<br>");
  var picked_step = $("<span/>", {
    class : "picked_step",
    css :
    {
      'font-weight': 'bold',
      'font-size' : '40px'
    }
  });
  picked_step.html($(this).find('.node-name').html());
  picked_str = $(this).find('.node-name').html();
  picked_div.append(picked_step);
  picked_div.append(`<br>Choose your summarization which does same thing.(Multiple is posssible)
  <br>If there isn't appropriate summarazation, just click not matching`);
  var checkbox_div = $("<div>", {
    css : {
      margin : '20px',
    },
  });

  for(var i = 0;i<sum_data.length;i++)
  {
    checkbox_div.append('<input type="checkbox" name="summarization" value="'+sum_data[i]+'"> <label style="font-size:35px;">'+sum_data[i]+'</label><br></input>');
  }
  checkbox_div.append('<input type="checkbox" name="summarization" value="not matching"> <label style="font-size:35px;">not matching</label><br></input>');
  var next_button = $("<input>", {
    type : 'button',
    value : 'next',
    css : {
      margin : '5px',
    }
  });
  next_button.on("click",function (){
    //TODO view new things.
    var checked_inp = $("input[type='checkbox']:checked");
    checked = [];
    for(var i=0;i<checked_inp.length;i++)
    {
      if(checked_inp[i].value=='not matching' && i!=0){
        alert("Error : You choose 'not matching' with other summarization");
        return;
      }
      if(checked_inp[i].value!='not matching')
        checked.push(checked_inp[i].value);
    }
    $(this).parent().remove();
    create_second_prompt();
  });
  var close_button = $("<input>", {
    type : 'button',
    value : 'close',
    css : {
      margin : '5px',
    }
  });
  close_button.on("click",function (){
    $("#div-body").removeClass('blur');
    not_from_close = false;
    $(".last").click();
    $(this).parent().remove();
  });
  prompt_div.append(picked_div);
  prompt_div.append(checkbox_div);
  prompt_div.append(next_button);
  prompt_div.append(close_button);
  $("body").append(prompt_div);
  prompt_div.css('top', (window.innerHeight - prompt_div.height())/2 + 'px');
});

function create_second_prompt(){
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
  prompt_div.html('<span style="font-size : 30px">Do you want to refine current summarization?<br>');
  var yes_button = $("<input>", {
    type : 'button',
    value : 'yes',
    css : {
      margin : '5px',
    }
  });
  yes_button.on("click",function (){
    $(this).parent().remove();
    create_third_prompt();
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
    $('.last').find("a")[0].click();
  });
  prompt_div.append(yes_button);
  prompt_div.append(no_button);
  $("body").append(prompt_div);
  prompt_div.css('top', (window.innerHeight - prompt_div.height())/2);
}

function create_third_prompt(){
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
    $('.last').find('.node-name').html(refined_str);
    $(this).parent().remove();
    $("#div-body").removeClass('blur');
    $('.last').find("a")[0].click();
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
    $('.last').find("a")[0].click();
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
