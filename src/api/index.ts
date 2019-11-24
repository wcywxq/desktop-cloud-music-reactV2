export const BaseUrl = 'http://localhost:3000/';

// fetch
export const fetchApi = {
  /**
   * banner
   * @param {type} 0: pc 1: android 2: iphone 3: ipad
   * @example /banner?type=2
   */
  banner: BaseUrl + 'banner',
  /**
   * 搜索
   * @param {keywords, ?limit, ?offset} 
   * @example /search?keywords=海阔天空
   */
  search: BaseUrl + 'search',
  /**
   * 热搜列表-详细
   * @example /search/hot/detail
   */
  hot: BaseUrl + 'search/hot/detail',
  /**
   * 搜索多重匹配
   * @param {keywords}
   * @example /search/multimatch?keywords=海阔天空
   */
  multiMatch: BaseUrl + 'search/multimatch',
  /**
   * 获取音乐 url
   * @param {id} 音乐id
   */
  getMusicUrl: BaseUrl + 'song/url',
  /**
   * 音乐是否可用
   * @param {id, ?br} 歌曲id, 码率
   * @example /check/music
   */
  check: BaseUrl + 'check/music',
  /** 
   * 获取歌曲详情，音乐背景图片
   * @param {ids} 音乐id
   * @example /song/detail?ids=347230,347231
   */
  getMusicDetail: BaseUrl + 'song/detail',
  /** 
   * 推荐歌单
   * @param {limit} 取出数量
   */
  recommendSongList: BaseUrl + 'personalized',
  /**
   * 独家放送
   * @example /personalized/privatecontent
   */
  exclusiveBroadcast: BaseUrl + 'personalized/privatecontent',
  /**
   * 最新音乐 -> 新歌速递
   * @param {type} 全部:0 华语:7 欧美:96 日本:8 韩国:16
   * @example /top/song?type=96
   */
  newestMusic: BaseUrl + 'top/song',
  /**
   * 推荐 MV
   * @example /personalized/mv
   */
  recommendMv: BaseUrl + 'personalized/mv',
};
