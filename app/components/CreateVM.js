var React = require('react');

import CreateVMStore from '../stores/CreateVMStore';
import CreateVMActions from '../actions/CreateVMActions';
import {Link} from 'react-router';
import Login from './Login';
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem


class CreateVM extends React.Component {

    constructor(props){
        super(props);
        this.state = CreateVMStore.getState();
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount(){
        CreateVMStore.listen(this.onChange);
        CreateVMActions.getUser();
        CreateVMActions.getFlavors();
        CreateVMActions.getImages();
        CreateVMActions.getStats();
    }

    componentWillUnmount() {
        CreateVMStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        //alert('handle submit called');
        var image = this.state.image;
        var flavor = this.state.flavor;
        if (!image) {
            if(this.state.imageList.length>0){
                image = this.state.imageList[0].id;
            }else{
                CreateVMActions.invalidImage();
            }
        }
        if (!flavor) {
            if(this.state.flavorList.length>0){
                flavor = this.state.flavorList[0].id;
            }else{
                CreateVMActions.invalidFlavor();
            }
        }
        if (image&&flavor) {
            CreateVMActions.createVM(image,flavor,new Date(this.state.year,this.state.month,this.state.day),this.state.app);
        }
    }


    renderImageLists(){
        return this.state.imageList.map((image,index)=>{
                return(
                     <option value={image.id}>{image.name}</option>
                )
            });
    }

    renderFlavoursList(){
        return  this.state.flavorList.map((flavor,index)=>{
                return(
                        <option value={flavor.id}>{flavor.name}</option>
                )
            })

    }

    renderApps(){
        return this.state.apps.map((app,index)=>{
            return (
                <option value={index}>{app}</option>
            )
        })
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
            console.log(JSON.stringify(this.state.stats))
            return this.state.stats.instances.quota - this.state.stats.instances.usage;
        }

        return 0;
    }

    renderImagesInput(){
        if(this.state.showImages)
            var images = this.renderImageLists();
        return(
            <tr>
                <td className="td-bottom-space"> <label>Select Image</label></td>
                <td className="td-bottom-space">
                    <select name="Images" onChange={CreateVMActions.updateImage}>
                        {images}
                    </select>
                </td>
            </tr>
        )
    }

    renderAppEnvMessage(){
        if(this.state.appEnvMessage)
        return(
            <tr>
                <td className="td-bottom-space"> <label>Env Details</label> </td>
                <td className="td-bottom-space">
                    <div class="alert alert-info">
                        <strong>Runtime Env Details : </strong> {this.state.appEnvMessage}
                    </div>
                </td>
            </tr>
        )
    }

    render() {
        if(!this.state.user){
            return <Login/>
        }
        var flavors = this.renderFlavoursList();
        var apps = this.renderApps();
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
                                        <h3 className="panel-title"><i className="fa fa-money fa-fw"></i> Create Instance</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="table-responsive">
                                            <table>
                                                <tr>
                                                    <td className="td-bottom-space"><label>UserName</label></td>
                                                    <td className="td-bottom-space"><input type="text" value={this.getUsername()} maxlength="10"/></td>
                                                </tr>

                                                <tr>
                                                    <td  className="td-bottom-space"><label>Department</label></td>
                                                    <td  className="td-bottom-space"> <input type="text" value={this.getUserDepartment()}/></td>
                                                </tr>

                                                <tr>
                                                    <td  className="td-bottom-space"><label>Server Name</label></td>
                                                    <td  className="td-bottom-space"> <input type="text" onChange={CreateVMActions.update}/></td>
                                                </tr>

                                                <tr>
                                                    <td className="td-bottom-space"> <label>Select Flavor</label> </td>
                                                    <td className="td-bottom-space">
                                                        <select name="Flavors" onChange={CreateVMActions.updateFlavor}>
                                                            {flavors}
                                                        </select>
                                                    </td>
                                                </tr>

                                                <tr>

                                                    <td className="td-bottom-space"> <label>Runtime Environment For Application</label> </td>
                                                    <td className="td-bottom-space">
                                                        <select name="app" onChange={CreateVMActions.updateApp}>
                                                            {apps}
                                                    </select></td>
                                                </tr>

                                                {this.renderImagesInput()}

                                                {this.renderAppEnvMessage()}

                                                <tr>
                                                    <td className="td-bottom-space"> <label>Termination Date </label> </td>
                                                    <td className="td-bottom-space">
                                                        <select name="month" onChange={CreateVMActions.updateTerminationMonth}>
                                                        <option>- Month -</option>
                                                        <option value="January">January</option>
                                                        <option value="Febuary">Febuary</option>
                                                        <option value="March">March</option>
                                                        <option value="April">April</option>
                                                        <option value="May">May</option>
                                                        <option value="June">June</option>
                                                        <option value="July">July</option>
                                                        <option value="August">August</option>
                                                        <option value="September">September</option>
                                                        <option value="October">October</option>
                                                        <option value="November">November</option>
                                                        <option value="December">December</option>

                                                    </select>


                                                        <select name="Day" onChange={CreateVMActions.updateTerminationDay}>
                                                            <option>- Day -</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                            <option value="24">24</option>
                                                            <option value="25">25</option>
                                                            <option value="26">26</option>
                                                            <option value="27">27</option>
                                                            <option value="28">28</option>
                                                            <option value="29">29</option>
                                                            <option value="30">30</option>
                                                            <option value="31">31</option>
                                                        </select>



                                                        <select name="ExpYear" onChange={CreateVMActions.updateTerminationYear}>
                                                            <option>- Year -</option>
                                                            <option value="2020">2020</option>
                                                            <option value="2019">2019</option>
                                                            <option value="2018">2018</option>
                                                            <option value="2017">2017</option>
                                                            <option value="2016">2016</option>
                                                            <option value="2015">2015</option>
                                                        </select></td>

                                                </tr>

                                                <tr>

                                                    <td className="td-bottom-space">
                                                        <button type="button" className="btn btn-lg btn-success" onClick={this.handleSubmit.bind(this)}>Submit</button></td>

                                                        <td> <Link to={'/'} type="button" style={{background:"#D9534F"}} className="btn btn-lg btn-danger">Cancel</Link></td>
                                                </tr>
                                            </table>
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
};

export default CreateVM;