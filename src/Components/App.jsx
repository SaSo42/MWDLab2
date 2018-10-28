import React, {Component} from 'react';
import { connect } from 'react-redux';
import StdUI from "./StdUI";
import AddPerson from "./AddPerson";
import AddTask from "./AddTask";
import {DialogTypes} from "../state";
import LoadingPage from "./LoadingPage";

@connect(({dialogType}) => ({dialogType : dialogType}))
export default class App extends Component {
    constructor (props){
        super(props);
    }

    static decideForUI(dialogType){
        const stdUI = <div>
            <StdUI/>
        </div>;
        const addPerson = <div>
            <AddPerson/>
        </div>;
        const  addTask = <div>
            <AddTask/>
        </div>;
        const loadingPage = <div>
            <LoadingPage/>
        </div>;

        switch (dialogType) {
            case DialogTypes.STD_UI:
                return stdUI;
            case DialogTypes.ADD_PERSON:
                return addPerson;
            case DialogTypes.ADD_TASK:
                return addTask;
            case DialogTypes.LOADING_PAGE:
                return loadingPage;
            default:
                return stdUI;
        }
    }

    render(){
        const {dialogType} = this.props;

        return App.decideForUI(dialogType);
    }
}
