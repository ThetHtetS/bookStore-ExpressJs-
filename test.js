const jwt = require('jsonwebtoken');

//const result = jwt.sign({ id: '1231' }, '12345');
//console.log(result);

const verify = jwt.verify(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzEiLCJpYXQiOjE3MDYwMDk3Mzl9.Z36SF2ISjnJIG25yuI53n0Y7uFqG44hF8WbHOWUlfwk',
  '12345'
);

console.log(verify);
