# iRail Api Node.js Wrapper

## Synopsis

This projects helps you to make HTTP requests to the irail API.


## Installation

```sh
npm install irail-node
```

```javasctipt
var iralclient = require('irail-node');
```

```javasctipt
// Public API

var client = new irailclient();

```

## iRail API

The iRail api allows anyone to query trains, stations, liveboards and connections.

iRail api datasets are accessible by developers through an HTTP REST API.


## API Index
The API is available at https://api.irail.be.


## Methods

* [stations](#stations)
* [disturbances](#disturbances)
* [liveboard](#liveboard)
* [connections](#connections)
* [vehicle](#vehicle)


### stations

**Response**

{ 
  id: '0',
      departure:
       { delay: '0',
         station: 'Liège-Guillemins',
         stationinfo: [Object],
         time: '1521085920',
         vehicle: 'BE.NMBS.IC2426',
         platform: '6',
         platforminfo: [Object],
         canceled: '0',
         departureConnection: 'http://irail.be/connections/8841004/20180315/IC2426',
         direction: [Object],
         left: '0',
         walking: '0',
         occupancy: [Object] },
      arrival:
       { delay: '0',
         station: 'Namur',
         stationinfo: [Object],
         time: '1521088980',
         vehicle: 'BE.NMBS.IC2426',
         platform: '9',
         platforminfo: [Object],
         canceled: '0',
         direction: [Object],
         arrived: '0',
         walking: '0' },
      duration: '3060',
      occupancy: { '@id': 'http://api.irail.be/terms/unknown', name: 'unknown' } 
}

**Examples**
Request:
    /api/stations
    param: 
    lang: en,fr,nl

```javasctipt
 client.stations(function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
 });

```


### disturbances

**Response**

{ 
    version: '1.1',
    timestamp: '1521241196',
    disturbance:
     [ { id: '0',
         title: 'Ath - Leuze: Collision with a road vehicle.',
         description: 'Train traffic interrupted between Ath and Leuze.Some IC trains from Kortrijk  to Sint-Niklaas  are diverted via Mons. IC trains from Brussels Airport - Zaventem  to Tournai  have Ath as their terminal station. Shuttle bus service between Ath and Tournai. Delays and cancellations are possible. Listen to the announcements in the train station. ',
         link: 'http://www.belgianrail.be/jp/sncb-nmbs-routeplanner/help.exe/en?tpl=showmap_external&tplParamHimMsgInfoGroup=trouble&messageID=26800&channelFilter=custom2,livemap,rss_line_10,twitter,custom1,timetable&',
         timestamp: '1521230603' }
       ] 
}
 
**Examples**
Request:
    /api/disturbances
    param: 
    lang: en,fr,nl
    
```javasctipt
 client.disturbances(function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
 });

```


### liveboard

**Response**

{ 
    version: '1.1',
    timestamp: '1521241528',
    station: 'Brussels-Central',
    stationinfo:
     { id: 'BE.NMBS.008813003',
       locationX: '4.356801',
       locationY: '50.845658',
       '@id': 'http://irail.be/stations/NMBS/008813003',
       name: 'Brussels-Central',
       standardname: 'Brussel-Centraal/Bruxelles-Central' },
    departures:
     { number: '50',
       departure:
        [ [Object]]
      }
}

**Examples**

Request:
    /api/liveboard
    
    param: 
    id: string (optional) Example: BE.NMBS.008892007     
    lang: string (optional) Avaible: en,fr,de,nl
    arrdep: departure, arrival 
    station :string (required) The name of the station to query. Example: Gent-Sint-Pieters 
    
```javasctipt
 client.liveboard(id,lang,station,arrdep,function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
 });

```


### connections

**Response**

{ 
    version: '1.1',
    timestamp: '1521241863',
    connection:
     [ { id: '0',
         departure: [Object],
         arrival: [Object],
         duration: '9060',
         vias: [Object],
         occupancy: [Object] 
       }
      ] 
}

**Examples**
Request:
    /api/connections

    param:  
    lang: string (optional) Avaible: en,fr,de,nl
    from:string (required) The name or id of the station of departure string (required) Example: Gent-Sint-Pieters
    to :string (required) The name or id of the destination. Example: Gent-Sint-Pieters   
    date:string (optional) Default: current date in Belgium Example: 300917 The date to query.
    timesel:string (optional)  Whether the results should show arrivals departures in the station.Default: departure Example: departure.
    typeOfTransport: string (optional)  The types of transport to include in the search Default: trains Example: trains .

   

    
```javasctipt
 client.connections(from,to,lang,date,timesel,typeOfTransport,function (data) {
  console.dir(data);
 });

```



### vehicle

**Response**

{ 
  version: '1.1',
    timestamp: '1521242220',
    vehicle: 'BE.NMBS.IC1832',
    vehicleinfo:
     { locationX: '4.421101',
       locationY: '51.2172',
       name: 'BE.NMBS.IC1832',
       shortname: 'IC1832',
       '@id': 'http://irail.be/vehicle/IC1832' },
    stops:
     { number: '8',
       stop:
        [ [Object]
        ] 
      } 
}

**Examples**

Request:
    /api/vehicle
    
    params: 
    id: string (optional) Example: BE.NMBS.008892007  
    date:string (optional) Default: current date in Belgium Example: 300917 The date to query.
    lang: string (optional) Avaible: en,fr,de,nl     
    
```javasctipt
 client.vehicle(id,lang,date,function (data) {
  console.dir(data);
 });

```


## API Reference

https://docs.irail.be/
https://github.com/iRail/hyperRail


## Contributors

Anis Haboubi

## License

See [LICENSE.txt](LICENSE.txt) for more info.