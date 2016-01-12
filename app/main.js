import {HighchartsContainer} from "app/scripts/highcharts.js";

var Container = React.createClass({
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
  getInitialState() {
    return {
      dataSet: [{name:"Banana", data: [1,2,3]},{name:"Orange", data: [10,5,20]},{name:"Apple", data: [10,5,20]}]
      // state: true
    }
  },
  componentDidMount() {
    setTimeout((function() {
      this.setState({
        state: false
      })
    }).bind(this), 5000);

    setTimeout((function() {
      this.setState({
        dataSet: [{name:"Blueberry", data: [1,50]}]
      })
    }).bind(this), 3000)
  },
  render() {
    return (
      <div className="containerBox">
        <HighchartsContainer config={this.config} data={this.state.dataSet}/>
      </div>
    );
  }
});

ReactDOM.render(
  <Container/>,
  document.getElementById('container')
);