import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/userInfo',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'GET'
  })
}

export function getAllUsers() {
  return request({
    url: '/user/getAllUsers',
    method: 'GET'
  })
}

export function insertUser(data) {
  return request({
    url: '/user/insertUser',
    method: 'post',
    data
  })
}
export function updateUser(data) {
  return request({
    url: '/user/updateUserByPk_user',
    method: 'post',
    data
  })
}
