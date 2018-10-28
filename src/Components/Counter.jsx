import React from 'react'

export default class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {countValue: 0, min: -10, max: 10}
    }

    render() {
        const {countValue, min, max} = this.state
    }
}