import * as React from 'react';
import * as ReactDOM from 'react-dom';
// 使用 reinspect 观测 redux
import { StateInspector } from 'reinspect'
import './assets/normalize.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import App from './App';

ReactDOM.render(
    <StateInspector name="App">
        <App />
    </StateInspector>
  ,
  document.getElementById('root') as HTMLElement
)
