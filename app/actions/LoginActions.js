import alt from '../alt';

class LoginActions{

    constructor(){
        this.generateActions(
            'loginSuccess',
            'loginFail',
            'updateUsername',
            'updatePassword'
        );
    }

    postLogin(username,password){
        console.log('Trying to login!!!');
        $.ajax({
            type:'POST',
            url:'/login',
            data: { username: username, password: password }
        })
        .done((data)=>{
           // alert('login successfull');
             this.actions.loginSuccess(data);
        })
        .fail((jqXhr) => {
            var errorMessage = jqXhr.responseJSON.message;
            if(""==errorMessage){
                errorMessage = "Please enter correct username and password.";
            }
            this.actions.loginFail(errorMessage)
        });
    }
}

export default alt.createActions(LoginActions)