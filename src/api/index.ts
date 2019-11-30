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
  (error: AxiosError) => Promise.reject(error)
);

// http response 拦截，捕获异常
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error.response)
);

/**
 * get 方法
 * @returns {Promise}
 * @param url
 * @param params
 */
export const get = async (url: string, params = {}): Promise<any> => {
  try {
    const response = await axios.get(url, { params });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

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
   * @example /banner?type=0
   * @param params
   */
  banner: (params = { type: 0 }) => get('banner', params),
  /**
   * 搜索
   * @example /search?keywords=海阔天空
   * @param params
   */
  search: (params: SearchParams) => get('search', params),
  /**
   * 热搜列表-详细
   * @example /search/hot/detail
   */
  hot: () => get('search/hot/detail'),
  /**
   * 搜索多重匹配
   * @example /search/multimatch?keywords=海阔天空
   * @param params
   */
  multiMatch: (params: { keywords: string }) => get('search/multimatch', params),
  /**
   * 获取音乐 url
   * @example /song/url?id=347230
   * @param params
   */
  getMusicUrl: (params: { id: number | number[] }) => get('song/url', params),
  /**
   * 音乐是否可用
   * @example /check/music?id=347230
   * @param params
   */
  check: (params: { id: number | number[], br?: number }) => get('check/music', params),
  /**
   * 获取歌曲详情，音乐背景图片
   * @example /song/detail?ids=347230,347231
   * @param params
   */
  getMusicDetail: (params: { ids: number | number[] }) => get('song/detail', params),
  // 个性推荐部分
  /**
   * 推荐歌单
   * @example /personalized?limit=10
   * @param params
   */
  recommendSongList: (params: { limit: number }) => get('personalized', params),
  /**
   * 独家放送
   * @example /personalized/privatecontent
   */
  exclusiveBroadcast: () => get('personalized/privatecontent'),
  /**
   * 推荐新音乐
   * @example /personalized/newsong
   */
  newSong: () => get('personalized/newsong'),
  /**
   * 推荐 MV
   * @example /personalized/mv
   */
  recommendMv: () => get('personalized/mv'),
  /**
   * 推荐电台
   * @example /personalized/djprogram
   */
  djprogram: () => get('personalized/djprogram'),
  /**
   * 获取视频详情
   * @example /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D
   * @param params
   */
  videoDetail: (params: { id: string | number }) => get('video/detail', params),
  /**
   * 获取视频播放地址
   * @example /video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D
   * @param params
   */
  videoMovieUrls: (params: { id: string | number }) => get('video/url', params)
};
