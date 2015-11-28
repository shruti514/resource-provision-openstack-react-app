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
        this.designation="";
        this.successMessage='';
        this.username=""
        this.errorMessage='';
        this.errorStatusCode='';
    }

    onGetProfileSuccess(user){
        this.firstName=user.firstName;
        this.lastName=user.lastName;
        this.departmentName=user.department;
        this.contactNumber=user.contactNumber;
        this.emailId=user.email;
        this.designation = user.designation;
        this.username=user.username
    }

    onGetProfileFail(data){
        this.errorMessage=data.message;
        this.errorStatusCode=data.status;
    }
}

export default alt.createStore(ProfileStore);