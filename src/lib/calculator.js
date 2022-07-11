module.exports.sum = (a, b) => {
  //you can use + before the number to convert it to a number

  const firstNumber = parseFloat(a);
  const secondNumber = parseFloat(b);

  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    throw new Error("Invalid input");
  }

  return firstNumber + secondNumber; // + converts to number
};
