import request from '@/utils/request'

export function getAllTypes() {
  return request({
    url: '/ref/getAllTypes',
    method: 'GET'
  })
}

export function getChildren(data) {
  return request({
    url: '/ref/getChildren',
    method: 'post',
    data
  })
}
export function addType(data) {
  return request({
    url: '/ref/insertType',
    method: 'post',
    data
  })
}
export function deleteType(data) {
  return request({
    url: '/ref/deleteType',
    method: 'post',
    data
  })
}

export function resetTypeName(data) {
  return request({
    url: '/ref/updateTypeName',
    method: 'post',
    data
  })
}

export function getRef(data) {
  return request({
    url: '/ref/selectRef',
    method: 'post',
    data
  })
}
export function addRef(data) {
  return request({
    url: '/ref/insertRef',
    method: 'post',
    data
  })
}
export function deleteRef(data) {
  return request({
    url: '/ref/deleteRef',
    method: 'post',
    data
  })
}

export function resetRefName(data) {
  return request({
    url: '/ref/updateName',
    method: 'post',
    data
  })
}
