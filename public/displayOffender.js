$(document).ready(() => {
  getOffendersList()
})

function getOffendersList() {
  axios.get('/api/offenders')
  .then((res) => {
    displayOffenders(res)
  })
  .catch((err) => {
    console.error(err)
  })
}

function displayOffenders(res) {
  var offenders = res.data.offenders

  offenders.map(offense => {
    $('.offender-list').append(`
      <li class='offender-list-item'>
        <div>${offense.offender.name}</div> <div>${offense.offender.offense}</div>
        <div>${offense.offender.date}</div>
      </li>
      `)
    })
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
