import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'showCreatedInstances',
            'failToShowCreatedInstance'
        );
    }

    getVMCount(){
        alert('Inside action get servers');
        $.ajax({
                type: 'GET',
                url: '/findAllActiveVMCnt'
            })
            .done((data) => {
                alert(JSON.stringify(data))
                this.actions.showCreatedInstances(data);
            })
            .fail((jqXhr) => {
                var resp= jqXhr.responseJSON.message;
                alert(JSON.stringify(resp))
                this.actions.failToShowCreatedInstance(resp);
            });
    }

}

export default alt.createActions(HomeActions);