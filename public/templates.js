offendersTemplate = (offense) => {
  $('.offender-list-item').append(`
    <p id=${offense.id} class='name'>${offense.offender.name}</p>
    <div>${offense.offender.offense}</div>
    <div>${offense.offender.date}</div>
    <div>Forgiven: ${offense.offender.forgiven}</div>
  `)
}

countTemplate = (countedOffenders) => {
  $('.count').append(`
    <div>${countedOffenders.totalOffenders} total offenders</div>
    <div>${countedOffenders.totalUnforgiven} total unforgiven offenders</div>
    <div>${countedOffenders.totalForgiven} total forgiven offenders</div>
  `)
}

singleOffenderTemplate = (offender, id) => {
  $('.offender-list-item').append(`
    <p id=${offender.id} class='name'>${offender.name}</p>
    <div>${offender.offense}</div>
    <div>${offender.date}</div>
    <button class='forgive' id=${id}>${offender.forgiven}</button>
  `)
}

if(typeof module !== 'undefined') {
  module.exports = {
    offendersTemplate,
    countTemplate,
    singleOffenderTemplate
  }
}
