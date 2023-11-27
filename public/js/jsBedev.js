const passwordInput = document.querySelector("#senhaUser")
const eye = document.querySelector("#eye")
const menuContent = document.getElementById("menu_content");

let isLogged = false;

eye.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash")
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)
  })

function Menu() {
  menuContent.style.display = (menuContent.style.display === "block") ? "none" : "block";
}