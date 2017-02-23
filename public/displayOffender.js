$(document).ready(() => {
  axios.get('/api/offenders')
   .then((res) => {
      var offenders = res.data.offenders
      var singleOffender = offenders.find(offense => {
        return offense
      })

     $('.offender-list-name').append(singleOffender.offender.name)
     $('.offender-list-offense').append(singleOffender.offender.offense)
     $('.offender-list-date').append(singleOffender.offender.date)
   })
   .catch((err) => {
     console.error(err)
   })
})
