//transform data from server(chart_config) to acceptable data for Treant.js  

for (var i = 2; i<chart_config.length;i++)
{
  for(var j = 1; j<chart_config.length;j++)
  {
    if(chart_config[i]['parent_pk'] == chart_config[j]['pk'])
    {
      chart_config[i]['parent'] = chart_config[j];
      delete chart_config[i]['parent_pk'];
      break;
    }
  }
}
