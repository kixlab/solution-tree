$("#span-tag-tutorial").on("click", function(){
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
  var div_close = $("<div>", {
    css : {
      'text-align' : 'right',
    }
  });
  var span_close = $("<span>", {
    css : {
      'font-size' : '25px',
      'margin-right' : '5px'
    }
  });
  span_close.hover(function(){
    $(this).css("cursor", "pointer");
    }, function(){
    $(this).css("cursor", "");
  });
  span_close.append("X");
  span_close.on("click", function(){
    $(this).parent().parent().remove();
  });
  div_close.append(span_close);
  var video = $("<video>",{
    width : '100%',
  });
  var source = $("<source>", {
    src : '/assets/video/tag_tutorial.webm',
    type : 'video/webm'
  });
  video.append(source);
  video.get(0).play();
  prompt_div.append(div_close);
  prompt_div.append(video);
  $('body').append(prompt_div);
  prompt_div.css('top', (window.innerHeight - prompt_div.height())/2);
});
