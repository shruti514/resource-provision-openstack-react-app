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
            alert('successFullLogin');
             this.actions.loginSuccess(data);
        })
        .fail((jqXhr) => {
            alert('Login Failed');
            this.actions.loginFail(jqXhr.responseJSON.message)
        });
    }
}

export default alt.createActions(LoginActions)