import alt from '../alt';
import CreateVMActions from '../actions/CreateVMActions';

class CreateVMStore{

    constructor() {
        this.bindActions(CreateVMActions);
        this.image = '';
        this.flavor = '';
        this.imageList=[];
        this.flavorList=[];
        this.app=null;
        this.serverCreatedSuccessMessage=null;
        this.failureMessage=null;
        this.dropDownClosed=true;
        this.user=null;
        this.year=9999;
        this.month=99;
        this.day=99;
    }

    onCreateVMSuccess(data) {
        var message = data.message + "  Id of new Server="+JSON.stringify(data.data);
        alert(message);
        this.serverCreatedSuccessMessage = data.message;
        this.failureMessage =null;
    }

    onCreateVMFail(errorMessage) {
        this.failureMessage=errorMessage;
    }
    onGetImagesSuccess(data) {
        this.imageList = data;
    }

    onToggleProfileDropDown(){
       this.dropDownClosed = !this.dropDownClosed
    }

    onGetImagesFail(errorMessage) {
        console.log(' On Get images '+errorMessage);
        this.failureMessage = errorMessage
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

    onUpdateApp(event){
        this.app=event.target.value;
    }

    onUpdateFlavor(event) {
        this.flavor = event.target.value;
    }

    onGetUserSuccess(user){
       this.user = user;
    }

    onGetUserFail(errorMessage){
        this.failureMessage= errorMessage;
    }

    onGetStatsSuccess(stats){
        this.failureMessage=null;
        this.stats = stats;
    }

    onGetStatsFail(errorMessage){
        this.failureMessage = errorMessage;
    }

    onInvalidImage(){
        this.failureMessage = "Please select a valid Image.";
    }

    onInvalidFlavor(){
        this.failureMessage = "Please select a valid Flavor.";
    }

    onUpdateTerminationYear(event){
       this.year = event.target.value
    }

    onUpdateTerminationMonth(event){
       this.month = event.target.value
    }

    onUpdateTerminationDay(event){
       this.day = event.target.value
    }

}

export default alt.createStore(CreateVMStore);