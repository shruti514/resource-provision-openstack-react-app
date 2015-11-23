var React = require('react')
var DoughnutChart = require("react-chartjs").Doughnut;

class Charts extends React.Component{


    render() {

        //http://www.chartjs.org/docs/#doughnut-pie-chart-example-usage
        //https://github.com/jhudson8/react-chartjs

        var chartData = [
            {
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ];

        var chartOptions={}

        return <DoughnutChart data={chartData} options={chartOptions}/>
    }
}

export default Charts