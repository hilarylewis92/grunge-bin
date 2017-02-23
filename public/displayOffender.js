$(document).ready(() => {
  getOffendersList()
})

function getOffendersList() {
  axios.get('/api/offenders')
  .then((res) => {
    displayOffenders(res)
    countOffenders(res)
  })
  .catch((err) => {
    console.error(err)
  })
}

function displayOffenders(res) {
  var {offenders} = res.data

  offenders.map(offense => {
    $('.offender-list').append(`
      <li class='offender-list-item'>
        <div>${offense.offender.name}</div> <div>${offense.offender.offense}</div>
        <div>${offense.offender.date}</div>
      </li>
      `)
    })
}

function countOffenders(res) {
  var {offenders} = res.data

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
