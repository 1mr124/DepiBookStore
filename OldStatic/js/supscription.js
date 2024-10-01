const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// ==============================================

var feild = document.querySelector("textarea");
var backUp = feild.getAttribute("placeholder");
var btn = document.querySelector(".btn");
var clear = document.getElementById("clear");

feild.onfocus = function () {
  this.setAttribute("placeholder", "");
  this.style.borderColor = "#333";
  btn.style.display = "block";
};

feild.onblur = function () {
  this.setAttribute("placeholder", backUp);
  this.style.borderColor = "#aaa";
};

clear.onclick = function () {
  btn.style.display = "none";
  feild.value = "";
};

// =============================
function emoji(emoji) {
  document.getElementById("input-filed").value += document.getElementById(emoji).innerHTML;
}
