System.register("app/scripts/highcharts.js", [], function (_export) {
  "use strict";

  var HighchartsContainer;
  return {
    setters: [],
    execute: function () {
      HighchartsContainer = React.createClass({
        displayName: "HighchartsContainer",

        componentWillUpdate: function componentWillUpdate() {
          this.previousData = this.props.data;
        },
        componentDidUpdate: function componentDidUpdate() {
          if (this.previousData === this.props.data) return;

          while (this.chart.series.length > 0) {
            this.chart.series[0].remove();
          }

          this.props.data.forEach((function (serie) {
            this.chart.addSeries(serie);
          }).bind(this));
        },
        componentDidMount: function componentDidMount() {
          var defaultConf = {
            chart: {
              renderTo: this.chartContainer
            },
            series: this.props.data
          };

          var chartConf = $.extend(true, defaultConf, this.props.config);
          this.chart = new Highcharts.Chart(chartConf);
        },
        render: function render() {
          var _this = this;

          return React.createElement(
            "div",
            { className: "highchartsBox" },
            React.createElement("div", { ref: function (ref) {
                return _this.chartContainer = ref;
              } })
          );
        }
      });

      _export("HighchartsContainer", HighchartsContainer);
    }
  };
});

System.register('app/main.js', ['app/scripts/highcharts.js'], function (_export) {
  'use strict';

  var HighchartsContainer, Container;
  return {
    setters: [function (_appScriptsHighchartsJs) {
      HighchartsContainer = _appScriptsHighchartsJs.HighchartsContainer;
    }],
    execute: function () {
      Container = React.createClass({
        displayName: 'Container',

        config: {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Fruit Consumption'
          },
          xAxis: {
            categories: ['Day 1', 'Day 2', 'Day 3']
          },
          yAxis: {
            title: {
              text: 'Fruit eaten'
            }
          }
        },
        getInitialState: function getInitialState() {
          return {
            dataSet: [{ name: "Banana", data: [1, 2, 3] }, { name: "Orange", data: [10, 5, 20] }, { name: "Apple", data: [10, 5, 20] }]
            // state: true
          };
        },
        componentDidMount: function componentDidMount() {
          setTimeout((function () {
            this.setState({
              state: false
            });
          }).bind(this), 5000);

          setTimeout((function () {
            this.setState({
              dataSet: [{ name: "Blueberry", data: [1, 50] }]
            });
          }).bind(this), 3000);
        },
        render: function render() {
          return React.createElement(
            'div',
            { className: 'containerBox' },
            React.createElement(HighchartsContainer, { config: this.config, data: this.state.dataSet })
          );
        }
      });

      ReactDOM.render(React.createElement(Container, null), document.getElementById('container'));
    }
  };
});
