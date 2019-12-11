import * as React from 'react';
import * as ReactDOM from 'react-dom';
// 使用 reinspect 观测 redux
import { StateInspector } from 'reinspect';
// 国际化
import { ConfigProvider } from 'antd';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
// mock
// import '@/mock';
// css
import '@/assets/normalize.css';
import 'swiper/css/swiper.min.css';
import '@/assets/global.scss';

import App from './App';

moment.locale('zh-cn');

ReactDOM.render(
    <StateInspector name="App">
        {/* 国际化 */}
        <ConfigProvider locale={zhCN}>
            <App/>
        </ConfigProvider>
    </StateInspector>
    ,
    document.getElementById('root') as HTMLElement
);
