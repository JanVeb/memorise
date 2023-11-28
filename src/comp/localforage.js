import localforage from "localforage";

export let text = {
  "The Memory Maestro": `Once upon a time, in a quaint village nestled amidst rolling hills, there lived a young boy named Oliver. Oliver was a bright and curious child, but he struggled with remembering things. His forgetfulness often led to missed assignments, misplaced belongings, and disappointed teachers. Determined to find a solution, Oliver embarked on a quest to uncover the secrets of memorization.

Oliver sought the guidance of an old sage named Master Lucius, known throughout the land as the Memory Maestro. The wise Master Lucius lived atop a tall mountain, accessible only by a treacherous path. Undeterred by the challenges, Oliver embarked on the arduous journey, his heart filled with hope.

After days of climbing, Oliver reached the peak, where Master Lucius resided in a humble cottage. The old sage welcomed the young boy with a gentle smile, sensing his burning desire to conquer his memory troubles. Master Lucius understood that knowledge is a powerful tool, and he was eager to share his expertise.
`,

  "The Memory Maestro 2": `For weeks, Oliver immersed himself in the teachings of the Memory Maestro. He learned about the art of association, where linking information to vivid mental images made it easier to recall. Oliver practiced this technique diligently, conjuring vibrant images that brought his lessons to life.

Master Lucius also introduced Oliver to the power of visualization. He explained how creating a mental picture of what needed to be remembered could engrave it deeply into the mind. Oliver embraced this technique, painting vivid scenes in his imagination, like a movie playing inside his head.

The Memory Maestro did not stop there. He revealed the wonders of mnemonic devices, clever tools that helped structure and organize information. Oliver discovered the power of acronyms, where the first letters of a series of words formed a memorable word or phrase. He used this technique to recall complex sequences and formulas effortlessly.

Another valuable technique shared by the Memory Maestro was the method of loci. This ancient technique involved associating pieces of information with familiar places. Oliver imagined his house as a memory palace, where each room held different facts and figures. As he mentally wandered through his palace, he effortlessly retrieved stored knowledge.`,

  "The Memory Maestro 3 ": `As time passed, Oliver's memory skills flourished under the guidance of Master Lucius. He transformed into a young prodigy, his newfound abilities astounding his family and friends. No longer did he forget his homework or misplace his belongings. Oliver's grades soared, and he became known as the Memory Maestro's most exceptional apprentice.

Oliver's success brought him fame, and people from far and wide sought his guidance. He taught others the techniques he had learned, spreading the gift of memorization to all who desired it. Oliver's kindness and humility endeared him to many, and he became a beacon of hope for those struggling with memory challenges.

Years later, after Master Lucius had passed away, Oliver established a school dedicated to the art of memory. The school attracted students from all walks of life, each eager to unlock their memory potential. Oliver tirelessly trained and mentored his pupils, sharing the techniques he had mastered and inspiring them to believe in their own abilities.

The Memory Maestro's legacy lived on, with countless individuals benefiting from his teachings. Oliver's students, armed with their newfound skills, achieved remarkable feats. They excelled in academia, became renowned experts in their fields, and preserved knowledge for generations to come.

Oliver's journey from a forgetful boy to the revered Memory Maestro became a tale of hope and triumph, reminding everyone that the power of memory lies within us all. The memory techniques he had mastered had transformed his life and the lives of countless others, proving that with determination, knowledge, and practice, any memory challenge could be conquered.`,
};

export function setItem(key, value) {
  return localforage
    .setItem(key, value)
    .then(function () {})
    .catch(function (error) {
      console.error("Error setting value:", error);
    });
}

export function getItem(key) {
  return localforage
    .getItem(key)
    .then(function (value) {
      return value;
    })
    .catch(function (error) {
      console.error("Error retrieving value:", error);
      return null; // or any default value you prefer
    });
}

getItem("textArray").then(function (value) {
  console.log("🚀 ~ file: localForage.js:52 ~ value:", value);
  if (
    value === undefined ||
    value === null ||
    Object.keys(value).length === 0
  ) {
    console.log("🚀 ~ file: localForage.js:52 ~ value", value);
    setItem("textArray", text).then(function () {});
  }
});

// setTimeout(function () {
// }, 100);
// localforage.config();
// localforage.clear();
