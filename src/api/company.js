import request from '@/utils/request'

export function getCompany(data) {
  return request({
    url: '/company/getCompany',
    method: 'post',
    data
  })
}
export function insertCompany(data) {
  return request({
    url: '/company/insertCompany',
    method: 'post',
    data
  })
}
export function deleteCompany(data) {
  return request({
    url: '/company/deleteCompany',
    method: 'post',
    data
  })
}

export function updateCompany(data) {
  return request({
    url: '/company/updateCompany',
    method: 'post',
    data
  })
}
