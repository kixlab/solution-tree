var cur_node = null;
var vote_text = [];

$('.childnode').on('click', function(){
  var node_pk = parseInt($(this).attr('id').replace("node_",""));
  $("#own-sum").val("");
  cur_node = node_pk;
  $('.selected-sum').html($(this).find(".node-name").html());
  $.ajax({
    url : '/ajax/get_annotations/',
    data : {
      'node_pk' : node_pk,
    },
    dataType : 'json',
    success : function(data)
    {
      vote_text = data.text;
      if(data.text.length<2)
      {
        $("#vote-button").hide();
      }
      else {
        $("#vote-button").show();
      }
      $("#div-inst-note").html(data.inst);
      $("#div-stu-note").html('');
      if(data.answer_exist)
        $("#status").html("seleting ratio : "+(data.tot_count*100/data.problem_tot_count).toFixed(1)+"%, correct ratio : " + (data.right_count*100/data.tot_count).toFixed(1)+ "%");
      else {
        $("#status").html("seleting ratio : "+(data.tot_count*100/data.problem_tot_count).toFixed(1)+"%");
      }
      if(data.student_dict.len==0)
        $("#div-stu-note").append("no note from student");
      for(var i=0;i<data.student_dict.len;i++)
      {
        $("#div-stu-note").append((i+1)+ ". " + data.student_dict[i.toString()] + '<br/>');
      }
    }
  });
});


$("#btn-enter").on('click', function(){
  if(cur_node==null || $("#own-sum").val().replace( /\s/g, "")=="")
    return;
  var text = $("#own-sum").val().trim();
  $.ajax({
    url : '/ajax/add_note/',
    data : {
      'node_pk' : cur_node,
      'text' : text
    },
    success : function()
    {
      $.toast('<h4>Success</h4> Your note is uploaded!', {type: 'success'});
      $("#node_"+cur_node).click();
      $("#own-sum").val("");
    }
  })
});

$("#vote-button").on('click', function(){
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
      'font-size' : '25px'
    }
  });
  p_explanation.html("This summarization have different explanation.<br/>Choose best summarization you think!");
  var radio_div = $("<div>", {

  });
  for(var i=0;i<vote_text.length;i++)
  {
    var temp_input = $("<input>", {
      type : 'radio',
      id : 'vote',
      name : 'vote',
      value : i
    });
    var temp_label = $("<label>", {
      for : 'vote',
    });
    temp_label.html(vote_text[i]+"<br/>");
    radio_div.append(temp_input);
    radio_div.append(temp_label);

  }
  var button = $("<input>", {
    type : 'button',
    value : 'submit',
    css : {
      'margin-top' : '10px',
    }
  });
  button.on("click", function(){
    var temp = $('input:radio[name="vote"]:checked').val();
    if(temp==undefined)
      alert('error!');
    else {
      $.ajax({
        url : '/ajax/vote_node_text',
        data : {
          'node_pk' : cur_node,
          'index' : temp
        },
        dataType : 'json',
        success : function(data)
        {
          $.toast('<h4>Success</h4> Your vote is recorded!', {type: 'success'});
        }
      });
    }
    $(this).parent().remove();
  });
  prompt_div.append(p_explanation);
  prompt_div.append(radio_div);
  prompt_div.append(button);
  $("body").append(prompt_div);
  prompt_div.css('top', (window.innerHeight - prompt_div.height())/2);
});
