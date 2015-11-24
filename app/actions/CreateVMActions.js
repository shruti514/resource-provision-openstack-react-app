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
            'invalidImage',
            'invalidFlavor'
        );
    }

    createVM(imageId, flavorId) {
        //alert('Inside create VM method');
        $.ajax({
                type: 'POST',
                url: '/servers',
                data: { imageId: imageId, flavorId: flavorId }
            })
            .done((data) => {
                alert('Create vm success')
                this.actions.createVMSuccess(data);
            })
            .fail((jqXhr) => {
                alert('Create vm fail')
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
}

export default alt.createActions(CreateVMActions);