function get_div_by_pk(pk)
{
  var node_id = 'node_'+pk.toString();
  return $("#"+node_id);
}

function get_parent_pk(pk)
{
  for(var i=1;i<chart_config.length;i++)
  {
    if(chart_config[i]['children']==undefined)
      continue;
    for(var j=0;j<chart_config[i]['children'].length;j++)
    {
      if(chart_config[i]['children'][j]['pk']==pk)
      {
        return chart_config[i]['pk'];
      }
    }
  }
}

function get_parent_div_by_pk(pk)
{
  parent_pk = get_parent_pk(pk);
  if(parent_pk!=undefined)
    return get_div_by_pk(parent_pk);
}

function get_brother_divs_by_pk(pk)
{
  var parent_pk = get_parent_pk(pk);
  var child_divs = get_child_divs_by_pk(parent_pk);
  var cur_div = get_div_by_pk(pk);
  var index;
  for(var i=0;i<child_divs.length;i++)
  {
    if(cur_div[0]==child_divs[i][0])
    {
      index = i;
      break;
    }
  }
  child_divs.splice(index, 1);
  return child_divs;
}

function get_child_divs_by_pk(pk)
{
  child_pks = [];
  for(var i=1;i<chart_config.length;i++)
  {
    if(chart_config[i]['pk']==pk)
    {
      if(chart_config[i]['children']==undefined)
        continue;
      for(var j=0;j<chart_config[i]['children'].length;j++)
      {
        child_pks.push(chart_config[i]['children'][j]['pk']);
      }
      continue;
    }
  }
  child_divs = [];
  for(var i=0;i<child_pks.length;i++)
  {
    child_divs.push(get_div_by_pk(child_pks[i]));
  }
  return child_divs;
}

var not_from_close = true;

$(".nodeExample1").click(function(){
  var cur_pk = parseInt(this.id.replace("node_",""));
  var parent_div = get_parent_div_by_pk(cur_pk);
  if(this.className.includes("selectable"))
  {
    $(".selectable").removeClass("selectable");
    this.className += " selected last";
    if(parent_div!=undefined)
      parent_div.removeClass("last");
    else {
      $(this).find("a")[0].click();
    }
    var child_divs = get_child_divs_by_pk(cur_pk);
    for(var i=0;i<child_divs.length;i++)
    {
      child_divs[i].addClass("selectable");
    }
    //child div에 selectable 추가 같은 depth에 있는 애들도 selectable없애기
  }
  else if(this.className.includes("selected"))
  {
    if(this.className.includes('root'))
      return;
    //마지막일경우 selected 없애기, 부모에 last추가하기, 자식들 unselectable로 바꾸기
    if(this.className.includes("last"))
    {
      if(parent_div!=undefined)
        parent_div.addClass("last");
      if(not_from_close)
        $(this).find("a")[0].click();
      not_from_close = true;
      this.className = this.className.replace("selected last", "selectable");
      var brother_divs = get_brother_divs_by_pk(cur_pk);
      for(var i=0;i<brother_divs.length;i++)
      {
        brother_divs[i].addClass('selectable');
      }
      var child_divs = get_child_divs_by_pk(cur_pk);
      for(var i=0;i<child_divs.length;i++)
      {
        child_divs[i].removeClass("selectable");
      }
    }
  }
})

$(document).ready(function(){
   $(".node a").click(function(e) {
        e.stopPropagation();
   });
});
