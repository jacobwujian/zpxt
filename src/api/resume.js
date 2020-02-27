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

export function deleteResume(data) {
  return request({
    url: '/resume/deleteResume',
    method: 'post',
    data
  })
}
export function getSkills(data) {
  return request({
    url: '/resume/getSkills',
    method: 'post',
    data
  })
}
export function deleteSkills(data) {
  return request({
    url: '/resume/deleteSkills',
    method: 'post',
    data
  })
}
export function insertSkill(data) {
  return request({
    url: '/resume/insertSkill',
    method: 'post',
    data
  })
}
export function updateSkills(data) {
  return request({
    url: '/resume/updateSkills',
    method: 'post',
    data
  })
}
