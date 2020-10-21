import getAverage from './getAverage'

export default (sleep) => {
    return getAverage(
      sleep.map((night) => {
        const deepSleepDuration = night.data.deepsleepduration;
        const startNight = new Date(night.startdate * 1000);
        const endNight = new Date(night.enddate * 1000);
        const nightDuration = (endNight - startNight) / 1000; // miliseconds --> seconds
        const relativeDeepSleep = (deepSleepDuration / nightDuration) * 100;
        return relativeDeepSleep;
      })
    );
  };