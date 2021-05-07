# gozem-dev-test


Api to return the country, timezone, etc.. between two geolocation 



## dependencies

node 6.3.x or later

## developing

run the app:

```bash
npm run dev
```

the app runs on `localhost:3000`

## production

_you'll like change api key and launch app, so make sure you set the env var to connect to it._

```bash
npm start

```


## Instructions
_Les requetes post sont envoyees au format ci-dessous_

```
{
    url: "<baseurl| localhost:3000 >/api/get_distance_and_time",
    type: "POST",
    format_de_la_requete: {
      start: {
        lat: "latitude",
        lng: "longitude",
      },
      end: {
        lat: "latitude",
        lng: "longitude",
      },
      units: "metric",
    },
  }

```

--------------------------------------------------------------------------------
