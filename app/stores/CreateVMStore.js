import alt from '../alt';
import CreateVMActions from '../actions/CreateVMActions';

class CreateVMStore{

    constructor() {
        this.bindActions(CreateVMActions);
        this.image = '';
        this.flavor = '';
        this.imageList=[];
        this.flavorList=[];
        this.serverCreatedSuccessMessage=null;
        this.failureMessage=null;
    }

    onCreateVMSuccess(data) {
        this.serverCreatedSuccessMessage = data.message + "  Id of new Server="+JSON.stringify(data.data);
    }

    onCreateVMFail(errorMessage) {
        this.failureMessage=errorMessage;
    }
    onGetImagesSuccess(data) {
        this.imageList = data;
    }

    onGetImagesFail(errorMessage) {
        console.log(' On Get images '+errorMessage);
    }

    onGetFlavorsSuccess(data) {
        this.flavorList = data;
    }

    onGetFlavorsFail(errorMessage) {
        console.log(' On Get flavors '+errorMessage);
    }

    onUpdateImage(event) {
        this.image = event.target.value;
    }

    onUpdateFlavor(event) {
        this.flavor = event.target.value;
    }

    onInvalidImage() {
        this.imageValidationState = 'has-error';
        this.validationMessage = 'Please select a valid image';
    }

    onInvalidFlavour() {
        this.flavorValidationState = 'has-error';
        this.validationMessage = 'Please select a valid Flavor'
    }

}

export default alt.createStore(CreateVMStore);