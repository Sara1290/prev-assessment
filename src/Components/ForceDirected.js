import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 


const ForceDirected = () => {
  am4core.useTheme(am4themes_animated);
  // Create chart
let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);

// Create series
let series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

// Set data
series.data = [{
  "name": "Marvin Martian",
  "children": [{
    "name": "PIL", "value": 100
  }, {
    "name": "ACE", "value": 60
  }, {
    "name": "SSQ", "value": 30
  }, {
    "name": "PTS", "value": 30
  }, {
    "name": "ISI", "value": 30
  }, {
    "name": "DEP", "value": 30
  }, {
    "name": "GAD", "value": 30
  }, {
    "name": "SSRS", "value": 1
  }]
}, {
  "name": "Yosemite Sam",
  "children": [{
    "name": "PIL", "value": 100
  }, {
    "name": "ACE", "value": 60
  }, {
    "name": "SSQ", "value": 30
  }, {
    "name": "PTS", "value": 30
  }, {
    "name": "ISI", "value": 30
  }, {
    "name": "DEP", "value": 30
  }, {
    "name": "GAD", "value": 30
  }, {
    "name": "SSRS", "value": 1
  }]
}, {
  "name": "Elmer Fudd",
  "children": [{
    "name": "PIL", "value": 100
  }, {
    "name": "ACE", "value": 60
  }, {
    "name": "SSQ", "value": 30
  }, {
    "name": "PTS", "value": 30
  }, {
    "name": "ISI", "value": 30
  }, {
    "name": "DEP", "value": 30
  }, {
    "name": "GAD", "value": 30
  }, {
    "name": "SSRS", "value": 1
  }]
}, {
  "name": "Bugs Bunny",
  "children": [{
    "name": "PIL", "value": 100
  }, {
    "name": "ACE", "value": 60
  }, {
    "name": "SSQ", "value": 30
  }, {
    "name": "PTS", "value": 30
  }, {
    "name": "ISI", "value": 30
  }, {
    "name": "DEP", "value": 30
  }, {
    "name": "GAD", "value": 30
  }, {
    "name": "SSRS", "value": 1
  }]
}, {
  "name": "Daffy Duck",
  "children": [{
    "name": "PIL", "value": 100
  }, {
    "name": "ACE", "value": 60
  }, {
    "name": "SSQ", "value": 30
  }, {
    "name": "PTS", "value": 30
  }, {
    "name": "ISI", "value": 30
  }, {
    "name": "DEP", "value": 30
  }, {
    "name": "GAD", "value": 30
  }, {
    "name": "SSRS", "value": 1
  }]
}];

// Set up data fields
series.dataFields.value = "value";
series.dataFields.name = "name";
series.dataFields.children = "children";
series.dataFields.color = "color";

series.colors.list = [
  //red
  am4core.color("#ff0000"),
  //yellow
  am4core.color("#ffdf00"), 
  //green
  am4core.color("#11cc33"),
  //orange
  am4core.color("#ff4488")
];

// Add labels
series.nodes.template.label.text = "{name}";
series.fontSize = 10;
series.minRadius = 15;
series.maxRadius = 40;
chart.legend = new am4charts.Legend();


 return (
  <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
 )

}
export default ForceDirected;