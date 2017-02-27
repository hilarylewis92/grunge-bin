countOffenders = (offenders) => {
  let totalOffenders = offenders.length
  let totalUnforgiven = offenders.filter((offense) => {
    return offense.offender.forgiven === false
  }).length
  let totalForgiven = totalOffenders - totalUnforgiven
  
  return {totalOffenders, totalUnforgiven, totalForgiven}
}

if(typeof module !== 'undefined') {
  module.exports = {
    countOffenders
  }
}
