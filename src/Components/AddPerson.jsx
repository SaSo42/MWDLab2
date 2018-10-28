import React, {Component} from 'react'
import { connect } from 'react-redux'
import store from "../store";
import {changeToStdUIView, createPerson, inputReceive} from "../Actions/Actions";
import {createPersonThunk} from "../Actions/Thunks";

@connect(({inputName, warning}) => ({inputName : inputName, warning : warning}))
export default class AddPerson extends Component {
    constructor (props){
        super(props);
    }

    render(){
        const {inputName, warning} = this.props;

        return <div>
            <div>
                <button onClick={() => store.dispatch(changeToStdUIView())}>
                    Return to main UI
                </button>
            </div>
            <div>
                <p>{warning}</p>
            </div>
            <div className="form-group">
                <label>Name of Person</label>
                <input value={inputName} type="text" className="form-control" placeholder="Name" onChange={(e) => store.dispatch(inputReceive(e.target.value))} autoFocus="autofocus"/>
            </div>
            <button className="btn btn-primary" onClick={() => store.dispatch(createPersonThunk())}>Create</button>
            <div>
                <p>Hello from Add Person</p>
            </div>
        </div>
    }
}
