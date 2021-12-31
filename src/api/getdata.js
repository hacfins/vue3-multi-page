import ajax from '@/config/ajax'
/**
 * 获取用户信息
 */
export const getUserInfo = data => ajax('/portal/course/course/get_list', data, 'GET');

/**
 * 权限视图列表
 */
export const authViewList = data => ajax('/portal/course/course/get_list', data, 'GET');


/**
 * 统计接口
 */
export const reqOverviewData = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqOverviewDataExchange = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqOverviewReport = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqOverviewUnion = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqOverviewRB = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqOverviewClassify = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqOverviewBag = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqOverviewAggregateData = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqUnionData = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqMapData = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqPublicData = data => ajax('/portal/course/course/get_list', data, 'GET');
export const reqSummaryData = data => ajax('/portal/course/course/get_list', data, 'GET');