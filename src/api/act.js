import request from '@/utils/request'

export function getAllActs(data) {
  return request({
    url: '/act/getAllActs',
    method: 'post',
    data
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
export function updateAct(data) {
  return request({
    url: '/act/updateAct',
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
export function getActsForUser(data) {
  return request({
    url: '/act/getActsForUser',
    method: 'post',
    data
  })
}
export function updateActResultCount(data) {
  return request({
    url: '/act/updateActResultCount',
    method: 'post',
    data
  })
}
