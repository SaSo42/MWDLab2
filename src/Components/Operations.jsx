import React, {Component} from 'react'
import { connect } from 'react-redux'
import store from "../store";
import {clearInput, setOPAdd, setOPDivide, setOPMultiply, setOPSubstract, triggerEquals} from "../Actions/Actions";



@connect(({}) => ({}))
export default class NumberPanels extends Component {
    constructor (props){
        super(props);
    }

    render(){
        const nums = ['+', '-', '/', '*', '='];
        const actions = [setOPAdd(), setOPSubstract(), setOPDivide(), setOPMultiply(), triggerEquals()];
        const buttons = nums.map((digit, index) =>
            <button
                key={index}
                onClick={() => store.dispatch(actions[index])}
            >{digit}</button>);

        buttons[buttons.length] = <button
            key={buttons.length}
            onClick={() => store.dispatch(clearInput())}
        >{'C'}</button>;

        console.log(buttons);

        return buttons
    }
}