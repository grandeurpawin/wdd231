// Header's Button and Navigational Links
const hamButton = document.querySelector("#hamButton");
const navBar = document.querySelector("#navBar");

// Footer's Year and Last Modification
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

// Getting data from members.json
const url = "data/members.json";
const cards = document.querySelector("#cards");

// Buttons for grid and list
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#cards");

// Current weather description
const weatherIcon = document.querySelector("#weatherIcon");
const weatherInfo = document.querySelector("#weatherInfo");
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=7.062863975872205&lon=125.58749943948169&units=imperial&appid=8f43d38c43b9deadd688e86c587a83aa";

// Weather forecast for three days
const weatherForecast = document.querySelector("#weatherForecast");
const weatherForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=7.062863975872205&lon=125.58749943948169&units=imperial&appid=8f43d38c43b9deadd688e86c587a83aa";

// Spotlight cards
const spotlightCards = document.querySelector("#spotlightCards");


// Current Weather Description
async function getCurrentWeather() {
    if (!weatherInfo || !weatherIcon) return; // skip if not on this page
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    weatherInfo.innerHTML = `
        <p>${data.name}</p>
        <p>${data.main.temp}&deg;F</p>
        <p>${desc}</p>
        <p>High: ${data.main.temp_max}&deg;F</p>
        <p>Low: ${data.main.temp_min}&deg;F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>`;
}

async function getWeatherForecast() {
    if (!weatherForecast) return; // skip if not on this page
    try {
        const response = await fetch(weatherForecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeatherForecast(data);
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeatherForecast(data) {
    const forecastsByDay = {};
    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!forecastsByDay[date]) forecastsByDay[date] = [];
        forecastsByDay[date].push(item);
    });

    const dates = Object.keys(forecastsByDay).slice(0, 3);
    weatherForecast.innerHTML = "";

    dates.forEach((date, index) => {
        const dayData = forecastsByDay[date];
        const mainTemp = dayData[0].main.temp.toFixed(1);

        let label = index === 0 ? "Today" : new Date(date).toLocaleDateString("en-US", { weekday: "long" });

        weatherForecast.innerHTML += `
            <div class="forecastCard">
                <p>${label}: <strong>${mainTemp}&deg;F</strong></p>
            </div>`;
    });
}

getCurrentWeather();
getWeatherForecast();


// Hamburger Button
if (hamButton && navBar) {
    hamButton.addEventListener("click", () => {
        hamButton.classList.toggle("show");
        navBar.classList.toggle("show");
    });
}

// Date
if (currentYear) currentYear.innerHTML = new Date().getFullYear();
if (lastModified) lastModified.innerHTML = `Last Modification: ${document.lastModified}`;


// Get Company Data
async function getCompanyData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (cards) displayCompanies(data.companies);
        if (spotlightCards) displaySpotlightCards(data.companies);
    } catch (error) {
        console.log(error);
    }
}
getCompanyData();

const displayCompanies = (companies) => {
    if (!cards) return;
    companies.forEach((company) => {
        let card = document.createElement("section");
        card.classList.add("courseCard");

        let portrait = document.createElement("img");
        portrait.setAttribute("src", company.image_file);
        portrait.setAttribute("alt", company.company_name);
        portrait.setAttribute("loading", "lazy");

        let company_name = document.createElement("h2");
        company_name.textContent = company.company_name;

        let tagline = document.createElement("span");
        tagline.textContent = company.other_info.description;

        let company_address = document.createElement("p");
        company_address.textContent = company.company_address;

        let company_phone = document.createElement("p");
        company_phone.textContent = company.company_phone;

        let company_website = document.createElement("a");
        company_website.href = company.company_website;
        company_website.target = "_blank";
        company_website.rel = "noopener noreferrer";
        company_website.textContent = company.company_website;

        let membership_level = document.createElement("p");
        membership_level.textContent = `Membership Level: ${company.membership_level}`;

        card.append(portrait, company_name, tagline, company_address, company_phone, company_website, membership_level);
        cards.appendChild(card);
    });
};

const displaySpotlightCards = (companies) => {
    if (!spotlightCards) return;

    const spotlightCompanies = companies.filter(c =>
        c.membership_level === "Gold" || c.membership_level === "Silver"
    );

    const shuffled = spotlightCompanies.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

    spotlightCards.innerHTML = "";

    selected.forEach((company) => {
        let spotlightCard = document.createElement("section");
        spotlightCard.classList.add("spotlightBusinessCard");

        let portrait = document.createElement("img");
        portrait.setAttribute("src", company.image_file);
        portrait.setAttribute("alt", company.company_name);
        portrait.setAttribute("loading", "lazy");

        let company_name = document.createElement("h3");
        company_name.textContent = company.company_name;

        let tagline = document.createElement("span");
        tagline.textContent = company.other_info.description;

        let company_address = document.createElement("p");
        company_address.textContent = company.company_address;

        let company_phone = document.createElement("p");
        company_phone.textContent = company.company_phone;

        let company_website = document.createElement("a");
        company_website.href = company.company_website;
        company_website.target = "_blank";
        company_website.rel = "noopener noreferrer";
        company_website.textContent = company.company_website;

        let membership_level = document.createElement("p");
        membership_level.textContent = `Membership Level: ${company.membership_level}`;

        spotlightCard.append(portrait, company_name, tagline, company_address, company_phone, company_website, membership_level);
        spotlightCards.appendChild(spotlightCard);
    });
};

// Grid/List toggle only if buttons exist
if (gridButton && listButton && display) {
    gridButton.addEventListener("click", () => {
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listButton.addEventListener("click", () => {
        display.classList.add("list");
        display.classList.remove("grid");
    });
}
