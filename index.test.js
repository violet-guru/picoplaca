const moment = require('moment')
const pico = require('./HasPico')

it('uses an available datetime for the car.', () => {
  //Arrange
  let expected = false;

  //Act
  let result = pico.HasProhibition('aaa-999', moment('2020-03-10 08:00'))

  //Assert
  expect(result).toBe(expected);
})

it('uses a prohibited datetime for the car.', () => {
  //Arrange
  let expected = true;

  //Act
  let result = pico.HasProhibition('aaa-999', moment('2020-03-13 19:00'))

  //Assert
  expect(result).toBe(expected);
})