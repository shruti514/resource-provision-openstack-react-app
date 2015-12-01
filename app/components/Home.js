
var React = require('react')
var {Link} = require('react-router');
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = HomeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        HomeStore.listen(this.onChange);
        HomeActions.getVMCount();
        HomeActions.getVMList();
       // HomeActions.getImageByID();
        HomeActions.getStats();
    }

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }

    renderServerLists(){


        return this.state.serverList.map(function(server,index){
            return(
                <tr>

                    <td>{server.name}</td>
                    <td>{server.id}</td>
                    <td>{server.image}</td>
                    <td>{server.flavor}</td>
                    <td>{server.status}</td>
                </tr>

            );
        });
    }

    render() {
        var cnt = this.state.count;
        var serverList = this.renderServerLists();
        var stats = this.state.stats;
        console.log('Stats : ', stats);
        //var serverList = [];


        return (

            <div id="wrapper">


                <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="home.html">Move To Cloud</a>
                    </div>

                    <ul className="nav navbar-right top-nav">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> John Smith <b className="caret"></b></a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={'/profile'}><i className="fa fa-fw fa-user"></i> Profile</Link>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <Link to={'/login'}><i className="fa fa-fw fa-power-off"></i> Log Out</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="collapse navbar-collapse navbar-ex1-collapse">
                        <ul className="nav navbar-nav side-nav">
                            <li className="active">
                                <a href="home.html"><i className="fa fa-fw fa-dashboard"></i>&nbsp;Dashboard</a>
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
                                <a href="instances.html"><i className="fa fa-fw fa-bars"></i>&nbsp;List Instances</a>
                            </li>
                            <li className="active">
                                <Link to={'/create'}><i className="fa fa-fw fa-desktop"></i>&nbsp;Create Instances</Link>
                            </li>
                            <li className="active">
                                <a href="resource_consumption.html"><i className="fa fa-fw fa-bar-chart"></i>&nbsp;Resource Consumption</a>
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


                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-bars fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">{cnt}</div>
                                                <div>Created Instances</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#">
                                        <div className="panel-footer">
                                            <span className="pull-left">List Instances</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
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
                                                <div className="huge">4</div>
                                                <div>Available Instances</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#">
                                        <div className="panel-footer">
                                            <span className="pull-left">Create Instance</span>
                                            <a href="create_instance.html"><span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span></a>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
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
                                                <div className="huge">150</div>
                                                <div>Resource Consumption</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#">
                                        <div className="panel-footer">
                                            <span className="pull-left">Resource Consumption</span>
                                            <a href="resource_consumption.html"><span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span></a>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className="row">

                            <div className="col-lg-12">

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title"><i className="fa fa-money fa-fw"></i> Instances</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>ID</th>
                                                    <th>Image ID </th>
                                                    <th>Flavor ID</th>
                                                    <th>Status</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {serverList}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="text-right">
                                            <a href="#">View All Transactions <i className="fa fa-arrow-circle-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


            </div>

        );
    }
}

export default Home;