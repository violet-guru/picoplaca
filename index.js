const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const carData = {}

const initRead = (actualMessage) => {
  rl.question((actualMessage || '') + 'Insert the plate number (AAA-9999 or AAA-999):', readPlate)
}

const isValidPlate = (plateValue) => {
  return /^[A-Za-z]{3}[\-][0-9]{3,4}$/.test(plateValue)
}

const readPlate = (plateValue, actualMessage) => {
  if (!isValidPlate(plateValue)) {
    initRead('Try again. ')
    return
  }

  carData.plateText = plateValue
  initDate('')
}

const initDate = (actualMessage) => {
  rl.question((actualMessage || '') + 'Insert the date (YYYY/MM/DD):', readDate)
}

const readDate = (dateValue, actualMessage) => {
  const myDate = moment(dateValue)

  if (!myDate.isValid()) {
    initDate('Try again. ')
    return
  }

initTime('')
}

const initTime = (actualMessage) => {
  rl.question((actualMessage || '') + 'Insert the time (HH:MM):', readTime)
}

const readTime = (timeValue) => {
  rl.close()
}

initRead('')
