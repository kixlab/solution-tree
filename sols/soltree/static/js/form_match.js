function post_submit(method){
  method = method ||'post';
  path = '/problem/submit/';
  var form = document.getElementById('formtag');
  form.setAttribute('action', path);
  params = {
  };

  $(".p_sum").each(function(index){
    params['sum'+index.toString()] = $(this).text();
  });
  for(var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);

      form.appendChild(hiddenField);
  }
};
