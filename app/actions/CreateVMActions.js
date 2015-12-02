import alt from '../alt';

class CreateVMActions {
    constructor() {
        this.generateActions(
            'createVMSuccess',
            'createVMFail',
            'getImagesSuccess',
            'getImagesFail',
            'getFlavorsSuccess',
            'getFlavorsFail',
            'updateImage',
            'updateFlavor',
            'updateApp',
            'updateTerminationYear',
            'updateTerminationDay',
            'updateTerminationMonth',
            'invalidImage',
            'invalidFlavor',
            'toggleProfileDropDown',
            'getUserSuccess',
            'getUserFail',
            'getStatsSuccess',
            'getStatsFail',
            'successMessageShown',
            'getStatsAfterSuccessSucess',
            'getStatsAfterSuccessFail',
            'setApps',
            'setEnvDetails',
            'updateServerName'
        );
    }

    createVM(imageId, flavorId, terminationDate, serverName) {
        //alert('Inside create VM method');
        $.ajax({
                type: 'POST',
                url: '/servers',
                data: { imageId: imageId, flavorId: flavorId ,terminationDate:terminationDate, serverName:serverName}
            })
            .done((data) => {
                //alert('Create vm success')
                this.actions.createVMSuccess(data);
            })
            .fail((jqXhr) => {
                //alert('Create vm fail')
                this.actions.createVMFail(jqXhr.responseJSON.message);
            });
    }


    getImages(){
        console.log('Inside action get servers');
        $.ajax({
                type: 'GET',
                url: '/images'
            })
            .done((data) => {
                this.actions.getImagesSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getImagesFail(jqXhr.responseJSON.message);
            });
    }

    getFlavors(){
        console.log('Inside action get servers');
        $.ajax({
                type: 'GET',
                url: '/flavors'
            })
            .done((data) => {
                this.actions.getFlavorsSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getFlavorsFail(jqXhr.responseJSON.message);
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
        console.log('Inside action get servers');
        $.ajax({
                type: 'GET',
                url: '/stats'
            })
            .done((data) => {
                this.actions.getStatsSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getStatsFail(jqXhr.responseJSON.message);
            });
    }

    getStatsAfterSuccess(){
        console.log('Inside action get servers');
        $.ajax({
                type: 'GET',
                url: '/stats'
            })
            .done((data) => {
                this.actions.getStatsAfterSuccessSucess(data);
            })
            .fail((jqXhr) => {
                this.actions.getStatsAfterSuccessFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(CreateVMActions);