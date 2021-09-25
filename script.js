const slide = document.getElementById('slide');
const info = document.getElementById('info');
const searchBar = document.getElementById('input');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const humid = document.getElementById('humid');
const list = document.getElementById('list');

function Weather(jsonFile) {
    this.name = jsonFile.name;
    this.temp = jsonFile.main.temp;
    this.wind = jsonFile.wind.speed;
    this.humid = jsonFile.main.humidity;
    this.image = jsonFile.weather[0].icon;
    this.description = jsonFile.weather[0].description;
}

weatherFetch('moscow')
    .then(res => {
        console.log(res);
        object = new Weather(res);
        console.log(object);
        populateInfo(object);
        let myUrl = `https://source.unsplash.com/1600x900/?${object.name}`;
        document.body.style.background = `url("${myUrl}")`;
})

slide.addEventListener('click',()=>{
    let searchInfo = searchBar.value;
    let object;
    let condition;
    weatherFetch(searchInfo)
    .then(res => {
        console.log(res);
        object = new Weather(res);
        console.log(object);
        populateInfo(object);
    })
    searchBar.value = '';
})

async function weatherFetch(city='moscow'){
    let info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=87dafebfeebac9eb90265653aa6e5a00`);
    let json = await info.json();
    return json;
}

function populateInfo(object){
    info.innerHTML = `
        <h2>Weather in ${object.name} today: </h2>
        <img src="http://openweathermap.org/img/wn/${object.image}@2x.png">
        <p>${object.description}</p>
        <ul id="list" class="visible">
            <li><i class="fas fa-temperature-high fa-lg"></i><span id="temp">${object.temp} °</span></li>
            <li><i class="fas fa-wind fa-lg"></i><span id="wind">${object.wind} km/h</span></li>
            <li><i class="fas fa-tint fa-lg"></i><span id="humid">${object.humid} %</span></li>
        </ul>
    `;
    let myUrl = `https://source.unsplash.com/1600x900/?${object.name}`;
    document.body.style.background = `url("${myUrl}")`;
}

