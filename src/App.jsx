import { useEffect, useState } from 'react'


const apikey="9e30106ef744c6a81b75c63c84537491";

function App() {

  const [city, setCity] = useState("");
  const [weatherData,setWeather]=useState("");
  const [value,setValue]=useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [time,setTime]=useState(new Date());
  const [date,setDate]=useState(new Date());

  
  useEffect(()=>{
    setInterval(()=>{
      setTime(new Date());
    },1000)
  },[])

  useEffect(()=>{

    async function getWeather() {
      try{
        setIsLoading(true);
        const resp =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        const data=await resp.json();
        setWeather(data);
        console.log(data);
      }
      catch(err){
        console.log(err);
      }
      finally{
        setIsLoading(false);
        console.log("always executed");
      }
       }

    getWeather();

  },[city])

  const {main,wind,weather}=weatherData ? weatherData : {};

  return (
    <>
      {/* Header */}
      <div className="h-[10vh] w-full bg-[#A1E3F9] flex justify-between items-center px-4 sm:px-8 gap-2 sm:gap-4">
        <h1 className="text-[#102E50] text-[2.5vh] sm:text-[3vh] font-cursive">Weather App</h1>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-5 font-semibold text-[1.8vh] sm:text-[2vh]">
          <p>{date.toLocaleDateString()}</p>
          <p>{time.toLocaleTimeString()}</p>
        </div>
      </div>
  
      {/* Main Section */}
      <div className="min-h-[80vh] w-full flex flex-col justify-center items-center gap-8 bg-[#EFEFEF] px-4 sm:px-0 text-center">
        <h1 className="text-[3vh] sm:text-[4vh] text-[#102E50] font-cursive">
          Stay updated with the latest weather ⛅
        </h1>
  
        {/* Search Section */}
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
          <input
            className="h-[6vh] w-full sm:w-[40%] bg-[#EFEFEF] border-b border-black font-cursive pl-4 text-[2vh]"
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            placeholder="Enter city here ..."
          />
  
          <button
            className="h-[6vh] w-full sm:w-[20%] bg-[#3674B5] rounded-lg text-white text-[2vh]"
            onClick={() => setCity(value)}
          >
            Get Weather
          </button>
        </div>
  
        {/* Weather Info */}
        <div className="w-full flex justify-center">
          {isLoading && <p>Loading.....</p>}
  
          {!isLoading && weatherData.cod == "404" && (
            <p className="text-[3vh] font-cursive text-red-500">City is not found!</p>
          )}
  
          {!isLoading && weatherData && weatherData.cod < 400 && (
            <div className="w-[90vw] sm:w-[50vh] rounded-xl bg-[#A1E3F9] py-6">
              <div className="flex flex-col justify-center items-center gap-3 sm:gap-5">
                <p className="font-sans font-semibold text-[3vh] sm:text-[5vh] uppercase">{city}</p>
                <p className="font-cursive text-[6vh] sm:text-[8vh]">{main?.temp}°C</p>
                <p className="font-sans text-[2.2vh] sm:text-[3vh] capitalize">{weather[0].description}</p>
              </div>
  
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 text-[2vh]">
                <div>
                  <p className="font-sans">Min: {main?.temp_min}°C</p>
                  <p className="font-sans">Max: {main?.temp_max}°C</p>
                </div>
                <div>
                  <p className="font-sans">Feels Like: {main?.feels_like}°C</p>
                  <p className="font-sans">Wind: {wind?.speed} m/s</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* Footer */}
      <div className="h-[10vh] w-full bg-[#A1E3F9] flex justify-center items-center">
        <p className="text-[2.2vh] sm:text-[3vh] text-[#102E50] font-cursive">@2025 Weather Details</p>
      </div>
    </>
  );
  
}

export default App
