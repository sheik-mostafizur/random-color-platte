window.onload = function () {
  generateColorPlatte();
};

const how_items = document.querySelector(".how_items input");
const how_itemsDefault = document.querySelector(".how_items span");
const color_platte_area = document.querySelector(".color_platte_area");
const generate_colors = document.getElementById("generate_colors");

let colorItem = 21;
colorItem = getColorItems();

setColorItems(colorItem);
// how many items show
how_items.value = getColorItems();
how_items.addEventListener("keyup", function (e) {
  colorItem = +e.target.value;
  setColorItems(colorItem);
  e.target.value = getColorItems();
});
// reset color show items
how_itemsDefault.addEventListener("click", function () {
  colorItem = 21;
  setColorItems(colorItem);
  how_items.value = colorItem;
  generateColorPlatte();
});
// save setItems time
function setColorItems(v) {
  localStorage.setItem("items", JSON.stringify(v));
}
function getColorItems() {
  return localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : "";
}

function item(color) {
  // crate color platte
  const element = document.createElement("div");
  element.classList.add("color_platte");

  // create color div
  const colorElement = document.createElement("div");
  colorElement.classList.add("color");
  colorElement.style.backgroundColor = color;

  // crate color code h3
  const h3 = document.createElement("h3");
  h3.innerText = color;

  // copyToClippedBoard event connected
  colorElement.addEventListener("click", copyHexColorCode(h3, color));

  // connect all elements
  element.appendChild(colorElement);
  element.appendChild(h3);
  return element;
}

// copyToClippedBoard

function copyHexColorCode(el, colorCode) {
  return function () {
    navigator.clipboard
      .writeText(colorCode)
      .then(() => {
        el.innerText = "Copied";
        setTimeout(() => (el.innerText = colorCode), 1000);
      })
      .catch(() => alert("Failed to copy."));
  };
}

function generateColorPlatte() {
  color_platte_area.innerHTML = "";
  for (let i = 1; i <= colorItem; i++) {
    const randomColor = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .toUpperCase()}`;

    color_platte_area.appendChild(item(randomColor));
  }
}

generate_colors.addEventListener("click", generateColorPlatte);
