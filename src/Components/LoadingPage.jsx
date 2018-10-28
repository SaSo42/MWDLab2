import React, {Component} from 'react'
import { connect } from 'react-redux'
import store from "../store";
import {changeToStdUIView, createPerson, inputReceive} from "../Actions/Actions";

@connect(({inputName, warning}) => ({inputName : inputName, warning : warning}))
export default class LoadingPage extends Component {
    constructor (props){
        super(props);
    }

    render(){
        return <div>
            <div>
                <p>Loading Page ...</p>
            </div>
        </div>
    }
}
