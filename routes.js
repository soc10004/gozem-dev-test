const Router = require("express").Router;
const router = new Router();
const config = require("./config");
const axios = require("axios").default;
const utilities = require("./utilities/utility");

router
  .route("/get_distance_and_time")
  .get((req, res) => {
    res.json(config.homeInstructions);
  })
  .post(async (req, res) => {
    const startLocation = req.body.start
      ? req.body.start
      : { lat: 37.7680296, lng: -122.4375126 };
    const endLocation = req.body.end
      ? req.body?.end
      : { lat: 37.7663444, lng: -122.4412006 };
    const unit = req.body.units ? req.body.units : "metric";

    const distanceApiUrl = config.getDistanceUrl({
      start: startLocation,
      end: endLocation,
      units: unit,
    });
    const originTimeZoneUrl = config.getOriginTimeZoneUrl({
      location: startLocation,
      timeStamp: utilities.todayTimeStamp,
    });
    const destTimeZoneUrl = config.getDestTimeZone2Url({
      location: endLocation,
      timeStamp: utilities.todayTimeStamp,
    });

    try {
      const distanceResult = await axios.get(distanceApiUrl);
      const originTimeResult = await axios.get(originTimeZoneUrl);
      const destTimeResult = await axios.get(destTimeZoneUrl);

      const reFormatResult = {
        start: {
          country: utilities.truncateCountry(
            distanceResult?.data["destination_addresses"]
          ),
          timezone: utilities.getOffSet(originTimeResult?.data?.timeZoneId),
          location: startLocation,
        },
        end: {
          country: utilities.truncateCountry(
            distanceResult?.data["origin_addresses"]
          ),
          timezone: utilities.getOffSet(destTimeResult?.data?.timeZoneId),
          location: endLocation,
        },
        distance: {
          value:
            distanceResult?.data["rows"][0]["elements"][0]["distance"]["value"],
          units: utilities.getUnit(
            distanceResult?.data["rows"][0]["elements"][0]["distance"]["text"]
          ),
        },
        time_diff: {
          value:
            distanceResult?.data["rows"][0]["elements"][0]["distance"]["value"],
          units: utilities.getUnit(
            distanceResult?.data["rows"][0]["elements"][0]["distance"]["text"]
          ),
        },
      };
      res.json({ body: reFormatResult });
    } catch (error) {
      res.json({
        error: "Impossible de recuperer les informations",
        errorMessage: error.message,
      });
    }
    
  });

module.exports = router;
