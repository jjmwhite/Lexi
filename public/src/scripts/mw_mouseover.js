const logo = document.getElementById('mw-logo')

logo.addEventListener("mouseover", (e) => {
  e.target.src = "src/assets/images/MWLogo.png"
})

logo.addEventListener("mouseout", (e) => {
  e.target.src = "src/assets/images/MWLogo_clear_dark.png"
})