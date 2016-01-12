var HighchartsContainer = React.createClass({
  componentWillUpdate() {
    this.previousData = this.props.data;
  },
  componentDidUpdate() {
    if(this.previousData === this.props.data)
      return;

    while(this.chart.series.length > 0) {
      this.chart.series[0].remove();
    }

    this.props.data.forEach((function(serie) {
      this.chart.addSeries(serie)
    }).bind(this));
  },
  componentDidMount() {
    var defaultConf = {
      chart: {
        renderTo: this.chartContainer
      },
      series: this.props.data
    };

    var chartConf = $.extend(true, defaultConf, this.props.config );
    this.chart = new Highcharts.Chart(chartConf)
  },
  render() {
    return (
      <div className="highchartsBox">
        <div ref={(ref) => this.chartContainer = ref}></div>
      </div>
    );
  }
});

export {HighchartsContainer};