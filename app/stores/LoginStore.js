import alt from '../alt';
import LoginAction from '../actions/LoginActions';

class LoginStore {

    constructor() {
        this.bindActions(LoginAction);
        this.username='';
        this.password='';
        this.isAuthenticated=false;
        this.isError = false;
        this.errorMessage = '';
        this.user=null;
    }

    onLoginSuccess(data){
        this.isAuthenticated = true;
        this.user = data;
    }


    onLoginFail(errorMessage){
        console.log('Unable to login.Please try again.')
        this.isError = true;
        this.errorMessage = errorMessage;
    }

    onUpdateUsername(event){
        //alert('changing name');
        this.username = event.target.value;
    }

    onUpdatePassword(event){
        //alert('changing pass');
        this.password = event.target.value;
    }

}

export default alt.createStore(LoginStore);

