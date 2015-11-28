
import alt from '../alt';
import HomeActions from '../actions/HomeActions';


class HomeStore{

    constructor() {
        this.bindActions(HomeActions);
        this.count = 0;
        this.serverList=[];
    }
    onShowCreatedInstances(data) {
        this.count = data.data;
    }

    onFailToShowCreatedInstance(errorMessage) {
        console.log(' Error :  '+errorMessage)
    }

    onShowInstanceListSuccess(data) {


/*        this.serverList.map(function(data,index) {

            this.serverList[index].name = data[index].name;

        }*/
        this.serverList = data;
    }

    onFailToShowInstanceList(errorMessage) {
        console.log(' Error :  '+errorMessage)
    }

    onGetImageNameByID(errorMessage) {
        console.log(' Error :  '+errorMessage)
    }
}

export default alt.createStore(HomeStore);