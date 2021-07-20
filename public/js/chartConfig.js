let myTheme = {
  palette: {
    vbar: [
      ["#ffffff", "#40beeb", "#40beeb", "#40beeb"], // First series palette...
      ["#ffffff", "#305f74", "#305f74", "#305f74"], // Second series palette...
      ["#ffffff", "#4492a8", "#4492a8", "#4492a8"], // Third series...
      ["#ffffff", "#8e8e8e", "#8e8e8e", "#8e8e8e"],
      ["#ffffff", "#85bdcd", "#85bdcd", "#85bdcd"]
    ],
    line: [
      ['#FBFCFE', '#00BAF2', '#00BAF2', '#00a7d9'], /* light blue */
      ['#FBFCFE', '#E80C60', '#E80C60', '#d00a56'], /* light pink */
      ['#FBFCFE', '#9B26AF', '#9B26AF', '#8b229d'], /* light purple */
      ['#FBFCFE', '#E2D51A', '#E2D51A', '#E2D51A'], /* med yellow */
      ['#FBFCFE', '#FB301E', '#FB301E', '#e12b1b'], /* med red */
      ['#FBFCFE', '#00AE4D', '#00AE4D', '#00AE4D'], /* med green */
    ]
  },
  graph: {
    title: {
      fontFamily: 'Lato',
      fontSize: 14,
      padding: 15,
      fontColor: '#1E5D9E',
      adjustLayout: true
    }
  }
};

let myConfig = {
  type: 'line',
  borderTop: "2px solid #F7F9F9",
  borderRight: "2px solid #F7F9F9",
  borderLeft: "2px solid #F7F9F9",
  borderBottom: "2px solid #F7F9F9",
  legend: {
    draggable: true,
    backgroundColor: "black",
    alpha: 0.5,
    item: {
      "font-color": "#F0F3F4"
    }

  },
  backgroundColor: "rgba(0,0,0,0.2)",
  alpha: 0.3,
  borderRadius: 7,
  // border: 2,
  // borderColor: "#FFF",
  // title: {
  //   text: "Temperature Forecast",
  //   color: "#F0F3F4",
  //   'font-size': 13,
  //   fontFamily: "Arial"
  // },
  plotarea: {
    'adjust-layout': true,
    // "backgroundColor": "#3c3c44",
  },
  scaleX: {
    // Set scale label
    // label: { text: 'Days' },
    // Convert text on scale indices
    labels: forecastData.daily.map(e => {
      const date = new Date(e.dt * 1000)
      return date.getDate()
    })
  },
  scaleY: {
    // Scale label with unicode character
    // label: { text: 'Temperature (°F)' }
  },
  plot: {
    // Animation docs here:
    // https://www.zingchart.com/docs/tutorials/styling/animation#effect
    animation: {
      effect: 'ANIMATION_EXPAND_BOTTOM',
      method: 'ANIMATION_STRONG_EASE_OUT',
      sequence: 'ANIMATION_BY_NODE',
      speed: 275,
    },
    aspect: 'spline',
    marker: {
      visible: false
    },
    backgroundColor: "#000",
  },
  series: [
    {
      // plot 1 values, linear data
      values: forecastData.daily.map(e => e.temp.max),
      text: 'Max Temp'
    },
    {
      // plot 2 values, linear data
      values: forecastData.daily.map(e => e.temp.min),
      text: 'Min Temp'
    },
    {
      // plot 2 values, linear data
      values: forecastData.daily.map(e => e.temp.day),
      text: 'Day Temp'
    },
    {
      // plot 2 values, linear data
      values: forecastData.daily.map(e => e.temp.morn),
      text: 'Morning Temp'
    },
    {
      // plot 2 values, linear data
      values: forecastData.daily.map(e => e.temp.eve),
      text: 'Evening Temp'
    }
  ]
};

// zingchart.THEME = 'dark';

zingchart.render({
  id: 'myChart',
  height: "400",
  data: myConfig,
  defaults: myTheme, // Path to my_theme.txt
  backgroundColor: "transparent"
});
