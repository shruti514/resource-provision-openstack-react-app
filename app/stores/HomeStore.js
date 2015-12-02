
import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import getImageName from '../../server/glance';
var img = require('../../server/glance');


class HomeStore{

    constructor() {
        this.bindActions(HomeActions);
        this.count = 0;
        this.serverList=[];
        this.stats = [];
        this.user=null;

    }
    onShowCreatedInstances(data) {
        this.count = data.data;
    }

    onGetUserSuccess(user){
        this.user = user;
    }

    onGetUserFail(errorMessage){
        console.log(' Error :  '+errorMessage)
    }

    onFailToShowCreatedInstance(errorMessage) {
        console.log(' Error :  '+errorMessage)
    }

    onShowInstanceListSuccess(data) {
        console.log("Success called",data);
        this.serverList = data;

       /* this.templist = this.serverList;

        console.log("lenght : " + this.serverList.length);

        var res;
        for(var i = 0; i < this.serverList.length; i++)
        {
           console.log("For loop");

           var name =  img.getImageName(this.serverList[i].image,res);
            //console.log("image name : " + this.templist[i]);
            console.log("Name : " + name);

        }
        this.serverList = this.templist;*/

    }

    onFailToShowInstanceList(errorMessage) {
        console.log(' Error :  '+errorMessage)
    }

    onGetImageNameByIDSuccess(data)
    {
    }

    onFailToGetImageNameByID(errorMessage) {
        console.log(' Error :  '+errorMessage)
    }

    onGetStatsSuccess(data) {
        this.stats = data;
    }

    onFailToGetStats(errorMessage) {
        console.log(' Error :  '+errorMessage)
    }
}

export default alt.createStore(HomeStore);