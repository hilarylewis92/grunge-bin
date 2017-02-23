$('.save-offender-btn').on('click', (e) => {
  e.preventDefault()

  axios.post('/api/offenders', {
      name: $('.name').val(),
      offense: $('.offense').val(),
      forgiven: false,
      date: Date.now()
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
})
