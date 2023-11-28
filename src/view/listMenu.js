import { getItem, setItem } from "../comp/localforage.js";
import { textManip } from "../../main.js";
import { createListMenu } from "../comp/listMenuItems.js";

export function openNav() {
  document.getElementById("mySidenav").style.width = "50vw";
  //   document.getElementById("app").style.marginLeft = "250px";
}

export function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("app").style.marginLeft = "0";
}

export function addNewText() {
  document.getElementById("addNewTextWindow").style.display = "block";
}

export function saveNewTextClose() {
  const newItem = document.getElementById("inputNewText").value;
  const newItemTitle = document.getElementById("inputNewTitle").value;
  getItem("textArray").then(function (value) {
    value[newItemTitle] = newItem;
    setItem("textArray", value).then(function () {});
    createListMenu(value);
    document.getElementById("inputNewText").value = "";
    document.getElementById("inputNewTitle").value = "";
  });

  //   setItem("textArray", text).then(function () {});
  document.getElementById("addNewTextWindow").style.display = "none";
}

export function closeAddNewTextWindow() {
  document.getElementById("addNewTextWindow").style.display = "none";
}
