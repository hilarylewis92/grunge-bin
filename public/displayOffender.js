$(document).ready(() => {
  getOffendersList()
})

function getOffendersList() {
  axios.get('/api/offenders')
  .then((res) => {
    var {offenders} = res.data
    displayOffenders(offenders)
    countOffenders(offenders)
  })
  .catch((err) => {
    console.error(err)
  })
}

function displayOffenders(offenders) {
  offenders.map(offense => {
    $('.offender-list').append(`
      <li class='offender-list-item'>
        <div>${offense.offender.name}</div> <div>${offense.offender.offense}</div>
        <div>${offense.offender.date}</div>
      </li>
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

$('.save-offender-btn').on('click', () => {
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
})


$('.name-sort').on('click', () => {
  sortOffenderList()
})

$('.date-sort').on('click', () => {
  // sortOffenderList()
})

function sortOffenderList() {
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
  $('.offender-list').html('')
  displayOffenders(sortedOffenders)
}
