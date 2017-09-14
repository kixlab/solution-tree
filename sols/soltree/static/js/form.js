var correct = null;

function check_answer(){
  var url = window.location.href;
  var re = new RegExp('http://127.0.0.1:8000/problem([0-9]+).*')
  var myarray = re.exec(url);
  var problem_pk = myarray[1];
  $.ajax({
    url : '/ajax/check_answer/',
    data : {
      'problem_pk' : problem_pk
    },
    dataType : 'json',
    success : function(data)
    {
      if(data.exist == '1')
      {
        $('#div-body').addClass('blur');
        var prompt_div = $("<div>", {
          css : {
            position : 'absolute',
            left : 0.05*window.innerWidth,
            width : 0.9 * window.innerWidth,
            padding : '10px',
            backgroundColor : 'white',
            border : '1px solid black',
            'z-index' : 10,
          },
          class : 'prompt'
        });
        var p_explanation = $("<p>", {
          css : {
            'font-size' : '30px'
          }
        });
        var answer_img = $("<img>", {
          src : data.img_url
        });
        var correct_btn = $("<input>", {
          type : 'button',
          value : "I'm correct!",
          css : {
            padding : '5px',
            margin : '5px'
          }
        });
        var incorrect_btn = $("<input>", {
          type : 'button',
          value : "I'm wrong :(",
          css : {
            padding : '5px',
            margin : '5px'
          }
        });
        correct_btn.on('click', function(){
          correct = true;
          $("#form-submit").click();
        });
        incorrect_btn.on('click', function(){
          correct = false;
          $("#form-submit").click();
        });
        var answer_text = $("<p>")
        answer_text.html(data.text);
        p_explanation.html("The answer is");
        prompt_div.append(p_explanation);
        prompt_div.append(answer_img);
        prompt_div.append(answer_text);
        prompt_div.append(correct_btn);
        prompt_div.append(incorrect_btn);
        $("body").append(prompt_div);
        prompt_div.css('top', (window.innerHeight - prompt_div.height())/2);
      }
      else {
        $("#form-submit").click();
      }
    }
  })
}





function post_to_url(method) {
    method = method || "post"; // 전송 방식 기본값을 POST로
    path = window.location.href;
    path = path.replace('tag','select');
    params = {
      tag_img : tag_img,
      correct : correct,
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
