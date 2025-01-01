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



app.get("/",async (req,res)=>{

    try {
        // const respone  = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=13.0836939&lon=80.270186&appid=aba6ff9d6de967d5eac6fd79114693cc&units=metric");
        // data = respone.data;
        // console.log(respone.data);
        console.log("data inside");
        console.log(data);
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const windSpeed = Math.floor(data.wind.speed);
        res.render("index.ejs",{data:data,
            sunrise: sunrise,
            sunset: sunset,
            windSpeed :windSpeed
        });
    } catch (error) {
        console.log(error);
        res.send("error");
    }
});



app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
})