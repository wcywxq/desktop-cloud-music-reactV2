import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// baseUrl
axios.defaults.baseURL = 'http://localhost:3000/';
// 发送权限验证的 cookie，以及跨域
axios.defaults.withCredentials = true;

// http request 拦截
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// http response 拦截，捕获异常
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response);
  }
)

/**
 * get 方法
 * @param {url}
 * @param {data}
 * @returns {Promise}
 */
export const get = async (url: string, params = {}): Promise<any> => {
  try {
    const response = await axios.get(url, { params });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

// types
export interface SearchParams {
  keywords: string | undefined,
  type?: number | string | undefined,
  limit?: number | undefined,
  offset?: number | undefined
}

// fetch
export const fetchApi = {
  /**
   * banner
   * @param [type] 0: pc 1: android 2: iphone 3: ipad
   * @example /banner?type=0
   */
  banner: (params = { type: 0 }) => get('banner', params),
  /**
   * 搜索
   * @param [keywords] 
   * @param [limit] 可选
   * @param [offset] 可选
   * @example /search?keywords=海阔天空
   */
  search: (params: SearchParams) => get('search', params),
  /**
   * 热搜列表-详细
   * @example /search/hot/detail
   */
  hot: () => get('search/hot/detail'),
  /**
   * 搜索多重匹配
   * @param [keywords]
   * @example /search/multimatch?keywords=海阔天空
   */
  multiMatch: (params: { keywords: string }) => get('search/multimatch', params),
  /**
   * 获取音乐 url
   * @param [id] 音乐id
   * @example /song/url?id=347230
   */
  getMusicUrl: (params: { id: number | number[] }) => get('song/url', params),
  /**
   * 音乐是否可用
   * @param [id] 歌曲id
   * @param [br] 码率，可选
   * @example /check/music?id=347230
   */
  check: (params: { id: number | number[], br?: number }) => get('check/music', params),
  /** 
   * 获取歌曲详情，音乐背景图片
   * @param [ids] 音乐id
   * @example /song/detail?ids=347230,347231
   */
  getMusicDetail: (params: { ids: number | number[] }) => get('song/detail', params),
  /** 
   * 推荐歌单
   * @param [limit] 取出数量
   * @example /personalized?limit=10
   */
  recommendSongList: (params: { limit: number }) => get('personalized', params),
  /**
   * 独家放送
   * @example /personalized/privatecontent
   */
  exclusiveBroadcast: () => get('personalized/privatecontent'),
  /**
   * 最新音乐 -> 新歌速递
   * @param [type] 全部:0 华语:7 欧美:96 日本:8 韩国:16
   * @example /top/song?type=96
   */
  newestMusic: (params: { type: number }) => get('top/song', params),
  /**
   * 推荐 MV
   * @example /personalized/mv
   */
  recommendMv: () => get('personalized/mv'),
};
