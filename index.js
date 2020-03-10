const readline = require('readline')
const moment = require('moment')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const initRead = (actualMessage) => {
  rl.question((actualMessage || '') + 'Insert the plate number in the format AAA-9999 or AAA-999 >', readPlate)
}

const isValidPlate = (plateValue) => {
  return /^[A-Za-z]{3}[\-][0-9]{3,4}$/.test(plateValue)
}

const readPlate = (plateValue) => {
  if (!isValidPlate(plateValue)) {
    initRead('Try again. ')
    return
  }

  initDate('', {plateText: plateValue})
}

const initDate = (actualMessage, carData) => {
  rl.question((actualMessage || '') + 'Insert the date in the format YYYY/MM/DD >', (answer) => {readDate(answer, carData)})
}

const readDate = (dateValue, carData) => {
  const myDate = moment(dateValue, 'YYYY/MM/DD', true)

  if (!myDate.isValid()) {
    initDate('Try again. ', carData)
    return
  }

  carData.dateValue = myDate
  initTime('', carData)
}

const initTime = (actualMessage, carData) => {
  rl.question((actualMessage || '') + 'Insert the time in the format HH:MM >', (answer) => {readTime(answer, carData)})
}

const readTime = (timeValue, carData) => {
  const oldDate = carData.dateValue.format('YYYY/MM/DD')
  const myDate = moment(`${oldDate} ${timeValue}`, 'YYYY/MM/DD HH:mm', true)

  if (!myDate.isValid()) {
    initTime('Try again. ', carData)
    return
  }

  carData.dateValue = myDate
  console.log(carData)
  rl.close()
}

initRead('')
