$(document).ready(function() {
  axios.get('/api/offenders')
   .then((res) => {
     console.log(res)
   })
   .catch((err) => {
     console.error(err)
   })
})
