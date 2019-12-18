import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './routers';
import "antd/dist/antd.css"
import "./App.css"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Routers />, document.getElementById('root'));
serviceWorker.unregister();
