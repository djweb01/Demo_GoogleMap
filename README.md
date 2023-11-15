## Discription

A web page demo based on Google Maps APIs. The functions include:

1. Acquire my current location 

2. Search for a new location

3. Display the location on Google maps with a marker demonstrate

4. Display the time zone and local time

6. List up all searching results with a pagination to allow 10 records maximum on each page

6. Delete all selected records from the list

## Google Maps AIP key Requirement
1. Please confirm these API services are enabled with your valid Google_Maps_AIP_key.
   
   #### Maps JavaScript API
   #### Geocoding API
   #### Time Zone API
2. Please make sure that the location access is allowed in your browser.
   
3. Please enter your Google_Maps_AIP_key on the front page or save it in the App.vue file at
``` bash
newLocationInfo:{
  ...
  key:"&key=Google_Maps_AIP_key",
  ...
  }
```
## Modification Options
1. Change the Maximum Number of Records in Each Page
``` bash
const MaxNumRecords = 10
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## The Front Page View


## Dependencies Version Info
"vue": "^2.5.11",

"@googlemaps/js-api-loader": "^1.16.2",

"axios": "^1.2.1",

"bootstrap": "^5.3.2",

"nanoid": "^5.0.3",

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
