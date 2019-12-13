import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { setAuthToken } from './setAuthToken';
import { LoginPhoneParams, LoginEmailParams, UpdateUserSettingParams, SearchParams, VideoCommentParams } from './types';

// baseUrl
axios.defaults.baseURL = 'http://localhost:5000/';
// 发送权限验证的 cookie，以及跨域
axios.defaults.withCredentials = true;

// 如果 localStorage 中有值，则直接调用 setAuthToken 方法设置默认请求 token
setAuthToken(window.localStorage.getItem("token"));

// http request 拦截
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-type': 'application/json;charset=UTF-8'
        };
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// http response 拦截，捕获异常
axios.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data.token) {
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem("userInfo", JSON.stringify(response.data.profile));
        }
        return response;
    },
    (error: AxiosError) => Promise.reject(error.response)
);

/**
 * get 方法
 * @param {string} url
 * @param {{}} params
 * @returns {Promise<any>}
 */
export const get = async (url: string, params = {}): Promise<any> => {
    try {
        const response = await axios.get(url, { params: { ...params } });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * post 方法
 * @param {string} url
 * @param {{}} data
 * @returns {Promise<any>}
 */
export const post = async (url: string, data = {}): Promise<any> => {
    try {
        const response = await axios.post(url, { ...data });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * put 方法
 * @param {string} url
 * @param {{}} data
 * @returns {Promise<any>}
 */
export const put = async (url: string, data = {}): Promise<any> => {
    try {
        const response = await axios.post(url, { ...data });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

// fetch
export const fetchApi = {
    /**
     * 手机登陆
     * @example /login/cellphone?phone=xxx&password=yyy
     * @param data
     * @returns {Promise<any>}
     */
    login_phone: (data: LoginPhoneParams) => post('login/cellphone', data),
    /**
     * 邮箱登陆
     * @example /login?email=xxx@163.com&password=yyy
     * @param data
     * @returns {Promise<any>}
     */
    login_email: (data: LoginEmailParams) => post('login', data),
    /**
     * 退出登陆
     * @returns {Promise<any>}
     */
    logout: () => post('logout'),
    /**
     * 更新用户信息
     * @param {UpdateUserSettingParams} data
     * @returns {Promise<any>}
     */
    updateUserSetting: (data: UpdateUserSettingParams) => put('user/update', data),
    /**
     * banner
     * @example /banner?type=0
     * @param {{type: number}} params
     * @returns {Promise<any>}
     */
    banner: (params = { type: 0 }) => get('banner', params),
    /**
     * 搜索
     * @example /search?keywords=海阔天空
     * @param {SearchParams} params
     * @returns {Promise<any>}
     */
    search: (params: SearchParams) => get('search', params),
    /**
     * 热搜列表-详细
     * @example /search/hot/detail
     * @returns {Promise<any>}
     */
    hot: () => get('search/hot/detail'),
    /**
     * 搜索多重匹配
     * @example /search/multimatch?keywords=海阔天空
     * @param {{keywords: string}} params
     * @returns {Promise<any>}
     */
    multiMatch: (params: { keywords: string }) => get('search/multimatch', params),
    /**
     * 获取音乐 url
     * @example /song/url?id=347230
     * @param {{id: number | number[]}} params
     * @returns {Promise<any>}
     */
    getMusicUrl: (params: { id: number | number[] }) => get('song/url', params),
    /**
     * 音乐是否可用
     * @example /check/music?id=347230
     * @param params
     * @returns {Promise<any>}
     */
    check: (params: { id: number | number[], br?: number }) => get('check/music', params),
    /**
     * 获取歌曲详情，音乐背景图片
     * @example /song/detail?ids=347230,347231
     * @param {{ids: number | number[]}} params
     * @returns {Promise<any>}
     */
    getMusicDetail: (params: { ids: number | number[] }) => get('song/detail', params),
    // 个性推荐部分
    /**
     * 推荐歌单
     * @example /personalized?limit=10
     * @param {{limit: number}} params
     * @returns {Promise<any>}
     */
    recommendSongList: (params: { limit: number }) => get('personalized', params),
    /**
     * 独家放送
     * @example /personalized/privatecontent
     * @returns {Promise<any>}
     */
    exclusiveBroadcast: () => get('personalized/privatecontent'),
    /**
     * 推荐新音乐
     * @example /personalized/newsong
     * @returns {Promise<any>}
     */
    newSong: () => get('personalized/newsong'),
    /**
     * 推荐 MV
     * @example /personalized/mv
     * @returns {Promise<any>}
     */
    recommendMv: () => get('personalized/mv'),
    /**
     * 推荐电台
     * @example /personalized/djprogram
     * @returns {Promise<any>}
     */
    djprogram: () => get('personalized/djprogram'),
    /**
     * 获取视频详情
     * @example /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D
     * @param {{id: string | number}} params
     * @returns {Promise<any>}
     */
    videoDetail: (params: { id: string | number }) => get('video/detail', params),
    /**
     * 获取视频播放地址
     * @example /video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D
     * @param {{id: string | number}} params
     * @returns {Promise<any>}
     */
    videoMovieUrls: (params: { id: string | number }) => get('video/url', params),
    /**
     * 获取视频评论
     * @example /comment/video?id=89ADDE33C0AAE8EC14B99F6750DB954D
     * @param {VideoCommentParams} params
     * @returns {Promise<any>}
     */
    videoComments: (params: VideoCommentParams) => get('comment/video', params),
    /**
     * 获取相关视频
     * @example /related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D
     * @param {{id: string | number}} params
     * @returns {Promise<any>}
     */
    videoRelated: (params: { id: string | number }) => get('related/allvideo', params),
    /**
     * 歌单分类
     * @returns {Promise<any>}
     */
    categoryCatList: () => get('playlist/catlist'),
    /**
     * 热门歌单分类
     * @returns {Promise<any>}
     */
    categoryHot: () => get('playlist/hot'),
    /**
     * 私人fm
     * @returns {Promise<any>}
     */
    personalFm: () => get('/personal_fm'),
};
