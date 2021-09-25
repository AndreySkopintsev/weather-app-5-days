let coords

async function weatherFetch(city='moscow'){
    let info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=87dafebfeebac9eb90265653aa6e5a00`);
    let json = await info.json();
    return json;
}

async function something(coordinates){
    let info = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=$'metric'&appid=20f7632ffc2c022654e4093c6947b4f4`)
    let json = await info.json()
    return json
}

weatherFetch('london').then(res => {
    coords = res.coord
    something(coords).then(res => {
        let item
        let most
        for(let key in res.daily){
            item = res.daily[0]
            most = Number(res.daily[0].sunset - res.daily[0].sunrise)
            let sunsetTime = res.daily[key].sunset
            let sunriseTime = res.daily[key].sunrise
            if((sunsetTime - sunriseTime) > most){
                most = res.daily[key].sunset - res.daily[key].sunrise
                item = res.daily[key]
            }
            console.log(`Date ${(new Date(res.daily[key].dt*1000)).toDateString()} ${res.daily[key].sunset - res.daily[key].sunrise}`)
            
        }
        console.log(`Longest daylight is ${Math.ceil(most/3600)} hours on ${(new Date(item.dt*1000)).toDateString()}`) 
    })
    
})