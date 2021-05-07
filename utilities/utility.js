var moment = require("moment-timezone");

const utilities = {
   todayTimeStamp : Math.round(new Date().getTime() / 1000),
   getUnit : (value = "") => {
    return value.split(" ")[1];
  },
  
   getOffSet: (value = "") => {
    return (
      "GMT" + moment(new Date()).tz(`${value}`, true).format("Z").split(":")[0]
    );
  },
  truncateCountry:(country='')=>{
    return country?.toString().split(', ').slice(-1).join()
  }
}


module.exports = utilities;