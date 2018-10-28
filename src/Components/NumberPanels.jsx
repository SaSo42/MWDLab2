import React, {Component} from 'react'
import { connect } from 'react-redux'
import store from "../store";
import {addDigit} from "../Actions/AddDigit";

@connect(({}) => ({}))
export default class NumberPanels extends Component {
    constructor (props){
        super(props);
    }

    render(){
        const nums = [0,1,2,3,4,5,6,7,8,9,'.'];
        const buttons = nums.map((digit, index) =>
            <button
                key={index}
                onClick={() => store.dispatch(addDigit(digit))}
            >{digit}</button>);

        console.log(buttons);

        return buttons;
    }
}
