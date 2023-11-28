import { text } from "./localforage.js";
import { textManip } from "../../main.js";
import { setItem, getItem } from "./localforage.js";

const array1 = {
  Adele: "text1",
  Agnes: "text2",
  Billy: "text3",
};

const searchInput = document.getElementById("searchInput");
const listMenu = document.getElementById("listMenu");

export function createListMenu(data) {
  listMenu.innerHTML = "";

  for (const name in data) {
    const listItem = document.createElement("li");
    listItem.textContent = name;
    listItem.dataset.text = data[name];

    const deleteButton = document.createElement("span");
    deleteButton.textContent = "  ...";
    deleteButton.classList.add("delete-button");

    deleteButton.onclick = function (event) {
      event.stopPropagation(); // Prevents the click event from propagating to the listItem
      delete data[name]; // Remove the item from the data object
      listItem.remove(); // Remove the listItem from the DOM

      getItem("textArray").then(function (value) {
        delete value[name];
        setItem("textArray", value).then(function () {});
      });
    };

    listItem.appendChild(deleteButton);

    listItem.onclick = function () {
      console.log(`Key: ${name}, Value: ${data[name]}`);
      textManip(data[name]);
    };

    listMenu.appendChild(listItem);
  }
}

function filterList() {
  const searchQuery = searchInput.value.toLowerCase();
  const listItems = listMenu.getElementsByTagName("li");
  let hasVisibleItems = false;

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    const text = listItem.textContent.toLowerCase();

    if (text.includes(searchQuery)) {
      listItem.style.display = "";
      hasVisibleItems = true;
    } else {
      listItem.style.display = "none";
    }
  }

  //   if (!hasVisibleItems) {
  //     const noResultsItem = document.createElement("li");
  //     noResultsItem.textContent = "No results found";
  //     listMenu.appendChild(noResultsItem);
  //   }
}

searchInput.addEventListener("input", filterList);
getItem("textArray").then(function (value) {
  createListMenu(value);
});
