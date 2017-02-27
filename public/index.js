$(document).ready(() => {
  getOffendersList()
})

getOffendersList = () => {
  axios.get('/api/offenders')
  .then((res) => {
    const { offenders } = res.data
    displayOffenders(offenders)
    countOffenders(offenders)
  })
  .catch((err) => {
    console.error(err)
  })
}

displayOffenders = (offenders) => {
  offenders.map(offense => {
    offendersTemplate(offense)
  })
}

offendersTemplate = (offense) => {
  $('.offender-list-item').append(`
    <p id=${offense.id} class='name'>${offense.offender.name}</p>
    <div>${offense.offender.offense}</div>
    <div>${offense.offender.date}</div>
    <div>Forgiven: ${offense.offender.forgiven}</div>
  `)
}

countOffenders = (offenders) => {
  let totalOffenders = offenders.length
  let totalUnforgiven = offenders.filter(offense => {
    return offense.offender.forgiven === false
  }).length
  let totalForgiven = totalOffenders - totalUnforgiven

  countTemplate(totalOffenders, totalUnforgiven, totalForgiven)
}

countTemplate = (totalOffenders, totalUnforgiven, totalForgiven) => {
  $('.count').append(`
    <div>${totalOffenders} total offenders</div>
    <div>${totalUnforgiven} total unforgiven offenders</div>
    <div>${totalForgiven} total forgiven offenders</div>
  `)
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
    sortByName(res)
  })
  .catch((err) => {
    console.error(err)
  })
}

sortByName = (res) => {
  const {offenders} = res.data

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

sortOffenderDateList = () => {
  axios.get('/api/offenders')
  .then((res) => {
    sortByDate(res)
  })
  .catch((err) => {
    console.error(err)
  })
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

singleOffenderTemplate = (offender, id) => {
  $('.offender-list-item').append(`
    <p id=${offender.id} class='name'>${offender.name}</p>
    <div>${offender.offense}</div>
    <div>${offender.date}</div>
    <button class='forgive' id=${id}>${offender.forgiven}</button>
  `)
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
