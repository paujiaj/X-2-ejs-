let darkModeEnabled = JSON.parse(localStorage.getItem("darkModeEnabled")) || false;

const toggleDarkMode = () => {
    darkModeEnabled = !darkModeEnabled;
    document.body.classList.toggle("dark-mode", darkModeEnabled);

    localStorage.setItem("darkModeEnabled", JSON.stringify(darkModeEnabled));
}

const darkModeButton = document.getElementById("darkmode-toggle");

darkModeButton.addEventListener("change", () => {
    toggleDarkMode();
    console.log("Dark mode button changed. New state:", darkModeEnabled);
});



document.addEventListener("DOMContentLoaded", () => {
    darkModeButton.checked = darkModeEnabled;

    document.body.classList.toggle("dark-mode", darkModeEnabled); 
});

var navLinks = document.getElementById("navLinks");
function showmenu(){
    navLinks.style.right = "0px";
}
function hidemenu(){
    navLinks.style.right = "-700px";
}