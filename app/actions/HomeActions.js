import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'ShowCreatedInstances',
            'FailToShowCreatedInstance',
            'ShowInstanceListSuccess',
            'FailToShowInstanceList',
            'GetImageNameByIDSuccess',
            'FailToGetImageNameByID',
            'GetStatsSuccess',
            'FailToGetStats',
            'getUserSuccess',
            'getUserFail'
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
        $.ajax({
                type: 'GET',
                url: '/imageName'
            })
            .done((data) => {
                //alert(JSON.stringify(data))
                this.actions.GetImageNameByIDSuccess(data);
            })
            .fail((jqXhr) => {
                var resp= jqXhr.responseJSON.message;
                //alert(JSON.stringify(resp))
                this.actions.FailToGetImageNameByID(resp);
            });
    }

    getUser(){
        console.log('Inside action get servers');
        $.ajax({
                type: 'GET',
                url: '/userProfile'
            })
            .done((data) => {
                this.actions.getUserSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getUserFail(jqXhr.responseJSON.message);
            });
    }

    getStats(){
        $.ajax({
                type: 'GET',
                url: '/stats'
            })
            .done((data) => {
                //alert(JSON.stringify(data))
                this.actions.GetStatsSuccess(data);
            })
            .fail((jqXhr) => {
                var resp= jqXhr.responseJSON.message;
                //alert(JSON.stringify(resp))
                this.actions.FailToGetStats(resp);
            });
    }

}

export default alt.createActions(HomeActions);