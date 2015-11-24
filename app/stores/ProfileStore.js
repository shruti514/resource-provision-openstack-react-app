import alt from '../alt';

import ProfileActions from '../actions/ProfileActions';

class ProfileStore{

    constructor(){
        this.bindActions(ProfileActions);
        this.firstName='';
        this.lastName='';
        this.departmentName='';
        this.emailId='';
        this.contactNumber='';
        this.successMessage='';
        this.errorMessage='';
        this.errorStatusCode='';
    }

    onGetProfileSuccess(data){
        //alert('store success')console.log(JSON.stringify(data))
       this.successMessage = data.message;

        var user = data.user;
        this.firstName=user.firstName;
        this.lastName=user.lastName;
        this.departmentName=user.departmentName;
        this.contactNumber=user.contactNumber;
        this.emailId=user.emailId;
    }

    onGetProfileFail(data){
        this.errorMessage=data.message;
        this.errorStatusCode=data.status;
    }
}

export default alt.createStore(ProfileStore);