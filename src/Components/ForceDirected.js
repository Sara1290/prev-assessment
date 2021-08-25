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
  "name": "000001",
  "color": "#ff0000",
  "children": [{
    "name": "PIL", "value": 800,
    "color": "#FF0000"
  }, {
    "name": "ACE", "value": 60,
    "color": "#11CC33"
  }, {
    "name": "SSQ", "value": 30,
    "color": "#11CC33"
  }, {
    "name": "PTS", "value": 500,
    "color": "#FF0000"
  }, {
    "name": "ISI", "value": 500,
    "color": "#FFA500"
  }, {
    "name": "DEP", "value": 200,
    "color": "#FFDF00"
  }, {
    "name": "GAD", "value": 600,
    "color": "#FFA500"
  }, {
    "name": "SSRS", "value": 0,
    "color": "#11CC33"
  }]
}, {
  "name": "000002",
  "color": "#ff0000",
  "children": [{
    "name": "PIL", "value": 700, 
    "color": "#ff0000",
  }, {
    "name": "ACE", "value": 600, 
    "color": "#ff0000",
  }, {
    "name": "SSQ", "value": 30,
    "color": "#11cc33",
  }, {
    "name": "PTS", "value": 30,
    "color": "#11cc33",
  }, {
    "name": "ISI", "value": 30,
    "color": "#FFDF00",
  }, {
    "name": "DEP", "value": 300,
    "color": "#ffa500",
  }, {
    "name": "GAD", "value": 30,
    "color": "#11cc33",
  }, {
    "name": "SSRS", "value": 1,
    "color": "#11cc33",
  }]
}, {
  "name": "000003",
  "color": "#FFA500",
  "children": [{
    "name": "PIL", "value": 100,
    "color": "#ffDF00",
  }, {
    "name": "ACE", "value": 800,
    "color": "#ff0000",
  }, {
    "name": "SSQ", "value": 30,
    "color": "#1C3",
  }, {
    "name": "PTS", "value": 30,
    "color": "#1C3",
  }, {
    "name": "ISI", "value": 30,
    "color": "#1C3",
  }, {
    "name": "DEP", "value": 500,
    "color": "#ffA500",
  }, {
    "name": "GAD", "value": 30,
    "color": "#1C3",
  }, {
    "name": "SSRS", "value": 1,
    "color": "#1C3",
  }]
}, {
  "name": "000004",
  "color": "#FFA500",
  "children": [{
    "name": "PIL", "value": 100,
    "color": "#ffDF00",
  }, {
    "name": "ACE", "value": 100,
    "color": "#1c3",
  }, {
    "name": "SSQ", "value": 30,
    "color": "#1C3",
  }, {
    "name": "PTS", "value": 30,
    "color": "#1C3",
  }, {
    "name": "ISI", "value": 30,
    "color": "#1C3",
  }, {
    "name": "DEP", "value": 500,
    "color": "#ffA500",
  }, {
    "name": "GAD", "value": 700,
    "color": "#f00",
  }, {
    "name": "SSRS", "value": 1,
    "color": "#1C3",
  }]
}, {
  "name": "000005",
  "color": "#ffdf00",
  "children": [{
    "name": "PIL", "value": 200,
    "color": "#11CC33",
  }, {
    "name": "ACE", "value": 60,
    "color": "#11CC33",
  }, {
    "name": "SSQ", "value": 100,
    "color": "#1C3",
  }, {
    "name": "PTS", "value": 50,
    "color": "#11CC33",
  }, {
    "name": "ISI", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "DEP", "value": 800,
    "color": "#FFA500",
  }, {
    "name": "GAD", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "SSRS", "value": 1,
    "color": "#11CC33",
  }]
}, {
  "name": "000006",
  "color": "#ffdf00",
  "children": [{
    "name": "PIL", "value": 200,
    "color": "#11CC33",
  }, {
    "name": "ACE", "value": 60,
    "color": "#11CC33",
  }, {
    "name": "SSQ", "value": 700,
    "color": "#FFA500",
  }, {
    "name": "PTS", "value": 50,
    "color": "#11CC33",
  }, {
    "name": "ISI", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "DEP", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "GAD", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "SSRS", "value": 1,
    "color": "#11CC33",
  }]
}, {
  "name": "000007",
  "color": "#11cc33",
  "children": [{
    "name": "PIL", "value": 200,
    "color": "#11CC33",
  }, {
    "name": "ACE", "value": 60,
    "color": "#11CC33",
  }, {
    "name": "SSQ", "value": 30,
    "color": "#FFDF00",
  }, {
    "name": "PTS", "value": 50,
    "color": "#11CC33",
  }, {
    "name": "ISI", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "DEP", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "GAD", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "SSRS", "value": 1,
    "color": "#11CC33",
  }]
}, {
  "name": "000008",
  "color": "#11cc33",
  "children": [{
    "name": "PIL", "value": 200,
    "color": "#11CC33",
  }, {
    "name": "ACE", "value": 60,
    "color": "#11CC33",
  }, {
    "name": "SSQ", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "PTS", "value": 50,
    "color": "#11CC33",
  }, {
    "name": "ISI", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "DEP", "value": 30,
    "color": "#11CC33",
  }, {
    "name": "GAD", "value": 30,
    "color": "#FFDF00",
  }, {
    "name": "SSRS", "value": 1,
    "color": "#11CC33",
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