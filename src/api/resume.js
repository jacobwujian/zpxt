import request from '@/utils/request'

export function updateResume(data) {
  return request({
    url: '/resume/updateResume',
    method: 'post',
    data
  })
}
export function getResume() {
  return request({
    url: '/resume/getResume',
    method: 'post'
  })
}
export function getResumes(data) {
  return request({
    url: '/resume/getResumes',
    method: 'post',
    data
  })
}

export function deleteResume(data) {
  return request({
    url: '/resume/deleteResume',
    method: 'post',
    data
  })
}
export function getSkills() {
  return request({
    url: '/resume/getSkills',
    method: 'get'
  })
}
export function updateSkills(data) {
  return request({
    url: '/resume/updateSkills',
    method: 'post',
    data
  })
}
export function getWorks(data) {
  return request({
    url: '/resume/getWorks',
    method: 'post',
    data
  })
}
export function updateWork(data) {
  return request({
    url: '/resume/updateWork',
    method: 'post',
    data
  })
}
export function insertWork(data) {
  return request({
    url: '/resume/insertWork',
    method: 'post',
    data
  })
}
export function deleteWork(data) {
  return request({
    url: '/resume/deleteWork',
    method: 'post',
    data
  })
}
