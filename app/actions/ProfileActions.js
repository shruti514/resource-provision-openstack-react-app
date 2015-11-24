import alt from '../alt';

class ProfileActions{

    constructor() {
        this.generateActions(
            'getProfileSuccess',
            'getProfileFail'
        );
    }

    getProfile(){
        console.log('Inside action getProfile');
        $.ajax({
            type:'GET',
            url:'/userProfile'
        })
        .done((data)=>{
           //alert('action success')
            this.actions.getProfileSuccess(data);
        })
        .fail((jqXhr)=>{
            var err={
                status:jqXhr.status,
                message:jqXhr.responseJSON.message
            };
            this.actions.getProfileFail(err);
        })
    }


}

export default alt.createActions(ProfileActions);