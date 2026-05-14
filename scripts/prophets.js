const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";

const cards = document.querySelector("#cards");


async function getProphetData() {
    const response = await fetch("https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json");
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
}
getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement("section");
        let fullname = document.createElement("h2");
        let portrait = document.createElement("img");
        let birthDate = document.createElement("p");
        let birthPlace = document.createElement("p");

        fullname.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `${prophet.birthdate}`;
        birthPlace.textContent = `${prophet.birthplace}`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "300");
        portrait.setAttribute("height", "400");
            
        card.appendChild(fullname);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait)
        
        cards.appendChild(card);
    });
}