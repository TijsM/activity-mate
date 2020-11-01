const getAverage = (numbers) => {
  numbers = filterExtremeValues(numbers);
  let sum = 0;

  numbers = numbers.filter(Boolean); //remove falsy values

  numbers.forEach((number) => {
    sum += number;
  });

  return sum / numbers.length;
};

const filterExtremeValues = (numbers) => {
  if (numbers.length >= 5) {
    const removeSmallest = (arr) => {
      var min = Math.min(...arr);
      return arr.filter((e) => e !== min);
    };
    const removeBiggest = (arr) => {
      var min = Math.max(...arr);
      return arr.filter((e) => e !== min);
    };
    numbers = removeSmallest(numbers);
    numbers = removeSmallest(numbers);
    numbers = removeBiggest(numbers);
    numbers = removeBiggest(numbers);
  }

  return numbers;
};

export default getAverage;
