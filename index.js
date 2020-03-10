const readline = require('readline')
const moment = require('moment')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const HasProhibition = (plateText, dateValue) => {
  const lastCharacter = parseInt(plateText.slice(-1))
  const dayIndex = dateValue.day()
  const dayStart = dateValue.clone().startOf('day')

  const firstPeriodStart = dayStart.clone().add(7, 'hours')
  const firstPeriodEnd = dayStart.clone().add(9, 'hours').add(30, 'minutes')
  const secondPeriodStart = dayStart.clone().add(16, 'hours')
  const secondPeriodEnd = dayStart.clone().add(19, 'hours').add(30, 'minutes')

  const prohibitedTime = firstPeriodStart < dateValue && dateValue < firstPeriodEnd ||
    secondPeriodStart < dateValue && dateValue < secondPeriodEnd

  switch (lastCharacter) {
    case 1:
    case 2:
      return dayIndex === 1 && prohibitedTime
    case 3:
    case 4:
      return dayIndex === 2 && prohibitedTime
    case 5:
    case 6:
      return dayIndex === 3 && prohibitedTime
    case 7:
    case 8:
      return dayIndex === 4 && prohibitedTime
    case 9:
    case 0:
      return dayIndex === 5 && prohibitedTime
  }
}

const initReadPlate = (actualMessage) => {
  rl.question((actualMessage || '') + 'Insert the plate number in the format AAA-9999 or AAA-999 >', readPlate)
}

const isValidPlate = (plateValue) => {
  return /^[A-Za-z]{3}[-][0-9]{3,4}$/.test(plateValue)
}

const readPlate = (plateValue) => {
  if (!isValidPlate(plateValue)) {
    initReadPlate('Try again. ')
    return
  }

  const carData = { plateText: plateValue }
  initDateRead('', carData)
}

const initDateRead = (actualMessage, carData) => {
  rl.question((actualMessage || '') + 'Insert the date in the slash format YYYY/MM/DD >', (answer) => { readDate(answer, carData) })
}

const readDate = (dateValue, carData) => {
  const myDate = moment(dateValue, 'YYYY/MM/DD', true)

  if (!myDate.isValid()) {
    initDateRead('Try again. ', carData)
    return
  }

  carData.dateValue = myDate
  initTimeRead('', carData)
}

const initTimeRead = (actualMessage, carData) => {
  rl.question((actualMessage || '') + 'Insert the time in the format HH:MM >', (answer) => { readTime(answer, carData) })
}

const readTime = (timeValue, carData) => {
  const oldDate = carData.dateValue.format('YYYY/MM/DD')
  const myDate = moment(`${oldDate} ${timeValue}`, 'YYYY/MM/DD HH:mm', true)

  if (!myDate.isValid()) {
    initTimeRead('Try again. ', carData)
    return
  }

  carData.dateValue = myDate
  console.log('>>>>>>>>>>> ' + (HasProhibition(carData.plateText, carData.dateValue) ?
    'Cannot be on road.' : 'Can be on road.'))
  rl.close()
}

initReadPlate('')