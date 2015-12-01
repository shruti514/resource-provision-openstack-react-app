var React = require('react');
var PieChart = require("react-chartjs").Pie;
import CreateVMStore from '../stores/CreateVMStore';
import CreateVMActions from '../actions/CreateVMActions';
import {Link} from 'react-router';
import Login from './Login';
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem
var DoughnutChart = require("react-chartjs").Doughnut;


class Charts extends React.Component {


    constructor(props){
        super(props);
        this.state = CreateVMStore.getState();
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount(){
        CreateVMStore.listen(this.onChange);
        CreateVMActions.getUser();
        CreateVMActions.getStats();
    }

    componentWillUnmount() {
        CreateVMStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }

    showSuccessMessage(){
        if(this.state.serverCreatedSuccessMessage)
            return(
                <div className="alert alert-success">
                    <strong>Well done! </strong>{this.state.serverCreatedSuccessMessage}
                </div>
            )

    }

    showErrorMessage(){
        if(this.state.failureMessage)
            return(
                <div className="alert alert-danger">
                    <strong>Oh snap! </strong> {this.state.failureMessage}
                </div>
            )
    }

    renderDropDown(){
        return(
            <li className="dropdown dropdown-toggle">
                <DropdownButton style={{background:'#1D1F1D'}} title={this.getUsername()} id="bg-vertical-dropdown-1">
                    <MenuItem eventKey="1"><Link to={'/profile'}> <i className="fa fa-fw fa-user"></i> Profile</Link></MenuItem>
                    <li className="divider"></li>
                    <MenuItem eventKey="2"><Link to={'/login'}><i className="fa fa-fw fa-power-off"></i> Log Out</Link></MenuItem>
                </DropdownButton>
            </li>
        )


    }

    getUsername(){
        if(this.state.user){
            return this.state.user.username
        }else{
            return "";
        }
    }

    getUserDepartment(){
        if(this.state.user){
            return this.state.user.department
        }else{
            return "";
        }
    }

    getCreatedInstances(){
        if(this.state.stats){
            return this.state.stats.instances.usage
        }

        return 0;
    }

    getAvailableInstances(){
        if(this.state.stats){
            return this.state.stats.instances.quota-this.state.stats.instances.usage;
        }

        return 0;
    }


    renderInstanceUsage() {
        if(this.state.stats){
            alert('instances called')
            var usage = this.state.stats.instances.usage;
            var quota=this.state.stats.instances.quota;
            console.log('usage : '+ usage)
            console.log('quota : '+ quota)
            console.log('values : '+(usage/quota * 100) * 360 / 100)
            var chartData = {
                value: (usage/quota * 100) * 360 / 100,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Instances"
            }
            var chartOptions={}
            return (
                <PieChart data={chartData} options={chartOptions}/>
            )
        }else{
           return (
               <div></div>
           )
        }
    }

    renderVCPUUsage() {
        if(this.state.stats){
            var usage = this.state.stats.vcpus.usage;
            var quota=this.state.stats.vcpus.quota;

            var chartData = [
                {
                    value: usage,
                    color:"#323299",
                    highlight: "#6666b2",
                    label: "Instances User"
                },
                {
                    value: quota,
                    color: "#b2b2d8",
                    highlight: "#e5e5f2",
                    label: "Available Instances"
                }
            ];
            var chartOptions={}
            return (
                <PieChart data={chartData} options={chartOptions}/>
            )
        }else{
            return(<div></div>)
        }

    }

    renderRamUsage() {
        if(this.state.stats){
            var usage = this.state.stats.ram.usage;
            var quota=this.state.stats.ram.quota;
            var ramdata =
            {
                value: (usage / quota * 100) * 360 / 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "RAM"
            }
            var chartOptions={}
            return (
                <PieChart data={ramdata} options={chartOptions}/>
            )
        }else{
            return(<div></div>)
        }

    }

    render() {
        if(!this.state.user){
            return <Login/>
        }
        else{
            console.log('***Stats in Render***'+JSON.stringify(this.state.stats))
            var instanceChartData = [
                {
                    value: this.state.stats.instances.usage,
                    color:"#323299",
                    highlight: "#6666b2",
                    label: "Consumed Instances",
                    labelColor : 'white',
                    labelFontSize : '16'
                },
                {
                    value: this.state.stats.instances.quota - this.state.stats.instances.usage,
                    color: "#cccce5",
                    highlight: "#e5e5f2",
                    label: "Available Instances",
                    labelColor : 'white',
                    labelFontSize : '16'
                }
            ];

            var ramChartData = [
                {
                    value: this.state.stats.ram.usage,
                    color:"#323299",
                    highlight: "#6666b2",
                    label: "Consumed RAM",
                    labelColor : 'white',
                    labelFontSize : '16'
                },
                {
                    value: this.state.stats.ram.quota - this.state.stats.ram.usage,
                    color: "#cccce5",
                    highlight: "#e5e5f2",
                    label: "Available RAM",
                    labelColor : 'white',
                    labelFontSize : '16'
                }
            ];

            var coresChartData = [
                {
                    value: this.state.stats.cores.usage,
                    color:"#323299",
                    highlight: "#6666b2",
                    label: "Consumed VCPUs",
                    labelColor : 'white',
                    labelFontSize : '16'
                },
                {
                    value: this.state.stats.cores.quota - this.state.stats.cores.usage,
                    color: "#cccce5",
                    highlight: "#e5e5f2",
                    label: "Available VCPUs",
                    labelColor : 'white',
                    labelFontSize : '16'
                }
            ];

            var chartOptions={}

            return(<div id="wrapper">
                <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to={'/'}>Move To Cloud</Link>
                    </div>

                    <ul className="nav navbar-right top-nav">
                        {this.renderDropDown()}
                    </ul>

                    <div className="collapse navbar-collapse navbar-ex1-collapse">
                        <ul className="nav navbar-nav side-nav">
                            <li className="active">
                                <Link to={'/'}><i className="fa fa-fw fa-dashboard"></i>&nbsp;Dashboard</Link>
                            </li>

                            <li>
                                <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i className="fa fa-fw"></i> Departments <i className="fa fa-fw fa-caret-down"></i></a>
                                <ul id="demo" className="collapse">
                                    <li>
                                        <a href="development.html">Development</a>
                                    </li>
                                    <li>
                                        <a href="testing.html">Testing</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="active">
                                <Link to={'/'}><i className="fa fa-fw fa-bars"></i>&nbsp;List Instances</Link>
                            </li>
                            <li className="active">
                                <Link to={'/create'}><i className="fa fa-fw fa-desktop"></i>&nbsp;Create Instances</Link>
                            </li>
                            <li className="active">
                                <Link to={'/charts'}><i className="fa fa-fw fa-bar-chart"></i>&nbsp;Resource Consumption</Link>
                            </li>
                        </ul>
                    </div>

                </nav>

                <div id="page-wrapper">

                    <div className="container-fluid">


                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">
                                    Dashboard
                                </h1>
                            </div>
                        </div>

                        {this.showErrorMessage()}
                        {this.showSuccessMessage()}
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-bars fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">{this.getCreatedInstances()}</div>
                                                <div>Created Instances</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={'/'}>
                                        <div className="panel-footer">
                                            <span className="pull-left">List Instances</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="panel panel-yellow">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-desktop fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">{this.getAvailableInstances()}</div>
                                                <div>Available Instances</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel-footer">
                                        <span className="pull-left">Create Instance</span>
                                        <Link to={'/create'}><span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span></Link>
                                        <div className="clearfix"></div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="panel panel-red">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-bar-chart fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">Your</div>
                                                <div>Resource Consumption</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel-footer">
                                        <span className="pull-left">Resource Consumption</span>
                                        <Link to={'/charts'}><span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span></Link>
                                        <div className="clearfix"></div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-12">

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title"><i className="fa fa-money fa-fw"></i> Charts</h3>
                                    </div>
                                    <div className="panel-body">
                                        <table>
                                            <tr>
                                                <td>
                                                    Instances
                                                </td>
                                                <td>
                                                    RAM
                                                </td>
                                                <td>
                                                    Cores
                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <PieChart data={instanceChartData} options={chartOptions}/>
                                                </td>
                                                <td>
                                                    <PieChart data={ramChartData} options={chartOptions}/>
                                                </td>
                                                <td>
                                                    <PieChart data={coresChartData} options={chartOptions}/>
                                                </td>

                                            </tr>

                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            )
        }
    }
}

export default Charts

