// Header's Button and Navigational Links
const hamButton = document.querySelector("#hamButton");
const navigation = document.querySelector(".navigation");
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


hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("show");
    navigation.classList.toggle("show");
});

currentYear.innerHTML = new Date().getFullYear();
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json()

    displayCompanies(data.companies)
}
getCompanyData()

const displayCompanies = (companies) => {
    companies.forEach((company) => {
        let card = document.createElement("section");
        card.classList.add("courseCard");
        let portrait = document.createElement("img");
        let company_name = document.createElement("h3");
        let tagline = document.createElement("span")
        let company_address = document.createElement("p");
        let company_phone = document.createElement("p");
        let company_website = document.createElement("a");
        let membership_level = document.createElement("p");

        // Images
        portrait.setAttribute("src", company.image_file);
        portrait.setAttribute("alt", `${company.company_name}`);
        portrait.setAttribute("loading", "lazy");

        // Text Fields
        company_name.textContent = company.company_name;
        tagline.textContent = company.other_info.description;
        company_address.textContent = company.company_address;
        company_phone.textContent = company.company_phone;

        // Website Link
        company_website.href = company.company_website;
        company_website.target = "_blank";
        company_website.rel = "noopener noreferrer";
        company_website.textContent = company.company_website;

        // Membership
        membership_level.textContent = `Membership Level: ${company.membership_level}`;

        // Append everything 
        card.appendChild(portrait);
        card.appendChild(company_name);
        card.appendChild(tagline);
        card.appendChild(company_address);
        card.appendChild(company_phone);
        card.appendChild(company_website);
        card.appendChild(membership_level);


        cards.appendChild(card);
    });
};

gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
})

listButton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
})