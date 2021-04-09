import ajax from '@/config/ajax'
/**
 * 获取用户信息
 */
export const getUserInfo = data => ajax('/api/user/user/info', data, 'GET');

/**
 * 权限视图列表
 */
export const authViewList = data => ajax('/api/auth/auth/view_list', data, 'GET');
