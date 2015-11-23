var React = require('react');

import CreateVMStore from '../stores/CreateVMStore';
import CreateVMActions from '../actions/CreateVMActions';

class CreateVM extends React.Component {

    constructor(props){
        super(props);
        this.state = CreateVMStore.getState();
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount(){
        CreateVMStore.listen(this.onChange);
        CreateVMActions.getFlavors();
        CreateVMActions.getImages();
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
        if (image) {
            CreateVMActions.createVM(image,flavor);
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

    showSuccessMessage(){
        if(this.state.serverCreatedSuccessMessage)
        return(
            <div class="alert alert-success">
                <strong>Well done!</strong>{this.state.serverCreatedSuccessMessage}
            </div>
        )

    }

    showErrorMessage(){
        if(this.state.failureMessage)
        return(
            <div class="alert alert-danger">
                <strong>Oh snap!</strong> {this.state.failureMessage}
            </div>
        )
    }

    render() {
        var images = this.renderImageLists();
        var flavors = this.renderFlavoursList();
        return (

            <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <div>
                        <h1>Images:</h1>
                        <select class="form-control" onChange={CreateVMActions.updateImage}>
                            {images}
                        </select>
                    </div>
                    <div>
                        <h1>Flavors:</h1>
                        <select class="form-control" onChange={CreateVMActions.updateFlavor}>
                            {flavors}
                        </select>

                    </div>
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        );
    }
};

export default CreateVM;