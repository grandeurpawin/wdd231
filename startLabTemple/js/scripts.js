import {temples} from '../data/temples.js'
console.log(temples)

import {url} from '../data/temples.js'
console.log(url)

const showHere = document.querySelector("#showHere");
const myDialog = document.querySelector("#mydialog");
const title = document.querySelector("#mydialog h2");
const closeButton = document.querySelector("#mydialog button");
const info = document.querySelector("#mydialog p");

closeButton.addEventListener("click", () => {
    myDialog.close();
})

function displayItems(data) {
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement("img");
        photo.src = `${url} ${x.path}`;
        photo.alt = x.name;

        showHere.appendChild(photo);
    })
}

displayItems(temples)
