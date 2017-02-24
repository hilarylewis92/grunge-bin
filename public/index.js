$(document).ready(() => {
  getOffendersList()
})

function getOffendersList() {
  axios.get('/api/offenders')
  .then((res) => {
    const {offenders} = res.data
    displayOffenders(offenders)
    countOffenders(offenders)
  })
  .catch((err) => {
    console.error(err)
  })
}

function displayOffenders(offenders) {
  offenders.map(offense => {
    $('.offender-list-item').append(`
      <p id=${offense.id} class='name'>${offense.offender.name}</p>
      <div>${offense.offender.offense}</div>
      <div>${offense.offender.date}</div>
      <div>Forgiven: ${offense.offender.forgiven}</div>
      `)
    })
}

function countOffenders(offenders) {
  var totalOffenders = offenders.length
  var totalUnforgiven = offenders.filter(offense => {
    return offense.offender.forgiven === false
  }).length
  var totalForgiven = totalOffenders - totalUnforgiven

  $('.count').append(`
    <div>${totalOffenders} total offenders</div>
    <div>${totalUnforgiven} total unforgiven offenders</div>
    <div>${totalForgiven} total forgiven offenders</div>
  `)
}

function clearValues() {
  $('.offender-list-item').html('')
  $('.count').html('')
  $('.offense').val('')
  $('.name').val('')
}

$('.save-offender-btn').on('click', (e) => {
  e.preventDefault()
  axios.post('/api/offenders', {
      name: $('.name').val(),
      offense: $('.offense').val(),
      forgiven: false,
      date: Date.now()
    })
    .then (
      getOffendersList()
    )
    .catch((err) => {
      console.log(err)
    })
    clearValues()
})


$('.name-sort').on('click', () => {
  sortOffenderNameList()
})

$('.date-sort').on('click', () => {
  sortOffenderDateList()
})

function sortOffenderNameList() {
  axios.get('/api/offenders')
  .then((res) => {
    sortByName(res)
  })
  .catch((err) => {
    console.error(err)
  })
}

function sortByName(res) {
  var {offenders} = res.data

  var sortedOffenders = offenders.sort((a, b) => {
    var x = a.offender.name.toLowerCase()
    var y = b.offender.name.toLowerCase()
    if(x < y) return -1
    if(x > y) return 1
    return 0
  })
  $('.offender-list-item').html('')
  displayOffenders(sortedOffenders)
}

function sortOffenderDateList() {
  axios.get('/api/offenders')
  .then((res) => {
    sortByDate(res)
  })
  .catch((err) => {
    console.error(err)
  })
}

function sortByDate(res) {
  var {offenders} = res.data

  var sortedOffenders = offenders.sort((a, b) => {
    var x = a.offender.date
    var y = b.offender.date
    if(x > y) return -1
    if(x < y) return 1
    return 0
  })
  $('.offender-list-item').html('')
  displayOffenders(sortedOffenders)
}

$('.offender-list-item').on('click', '.name', (e) => {
  var { id } = e.target

  axios.get(`/api/offenders/${id}`)
  .then((res) => {
    displayOffender(res)
  })
  .catch((err) => {
    console.error(err)
  })
})

function displayOffender(res) {
  $('.offender-list-item').html('')

  const {id} = res.data
  const {offender} = res.data.offender

  $('.offender-list-item').append(`
    <p class='name'>${offender.name}</p>
    <div>${offender.offense}</div>
    <div>${offender.date}</div>
    <div>Forgiven: ${offender.forgiven}</div>
    <button class='forgive' id=${id}>forgive</button>
    `)
}

$('.offender-list-item').on('click', '.forgive', (e) => {
  const { id } = e.target
  axios.patch(`/api/offenders/${id}`)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })
})
