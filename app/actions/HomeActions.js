import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'ShowCreatedInstances',
            'FailToShowCreatedInstance',
            'ShowInstanceListSuccess',
            'FailToShowInstanceList',
            'GetImageNameByID'
        );
    }

    getVMCount(){
        //alert('Inside action get servers');
        $.ajax({
                type: 'GET',
                url: '/findAllActiveVMCnt'
            })
            .done((data) => {
                //alert(JSON.stringify(data))
                this.actions.ShowCreatedInstances(data);
            })
            .fail((jqXhr) => {
                var resp= jqXhr.responseJSON.message;
                //alert(JSON.stringify(resp))
                this.actions.FailToShowCreatedInstance(resp);
            });
    }

    getVMList(){
        //alert('Inside action get servers');
        $.ajax({
                type: 'GET',
                url: '/servers'
            })
            .done((data) => {
            //alert(JSON.stringify(data))
            this.actions.ShowInstanceListSuccess(data);
    })
    .fail((jqXhr) => {
            var resp= jqXhr.responseJSON.message;
        //alert(JSON.stringify(resp))
        this.actions.FailToShowInstanceList(resp);
    });
    }

    getImageByID(){
        alert('Inside action get image by ID');
        $.ajax({
                type: 'GET',
                url: '/imageName'
            })
            .done((data) => {
                //alert(JSON.stringify(data))
                this.actions.GetImageNameByID(data);
            })
            .fail((jqXhr) => {
               // var resp= jqXhr.responseJSON.message;
                //alert(JSON.stringify(resp))
                //this.actions.FailToShowInstanceList(resp);
            });
    }

}

export default alt.createActions(HomeActions);