$(document).ready(() => {
  getOffendersList()
})

getOffendersList = () => {
  axios.get('/api/offenders')
  .then((res) => {
    const { offenders } = res.data
    displayOffenders(offenders)
    const countedOffenders = countOffenders(offenders)
    countTemplate(countedOffenders)
  })
  .catch((err) => {
    console.error(err)
  })
}

displayOffenders = (offenders) => {
  $('.offender-list-item').html('')

  offenders.map((offense) => {
    offendersTemplate(offense)
  })
}

clearValues = () => {
  $('.offender-list-item').html('')
  $('.count').html('')
  $('.offense').val('')
  $('.name-input').val('')
}

$('.save-offender-btn').on('click', (e) => {
  e.preventDefault()

  axios.post('/api/offenders', {
      name: $('.name-input').val(),
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

sortOffenderNameList = () => {
  axios.get('/api/offenders')
  .then((res) => {
    const { offenders } = res.data
    const sortedByName = sortByName(offenders)
    displayOffenders(sortedByName)
  })
  .catch((err) => {
    console.error(err)
  })
}

sortOffenderDateList = () => {
  axios.get('/api/offenders')
  .then((res) => {
    const { offenders } = res.data
    const sortedByDate = sortByDate(offenders)
    displayOffenders(sortedByDate)
  })
  .catch((err) => {
    console.error(err)
  })
}

$('.offender-list-item').on('click', '.name', (e) => {
  const { id } = e.target

  axios.get(`/api/offenders/${id}`)
  .then((res) => {
    displayOffender(res)
  })
  .catch((err) => {
    console.error(err)
  })
})

displayOffender = (res) => {
  $('.offender-list-item').html('')

  const { id } = res.data
  const { offender } = res.data.offender

  let unforgive
  let forgive
  if(offender.forgiven) {
    offender.forgiven = 'unforgive'
  }else{
    offender.forgiven = 'forgive'
  }
  singleOffenderTemplate(offender, id)
}

$('.offender-list-item').on('click', '.forgive', (e) => {
  const { id } = e.target

  axios.patch(`/api/offenders/${id}`)
  .then((res) => {
    clearValues()
    getOffendersList()
  })
  .catch((err) => {
    console.error(err)
  })
})
