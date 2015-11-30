var React = require('react')
//var DoughnutChart = require("react-chartjs").Doughnut;
var PieChart = require("react-chartjs").Pie;



class Charts extends React.Component {


    render() {


        var stats =
            [
                {
                    instance: 2,
                    Quota: 10
                },

                {
                    VCPU: 10,
                    Qouta: 20
                },

                {
                    RAM: 200,
                    Quota: 2000
                }

            ]

    }

    //http://www.chartjs.org/docs/#doughnut-pie-chart-example-usage
    //https://github.com/jhudson8/react-chartjs
    var MyComponent1 = React.createClass({
        render: function () {
            var chartData =
            {
                value: (2 / 10 * 100) * 360 / 100,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "VCPU"
            }
            return <PieChart data={chartData} options={chartOptions}/>
        }
    });

        var MyComponent = React.createClass({
            render: function() {

                var instdata =
                {
                    value: (10 / 20 * 100) * 360 / 100,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Instances"
                }
                return <PieChart data={instData} options={chartOptions}/>
            }
        });

    var MyComponent2 = React.createClass({
        render: function () {
            var ramdata =
            {

                value: (200 / 2000 * 100) * 360 / 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "RAM"
            }
            return <PieChart data={ramData} options={chartOptions}/>

        }
    });



}

        //return <DoughnutChart data={chartData} options={chartOptions}/>




export default Charts