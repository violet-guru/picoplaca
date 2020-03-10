// Victor Hugo Lafuente Cevallos

const moment = require('moment')
const pico = require('./HasPico')

it('uses an available datetime for the car.', () => {
  // Arrange
  const expected = false

  // Act
  const result = pico.HasProhibition('aaa-997', moment('2020-03-10 08:00'))

  // Assert
  expect(result).toBe(expected)
})

it('uses an available datetime for the car at night.', () => {
  // Arrange
  const expected = false

  // Act
  const result = pico.HasProhibition('aaa-990', moment('2020-03-10 22:00'))

  // Assert
  expect(result).toBe(expected)
})

it('uses a prohibited datetime for the car.', () => {
  // Arrange
  const expected = true

  // Act
  const result = pico.HasProhibition('aaa-999', moment('2020-03-13 19:00'))

  // Assert
  expect(result).toBe(expected)
})

it('uses an available datetime for the car in pico and placa day, but lunchtime.', () => {
  // Arrange
  const expected = false

  // Act
  const result = pico.HasProhibition('aaa-998', moment('2020-03-12 13:00'))

  // Assert
  expect(result).toBe(expected)
})

it('checks a valid plate number.', () => {
  // Arrange
  const expected = true

  // Act
  const result = pico.IsValidPlate('PBC-998')

  // Assert
  expect(result).toBe(expected)
})

it('checks a non valid car plate number.', () => {
  // Arrange
  const expected = false

  // Act
  const result = pico.IsValidPlate('PBC998')

  // Assert
  expect(result).toBe(expected)
})
