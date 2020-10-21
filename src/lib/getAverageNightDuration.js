import getAverage from './getAverage'

export default (sleep) => {
    return getAverage(
      sleep.map((night) => {
        const startNight = new Date(night.startdate * 1000);
        const endNight = new Date(night.enddate * 1000);
        const nightDuration = endNight - startNight; // duration in miliseconds
        return nightDuration / (1000 * 60); // duration in minutes
      })
    );
  };