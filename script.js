
// Функция отвечающая за нахождение максимальной продолжительности дня. 
function longestDaylight(res) {
    let item = res.daily[0]
    let most = res.daily[0].sunset - res.daily[0].sunrise
    for(let key in res.daily){
        let sunsetTime = res.daily[key].sunset
        let sunriseTime = res.daily[key].sunrise
        if((sunsetTime - sunriseTime) > most){
            most = res.daily[key].sunset - res.daily[key].sunrise
            item = res.daily[key]
        }
    }
    return {item,most}
}

function minDifference(res) {
    let item = res.daily[0]
    let least = Math.abs(res.daily[0].feels_like.night - res.daily[0].temp.night) 
    for(let key in res.daily){
        let feelTemp = res.daily[key].feels_like.night
        let realTemp = res.daily[key].temp.night
        if(Math.abs(feelTemp - realTemp) < least){
            item = res.daily[key]
            least = Math.abs(feelTemp - realTemp)
        }
    }
    return {item,least}
}

// Функция находящая информацию по городу.
async function fetchByName(city='moscow'){
    let info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=87dafebfeebac9eb90265653aa6e5a00`);
    let json = await info.json();
    return json;
}

// Функция находящая информацию по ширине и долготе
async function fetchByCoordinates(coordinates){
    let info = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=metric&appid=87dafebfeebac9eb90265653aa6e5a00`)
    let json = await info.json()
    return json
}

fetchByName('london').then(res => {
    // находим координаты и передаем их в fetchByCoordinates
    fetchByCoordinates(res.coord).then(res => {
        // функция longestDaylight возвращает объект с датой и кол-вом часов самого длинного дня
        let daylight = longestDaylight(res)
        let minTempDif = minDifference(res)
        console.log(`Максимальная продолжительность светового дня ${Math.ceil(daylight.most/3600)} часов была в ${(new Date(daylight.item.dt*1000)).toDateString()}`) 
        console.log(`День с наименьшей разницей между "ощущаемой" и фактической температуры ночью пришелся на ${(new Date(minTempDif.item.dt*1000)).toDateString()}`)
    })
})