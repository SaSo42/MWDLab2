import React from 'react'
import ReactDom from 'react-dom'
import App from './Components/App'
import { Provider } from "react-redux";
import store from "./store";

ReactDom.render(
    <Provider store={store}>
        <div>
            <div>
                <App input={store.getState()} />
            </div>
        </div>
    </Provider>,
    document.getElementById('main')
);
