const resetButton = document.getElementById('reset');

resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  d3.select('svg').remove();
})