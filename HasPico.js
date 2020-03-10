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

  const prohibitedTime = (firstPeriodStart < dateValue && dateValue < firstPeriodEnd) ||
    (secondPeriodStart < dateValue && dateValue < secondPeriodEnd)

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

const InitReadPlate = (actualMessage) => {
  rl.question((actualMessage || '') + 'Insert the plate number in the format AAA-9999 or AAA-999 >', readPlate)
}

const IsValidPlate = (plateValue) => {
  return /^[A-Za-z]{3}[-][0-9]{3,4}$/.test(plateValue)
}

const readPlate = (plateValue) => {
  if (!IsValidPlate(plateValue)) {
    InitReadPlate('Try again. ')
    return
  }

  const carData = { plateText: plateValue }
  InitDateRead('', carData)
}

const InitDateRead = (actualMessage, carData) => {
  rl.question((actualMessage || '') + 'Insert the date in the slash format YYYY/MM/DD >', (answer) => { ReadDate(answer, carData) })
}

const ReadDate = (dateValue, carData) => {
  const myDate = moment(dateValue, 'YYYY/MM/DD', true)

  if (!myDate.isValid()) {
    InitDateRead('Try again. ', carData)
    return
  }

  carData.dateValue = myDate
  InitTimeRead('', carData)
}

const InitTimeRead = (actualMessage, carData) => {
  rl.question((actualMessage || '') + 'Insert the time in the format HH:MM >', (answer) => { ReadTime(answer, carData) })
}

const ReadTime = (timeValue, carData) => {
  const oldDate = carData.dateValue.format('YYYY/MM/DD')
  const myDate = moment(`${oldDate} ${timeValue}`, 'YYYY/MM/DD HH:mm', true)

  if (!myDate.isValid()) {
    InitTimeRead('Try again. ', carData)
    return
  }

  carData.dateValue = myDate
  rl.close()
  console.log('>>>>>>>>>>> ' + (HasProhibition(carData.plateText, carData.dateValue)
    ? 'Cannot be on road.' : 'Can be on road.'))
}

module.exports = {
  HasProhibition,
  InitReadPlate,
  IsValidPlate
}
