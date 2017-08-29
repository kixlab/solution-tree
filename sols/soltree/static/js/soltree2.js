function get_div_by_pk(pk)
{
  var node_id = 'node_'+pk.toString();
  return $("#"+node_id);
}

function get_pk_from_div(div)
{
  return parseInt(div.attr("id").replace("node_",""));
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

function give_token(cur_div, propagate)
{
  if(cur_div==null)
    return;
  if(cur_div.attr('token')=='yes')
    return;
  else {
    var cur_pk = get_pk_from_div(cur_div);
    cur_div.attr('token', 'yes');
    if(propagate == 0)
    {
      give_token(get_parent_div_by_pk(cur_pk),1);
      var child_divs = get_child_divs_by_pk(cur_pk);
      for(var i=0;i<child_divs.length;i++)
      {
        give_token(child_divs[i], 2);
      }
    }
    else if(propagate ==1)
    {
      give_token(get_parent_div_by_pk(cur_pk),1);
    }
    else if(propagate ==2)
    {
      var child_divs = get_child_divs_by_pk(cur_pk);
      for(var i=0;i<child_divs.length;i++)
      {
        give_token(child_divs[i], 2);
      }
    }
  }
}

var not_from_close = true;
