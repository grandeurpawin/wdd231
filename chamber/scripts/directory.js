const hamButton = document.querySelector("#hamButton");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("show");
    navigation.classList.toggle("show");
});
