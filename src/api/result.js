import request from '@/utils/request'

export function updateResult(data) {
  return request({
    url: '/result/updatResult',
    method: 'post',
    data
  })
}
export function getResult(data) {
  return request({
    url: '/result/getResult',
    method: 'post',
    data
  })
}
export function insertResult(data) {
  return request({
    url: '/result/insertResult',
    method: 'post',
    data
  })
}

export function deleteResult(data) {
  return request({
    url: '/result/deleteResult',
    method: 'post',
    data
  })
}

