var cur_node = null;

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
      $("#div-inst-note").html(data.inst);
      $("#div-stu-note").html('');
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
