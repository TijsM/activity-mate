const getLastWorkouts = (data, amount) => {
  const orderedWorkouts = data.sort((a, b) => {
    const dateA = a.startdate;
    const dateB = b.startdate;

    let comparison = 0;
    if (dateA < dateB) {
      comparison = 1;
    } else if (dateA > dateB) {
      comparison = -1;
    }
    return comparison;
  });



  const sliced = orderedWorkouts.slice(0, amount)


  return sliced
};

export default getLastWorkouts
