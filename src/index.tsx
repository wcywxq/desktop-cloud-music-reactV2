import * as React from 'react';
import * as ReactDOM from 'react-dom';
// 使用 reinspect 观测 redux
import { StateInspector } from 'reinspect';
import '@/assets/normalize.css';
import 'swiper/css/swiper.min.css';
import '@/assets/global.scss';

import App from './App';

ReactDOM.render(
    <StateInspector name="App">
        <App />
    </StateInspector>
    ,
    document.getElementById('root') as HTMLElement
);
