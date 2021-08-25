import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const HorizontalBar = () => {
  //animate 
  am4core.useTheme(am4themes_animated);
  
  //element to push our chart into
  let chart = am4core.create("BarDiv", am4charts.XYChart);

  //chart data
  chart.data = [{
    "client": "0001",
    "PIL": 24,
    "ACE": 1,
    "AA": 1,
    "SSQ": 1,
    "PTS": 1,
    "ISI": 1,
    "DEP": 1,
    "GAD": 1,
    "SSRS": 1,
    "Overall": 1,
  }, {
    "client": "0002",
    "PIL": 24,
    "ACE": 1,
    "AA": 1,
    "SSQ": 1,
    "PTS": 1,
    "ISI": 1,
    "DEP": 1,
    "GAD": 1,
    "SSRS": 1,
    "Overall": 1,
  }, {
    "client": "0003",
    "PIL": 24,
    "ACE": 1,
    "AA": 1,
    "SSQ": 1,
    "PTS": 1,
    "ISI": 1,
    "DEP": 1,
    "GAD": 1,
    "SSRS": 1,
    "Overall": 1,
  }, {
    "client": "0004",
    "PIL": 24,
    "ACE": 1,
    "AA": 1,
    "SSQ": 1,
    "PTS": 1,
    "ISI": 1,
    "DEP": 1,
    "GAD": 1,
    "SSRS": 1,
    "Overall": 1,
  }, {
    "client": "0005",
    "PIL": 24,
    "ACE": 1,
    "AA": 1,
    "SSQ": 1,
    "PTS": 1,
    "ISI": 1,
    "DEP": 1,
    "GAD": 1,
    "SSRS": 1,
    "Overall": 1,
  }, {
    "client": "0006",
    "PIL": 24,
    "ACE": 1,
    "AA": 1,
    "SSQ": 1,
    "PTS": 1,
    "ISI": 1,
    "DEP": 1,
    "GAD": 1,
    "SSRS": 1,
    "Overall": 1,
  }, {
    "client": "0007",
    "PIL": 50,
    "ACE": 10,
    "AA": 15,
    "SSQ": 10,
    "PTS": 10,
    "ISI": 10,
    "DEP": 10,
    "GAD": 10,
    "SSRS": 10,
    "Overall": 1,
  }];

  chart.legend = new am4charts.Legend();
  chart.legend.position = "right";

  let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "client";
    categoryAxis.renderer.grid.template.opacity = 0;

  let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    // valueAxis.renderer.minGridDistance = 40;

  function createSeries(field, name) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = field;
    series.dataFields.categoryY = "client";
    series.stacked = true;
    series.name = name;
    
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.locationX = 0.5;
    labelBullet.label.text = "{valueY}";
    labelBullet.label.fill = am4core.color("#fff");
  }

  createSeries("PIL", "PIL");
  createSeries("ACE", "ACE");
  createSeries("AA", "AA");
  createSeries("SSQ", "SSQ");
  createSeries("PTS", "PTS");
  createSeries("ISI", "ISI");
  createSeries("DEP", "DEP");
  createSeries("GAD", "GAD");
  createSeries("SSRS", "SSRS");
  createSeries("Overall", "Overall");

  return (
    <div id="BarDiv" style={{ width: "100%", height: "500px" }}></div>
  )
}
export default HorizontalBar;