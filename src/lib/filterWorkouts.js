export default (workouts) => {
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

export const filterRuns = (workouts) => {
  workouts = workouts.filter((workout) => {
    return workout.category === 2;
  });

  return workouts
};
