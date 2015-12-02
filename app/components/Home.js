
var React = require('react')
var {Link} = require('react-router');
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem


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
        HomeActions.getUser();
    }

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }

    getUsername(){
        if(this.state.user){
            return this.state.user.username
        }else{
            return "";
        }
    }


    getCreatedInstances(){
        if(this.state.stats && this.state.stats.instances){
            return this.state.stats.instances.usage
        }

        return 0;
    }

    getAvailableInstances(){
        if(this.state.stats && this.state.stats.instances){
            console.log(JSON.stringify(this.state.stats))
            return this.state.stats.instances.quota - this.state.stats.instances.usage;
        }

        return 0;
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

        var serverList = this.renderServerLists();
        // var stats = this.state.stats;

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
                        <li className="dropdown dropdown-toggle">
                            <DropdownButton style={{background:'#1D1F1D'}} title={this.getUsername()} id="bg-vertical-dropdown-1">
                                <MenuItem eventKey="1"><Link to={'/profile'}> <i className="fa fa-fw fa-user"></i> Profile</Link></MenuItem>
                                <li className="divider"></li>
                                <MenuItem eventKey="2"><Link to={'/login'}><i className="fa fa-fw fa-power-off"></i> Log Out</Link></MenuItem>
                            </DropdownButton>
                        </li>
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
                                        <a href="http://localhost:3000">Development</a>
                                    </li>
                                    <li>
                                        <a href="http://localhost:3000">Testing</a>
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
                                                <div className="huge">150</div>
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