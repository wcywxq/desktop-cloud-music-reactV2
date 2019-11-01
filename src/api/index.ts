export const BaseUrl = 'http://localhost:3000/'

// fetch
export const fetchApi = {
  // 搜索
  search: BaseUrl + 'search',
  // 热搜列表
  hot: BaseUrl + 'search/hot/detail',
  // 最佳匹配
  multiMatch: BaseUrl + 'search/multimatch',
  // 搜索建议
  suggest: BaseUrl + 'search/suggest'
}
