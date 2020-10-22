export default (workouts) => {
  //filter out walks shorter then 1k
  workouts = workouts.filter((workout) => {
    if (workout.category === 1 || workout.category === 6) {
      if (workout.data.calories < 200) {
        return false;
      } else {
        return true;
      }
    } else return true;
  });

  return workouts;
};
