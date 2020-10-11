const getAverage = (numbers) => {
  let sum = 0;

  numbers.filter(Boolean).forEach((number) => {
    sum += number;
  });

  return sum / numbers.length;
};

export default getAverage;
