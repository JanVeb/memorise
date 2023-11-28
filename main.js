import { getItem } from "./src/comp/localforage.js";
import "./style.css";
import "./css/listMenu.css";

const pattern4Count = /[a-zA-Z0-9]+/;
let splitText;
let trackHiddenWords = [];
let numWordToHide = 0;

const textToHide = document.querySelector("#textToHide");
const nextButton = document.getElementById("nextButton");

getItem("textArray").then(function (value) {
  textManip(value[Object.keys(value)[0]]);
});

document.getElementById("nextButton").addEventListener("click", next);

function next() {
  const indexOfWordsToHide = randomWordsToHide(indexOfWords(splitText));
  let newText = "";
  let i = 0;
  let deleteWordsCheck = 0;

  while (i < splitText.length) {
    if (indexOfWordsToHide[deleteWordsCheck] !== i) {
      newText += splitText[i];
    } else {
      const span = document.createElement("span");
      const key = `word-${i}`;
      span.classList.add("hidden-word");
      span.setAttribute("data-key", key);
      span.textContent = replaceWithHyphen(splitText[i]);
      newText += span.outerHTML;
      deleteWordsCheck++;
    }
    i++;
  }

  textToHide.innerHTML = newText;

  // Show word on mouse over
  showWordOnMouseOver();
}

function showWordOnMouseOver() {
  const hiddenWords = document.getElementsByClassName("hidden-word");
  const wordsArray = Array.from(hiddenWords);

  wordsArray.forEach((word) => {
    const key = word.getAttribute("data-key");
    const wordIndex = parseInt(key.split("-")[1]);
    const originalWord = splitText[wordIndex];
    const replaceWordWithHyphen = () => {
      word.textContent = replaceWithHyphen(originalWord);
    };

    word.addEventListener("mouseover", () => {
      word.removeEventListener("mouseleave", replaceWordWithHyphen);
      word.textContent = originalWord;
    });

    word.addEventListener("mouseleave", () => {
      word.textContent = replaceWithHyphen(originalWord);
    });
  });
}

function randomWordsToHide(indexOfWords) {
  const uniqueArray = indexOfWords.filter(
    (value) => !trackHiddenWords.includes(value)
  );
  uniqueArray.sort((a, b) => a - b);

  for (let i = uniqueArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueArray[i], uniqueArray[j]] = [uniqueArray[j], uniqueArray[i]];
  }

  trackHiddenWords = [
    ...uniqueArray.slice(0, numWordToHide),
    ...trackHiddenWords,
  ];

  trackHiddenWords.sort((a, b) => a - b);
  return trackHiddenWords;
}

function indexOfWords(textArr) {
  return textArr.reduce((indexes, word, index) => {
    if (pattern4Count.test(word)) {
      indexes.push(index);
    }
    return indexes;
  }, []);
}

function replaceWithHyphen(string) {
  return string.replace(/./g, "_");
}

function splitString(string) {
  const pattern = /(\w+['’]\w+|\w+|\s+|[^\w\s])/g; // Updated pattern
  const result = string.split(pattern);
  return result.filter((item) => item !== "");
}

function countWords(array) {
  return array.reduce((count, word) => {
    if (pattern4Count.test(word)) {
      count++;
    }
    return count;
  }, 0);
}

export function textManip(text) {
  trackHiddenWords = [];
  numWordToHide = Math.round(countWords(splitString(text)) * 0.1);
  splitText = splitString(text);

  // nextButton.removeEventListener("click", next); // Remove previous event listener
  // nextButton.addEventListener("click", next);
  textToHide.textContent = text;

  // Initial call to showWordOnMouseOver
  showWordOnMouseOver();
}
