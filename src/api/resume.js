import request from '@/utils/request'

export function updateResume(data) {
  return request({
    url: '/resume/updateResume',
    method: 'post',
    data
  })
}
export function getResume(data) {
  return request({
    url: '/resume/getResume',
    method: 'post',
    data
  })
}
export function set(data) {
  return request({
    url: '/resume/getResume',
    method: 'post',
    data
  })
}
