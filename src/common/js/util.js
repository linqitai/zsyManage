export function resetSearchs(searchs) {
  let _searchs = searchs
  console.log('===before===')
  console.log(_searchs)
  for (let key in _searchs) {
    console.log(_searchs[key])
    let _KEY = 'address'
    if (key === _KEY) {
      console.log('find _KEY')
      for (let keyToo in _searchs[_KEY]) {
        _searchs[_KEY][keyToo] = ''
      }
    } else {
      _searchs[key] = ''
    }
  }
}
export function openClose(value) {
  return value === 1 ? '启用' : value === 0 ? '禁用' : '---'
}
