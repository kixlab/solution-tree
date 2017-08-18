function post_to_url(method) {
    method = method || "post"; // 전송 방식 기본값을 POST로
    path = window.location.href;
    path = path.replace('tag','select');
    params = {
    };

    $(".p_sum").each(function(index){
      params['sum'+index.toString()] = $(this).text();
    });

    var form = document.getElementById("formtag");
    form.setAttribute("action", path);
    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }
}
