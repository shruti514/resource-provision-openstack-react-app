
import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import findAllActiveVMs from '../../server/virtualMachines';

class HomeStore{

    constructor() {
        this.bindActions(HomeActions);
        this.count = 0;
    }


    onShowCreatedInstances(data) {
        this.count = data;
    }

    onFailToShowCreatedInstance(errorMessage) {
        console.log(' Error :  '+errorMessage)
    }

}

export default alt.createStore(HomeStore);