var React = require('react');
var {Link} = require('react-router');


import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import Login from './Login';


class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state=ProfileStore.getState();
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount(){
        ProfileStore.listen(this.onChange);
        ProfileActions.getProfile();
    }

    componentWillUnmount() {
        ProfileStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }


    render() {
       if(this.state.errorStatusCode == 401){
        return (

            <Login/>
        )
       }else {
           return (
               <div id="wrapper">

                   <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">

                       <div className="navbar-header">
                           <button type="button" className="navbar-toggle" data-toggle="collapse"
                                   data-target=".navbar-ex1-collapse">
                               <span className="sr-only">Toggle navigation</span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                           </button>
                           <a className="navbar-brand" href="home.html">Move To Cloud</a>
                       </div>

                       <ul className="nav navbar-right top-nav">
                           <li className="dropdown">
                               <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i
                                   className="fa fa-user"></i> {this.state.firstName + " " + this.state.lastName}<b
                                   className="caret"></b></a>
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
                                   <Link to={'/'}><i className="fa fa-fw fa-dashboard"></i>&nbsp;Dashboard</Link>
                               </li>

                               <li>
                                   <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i
                                       className="fa fa-fw"></i> Departments <i className="fa fa-fw fa-caret-down"></i></a>
                                   <ul id="demo" className="collapse">
                                       <li>
                                           <Link to={'/development'}>Development</Link>
                                       </li>
                                       <li>
                                           <Link to={'/testing'}>Testing</Link>
                                       </li>
                                   </ul>
                               </li>
                               <li className="active">
                                   <a href="instances.html"><i className="fa fa-fw fa-bars"></i>&nbsp;List Instances</a>
                               </li>
                               <li className="active">
                                   <a href="create_instance.html"><i className="fa fa-fw fa-desktop"></i>&nbsp;Create
                                       Instances</a>
                               </li>
                               <li className="active">
                                   <a href="resource_consumption.html"><i className="fa fa-fw fa-bar-chart"></i>&nbsp;
                                       Resource Consumption</a>
                               </li>
                           </ul>
                       </div>

                   </nav>

                   <div id="page-wrapper">

                       <div className="container-fluid">


                           <div className="row">
                               <div className="col-lg-12">
                                   <h1 className="page-header">
                                       Profile
                                   </h1>
                               </div>
                           </div>


                           <div className="row">

                               <div className="col-lg-12">

                                   <div className="panel panel-default">
                                       <div className="panel-heading">
                                           <h3 className="panel-title"><i className="fa fa-money fa-fw"></i> User
                                               Profile</h3>
                                       </div>
                                       <div className="panel-body">
                                           <div className="row">
                                               <div className="col-md-3 col-md-offset-3 text-left"><strong>Name</strong>
                                               </div>
                                               <div
                                                   className="col-md-3 text-left">{this.state.firstName + " " + this.state.lastName}</div>
                                               <div className="col-md-3"></div>
                                           </div>
                                           <div className="row">
                                               <div className="col-md-3 col-md-offset-3 text-left">
                                                   <strong>Department</strong></div>
                                               <div className="col-md-3 text-left">{this.state.departmentName}</div>
                                               <div className="col-md-3"></div>
                                           </div>
                                           <div className="row">
                                               <div className="col-md-3 col-md-offset-3 text-left">
                                                   <strong>Designation</strong></div>
                                               <div className="col-md-3 text-left">{this.state.designation}</div>
                                               <div className="col-md-3"></div>
                                           </div>
                                           <div className="row">
                                               <div className="col-md-3 col-md-offset-3 text-left"><strong>E-mail
                                                   ID</strong></div>
                                               <div className="col-md-3 text-left">{this.state.emailId}</div>
                                               <div className="col-md-3"></div>
                                           </div>
                                           <div className="row">
                                               <div className="col-md-3 col-md-offset-3 text-left"><strong>Office
                                                   Contact Number</strong></div>
                                               <div className="col-md-3 text-left">{this.state.contactNumber}</div>
                                               <div className="col-md-3"></div>
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
}

export default Profile;