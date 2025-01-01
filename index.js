import  express, { response } from "express";
import bodyParser from 'body-parser';
import axios, {Axios} from 'axios';


const app  = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var lat;
var lon;
const apikey = "aba6ff9d6de967d5eac6fd79114693cc";
const units = "metric"; 
// default data
var data = {
    coord: { lon: 80.2705, lat: 13.0843 },
    weather: [ [Object] ],
    base: 'stations',
    main: {
      temp: 29.09,
      feels_like: 33.51,
      temp_min: 28.35,
      temp_max: 30.15,
      pressure: 1015,
      humidity: 73,
      sea_level: 1015,
      grnd_level: 1014
    },
    visibility: 3500,
    wind: { speed: 4.12, deg: 70 },
    clouds: { all: 40 },
    dt: 1735711009,
    sys: {
      type: 2,
      id: 2093220,
      country: 'IN',
      sunrise: 1735693272,
      sunset: 1735734199
    },
    timezone: 19800,
    id: 1465730,
    name: 'Park Town',
    cod: 200
  }

var sunrise,sunset,windSpeed,curLocation;

async function getlatandlan(location) {
  try {
    const respone = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apikey}`);
    lat = respone.data[0].lat;
    lon = respone.data[0].lon;
  } catch (error) {
    console.log("error in getting the lat and lan");
  }
}

async function  getData(location) {
  curLocation = location || "Chennai";
  await getlatandlan(curLocation);
  const respone  = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=${units}`);
  data = respone.data;
  sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  windSpeed = Math.floor(data.wind.speed);
}

app.get("/",async (req,res)=>{
    try {
        await getData();
        res.render("index.ejs",{data:data,
          location: curLocation,
            sunrise: sunrise,
            sunset: sunset,
            windSpeed :windSpeed
        });
    } catch (error) {
        res.send("error");
    }
});

app.post("/",async (req,res)=>{
  curLocation = req.body.location;
  await getData(curLocation);
  res.render("index.ejs",{data:data,
    location: curLocation,
      sunrise: sunrise,
      sunset: sunset,
      windSpeed :windSpeed
  });
})



app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
})