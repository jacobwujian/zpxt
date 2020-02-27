import request from '@/utils/request'

export function getAllActs() {
  return request({
    url: '/act/getAllActs',
    method: 'GET'
  })
}
export function getActInformation(data) {
  return request({
    url: '/act/getActInformation',
    method: 'post',
    data
  })
}
export function getActByExample(data) {
  return request({
    url: '/act/searchByExample',
    method: 'post',
    data
  })
}

export function insertAct(data) {
  return request({
    url: '/act/insertAct',
    method: 'post',
    data
  })
}
export function insertActScreens(data) {
  return request({
    url: '/act/insertActScreens',
    method: 'post',
    data
  })
}
export function updateAct(data) {
  return request({
    url: '/act/updateAct',
    method: 'post',
    data
  })
}
export function deleteScreens(data) {
  return request({
    url: '/act/deleteScreens',
    method: 'post',
    data
  })
}
export function deleteAct(data) {
  return request({
    url: '/act/deleteAct',
    method: 'post',
    data
  })
}
export function getActsForUser() {
  return request({
    url: '/act/getActsForUser',
    method: 'GET'
  })
}
