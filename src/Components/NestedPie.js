import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const NestedPie = () => {
  am4core.useTheme(am4themes_animated);

  let chart = am4core.create("pieDiv", am4charts.PieChart);
  
  chart.innerRadius = am4core.percent(0);

  chart.data = [{
    "name": "Marvin Martian",
    "children" :[{
    "category": "PIL",
    "value": 500,
    "color": "#FF0000"
  }, {
    "category": "SSQ",
    "value": 500,
    "color": "#ff4488"
  }, {
    "country": "ACE",
    "value": 100,
    "color": "#FF0000"
  }, {
    "country": "PTS",
    "value": 100,
    "color": "#ffdf00"
  }, {
    "country": "ISI",
    "value": 50,
    "color": "#ffdf00"
  }, {
    "country": "DEP",
    "value": 50,
    "color": "#11cc33"
  }, {
    "country": "GAD",
    "value": 50,
    "color": "#11cc33"
  }, {
    "country": "SSRS",
    "value": 50,
    "color": "#11cc33"
  }]
  }];

  //add and configure the first series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  // pieSeries.dataFields.value = "value";
  // pieSeries.dataFields.name = "name";
  // pieSeries.dataFields.category = "category";
  // pieSeries.dataFields.color = "color";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;

  //ticks and labels for inner circle disabled
  pieSeries.labels.template.disabled = true;
  pieSeries.ticks.template.disabled = true;

  pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
  pieSeries.slices.template.states.getKey("hover").properties.scale = 0.9;

  
  //add second series - outer circle
  var pieSeries2 = chart.series.push(new am4charts.PieSeries());
  pieSeries2.dataFields.value = "value";
  pieSeries2.dataFields.name = "name";
  pieSeries.dataFields.category = "category";
  pieSeries2.dataFields.color = "color";
  pieSeries2.slices.template.stroke = am4core.color("#fff");
  pieSeries2.slices.template.strokeWidth = 2;
  pieSeries2.slices.template.strokeOpacity = 1;
  // Disable sliding out of slices for the inner circle, so the just shrink inwards a little bit.
  pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
  pieSeries2.slices.template.states.getKey("hover").properties.scale = 1.1;

  // pieSeries.colors.list = [
  //   //red
  //   am4core.color("#ff0000"),
  //   //yellow
  //   am4core.color("#ffdf00"), 
  //   //green
  //   am4core.color("#11cc33"),
  //   //orange
  //   am4core.color("#ff4488")
  // ];

  // pieSeries2.colors.list = [
  //   //red
  //   am4core.color("#ff0000"),
  //   //yellow
  //   am4core.color("#ffdf00"), 
  //   //green
  //   am4core.color("#11cc33"),
  //   //orange
  //   am4core.color("#ff4488")
  // ];

  return (
    <div id="pieDiv" style={{ width: "100%", height: "500px" }}></div>
  )
}
export default NestedPie;