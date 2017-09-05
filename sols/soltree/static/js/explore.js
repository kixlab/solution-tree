$('.childnode').on('click', function(){
  var node_pk = parseInt($(this).attr('id').replace("node_",""));
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
