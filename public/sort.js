sortByName = (res) => {
  const { offenders } = res.data

  let sortedOffenders = offenders.sort((a, b) => {
    let x = a.offender.name.toLowerCase()
    let y = b.offender.name.toLowerCase()
    if(x < y) return -1
    if(x > y) return 1
    return 0
  })
  $('.offender-list-item').html('')
  displayOffenders(sortedOffenders)
}

sortByDate = (res) => {
  const { offenders } = res.data

  let sortedOffenders = offenders.sort((a, b) => {
    let x = a.offender.date
    let y = b.offender.date
    if(x > y) return -1
    if(x < y) return 1
    return 0
  })
  $('.offender-list-item').html('')
  displayOffenders(sortedOffenders)
}

if(typeof module !== 'undefined') {
  module.exports = {
    sortByName,
    sortByDate
  }
}
