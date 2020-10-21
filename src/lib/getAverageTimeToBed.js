import getAverage from './getAverage'

export default (sleep) => {
    return getAverage(
      sleep.map((night) => {
        const date = new Date(night.startdate * 1000);
        let minutesInDay = date.getHours() * 60 + date.getMinutes();
        // you can't go to sleep after 10 in the morning
        if (minutesInDay < 60 * 10) {
          minutesInDay = minutesInDay =
            (date.getHours() + 24) * 60 + date.getMinutes();
        }
        return minutesInDay;
      })
    );
  };