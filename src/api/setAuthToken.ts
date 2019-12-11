import axios from "axios";

// 为每个 url 配置公共的 token 请求头
export const setAuthToken = (token: any) => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};
