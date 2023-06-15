let difficulty = localStorage.getItem("difficulty");

const fetchData = async (difficulty) => {
  const res = await fetch(
    `http://localhost:3000/randomQuestions/${difficulty}`
  );
  const data = await res.json();
  return data;
};

const displayTopBar = (quesNum, wrongGuess, score) => {
  topBar.textContent = "";

  // const homePageBlock = document.createElement("p");
  // const homePage = document.createElement('a')
  // homePage.textContent = "Home";
  // homePage.href = "../Homepage/homePage.html"
  // topBar.appendChild(homePageBlock);
  // homePageBlock.appendChild(homePage);

  const quesProgress = document.createElement("p");
  quesProgress.textContent = `Q${quesNum}/5`;
  topBar.appendChild(quesProgress);

  const scoreBar = document.createElement("p");
  scoreBar.textContent = `Score: ${score}`;
  topBar.appendChild(scoreBar);

  // const instruction = document.createElement("p");
  // instruction.textContent = "Select the author of the painting";
  // topBar.appendChild(instruction);

  const chancesLeft = document.createElement("p");
  chancesLeft.textContent = `${"x ".repeat(wrongGuess)}${"o ".repeat(
    4 - wrongGuess
  )}`;
  topBar.appendChild(chancesLeft);
};

const displayQues = async (quesNum) => {
  questionSection.textContent = "";
  answerSection.textContent = "";
  resultsSection.textContent = "";

  if (!fetchStatus) {
    data = await fetchData(difficulty);
    fetchStatus = true;
  }

  const quesImage = document.createElement("img");
  quesImage.id = "painting";
  let correctAuthor = data[quesNum - 1].author;
  quesImage.src = data[quesNum - 1].imageUrl;
  quesImage.alt = `Q${quesNum} painting`;
  questionSection.appendChild(quesImage);

  let randomPixal = randomSpotImg();

  let randomizeChoices = data[quesNum - 1].wrongAuthors;
  let randomNum = Math.floor(Math.random() * 5);
  randomizeChoices.splice(randomNum, 0, correctAuthor);

  for (let i = 0; i < 5; i++) {
    const choice = document.createElement("button");
    choice.textContent = randomizeChoices[i];
    answerSection.appendChild(choice);

    choice.addEventListener("click", () => {
      let correct = false;
      if (choice.textContent == correctAuthor) {
        correct = true;
        score += 5 - wrongGuess;
        topBar.childNodes[1].textContent = `Score: ${score}`;
        choice.style.backgroundColor = "green";
      } else {
        let newX;
        let newY;
        wrongGuess++;
        randomPixal[0] > 50
          ? (newX =
              randomPixal[0] - 50 + ((randomPixal[0] - 50) / 4) * wrongGuess)
          : (newX = randomPixal + ((50 - randomPixal[0]) / 4) * wrongGuess);
        randomPixal[1] > 50
          ? (newY = randomPixal[1] - 50)
          : (newY = 50 - randomPixal[1]);
        quesImage.style.translate = `-${newX}% -${newY}%`;
        correct = false;
        choice.disabled = true;
        choice.classList.add("wrong-answer");
      }
      checkAnswer(correct, correctAuthor);
    });
  }
};

const checkAnswer = (correct, correctAuthor) => {
  resultsSection.textContent = "";
  quesImage = document.querySelector(".image-container img");
  if (correct == true && wrongGuess < 5) {
    zoomLevel = 10;
    results("correct", correctAuthor);
    quesNum++;
    painting.style.translate = "-50% -50%";
    painting.style.transform = `scale(${1})`;
  } else {
    topBar.childNodes[2].textContent = `${"x ".repeat(wrongGuess)}${"o ".repeat(
      4 - wrongGuess
    )}`;
    if (wrongGuess == 4) {
      zoomLevel = 10;
      painting.style.translate = "-50% -50%";
      painting.style.transform = `scale(${1})`;
      wrongGuess = 0;
      if (quesNum < 5) {
        quesNum++;
      }
      results("fail", correctAuthor);
    } else {
      zoomOut();
      results("incorrect", correctAuthor);
    }
  }
};

const results = (result, correctAuthor) => {
  const resultsText = document.createElement("p");
  resultsText.className = "result-text";
  if (result == "correct") {
    resultsText.textContent = `Correct! You scored ${5 - wrongGuess} points.`;
    resultsSection.appendChild(resultsText);
    showDescription();
    wrongGuess = 0;
    if (quesNum < 5) {
      nextQues(correctAuthor);
    }
  } else if (result == "incorrect") {
    resultsText.textContent = `Incorrect! You have ${4 - wrongGuess} chance${
      4 - wrongGuess == 1 ? `` : `s`
    } left.`;
    resultsSection.appendChild(resultsText);
  } else if (result == "fail") {
    resultsText.textContent = "Incorrect! You have no chances left.";
    showDescription();
    resultsSection.appendChild(resultsText);
    if (quesNum < 5) {
      nextQues(correctAuthor);
    }
  }

  if (quesNum == 5 && (result == "correct" || result == "fail")) {
    answerSection.childNodes.forEach((button) => {
      button.disabled = true;
      if (button.textContent == correctAuthor) {
        button.style.backgroundColor = "green";
        button.style.color = "white";
      }
    });
    displayTopBar(quesNum, wrongGuess, score);
    finishGame();
  }
};

const nextQues = (correctAuthor) => {
  const nextQButton = document.createElement("button");
  nextQButton.className = "next-q-button";
  nextQButton.textContent = "Next question";
  descriptionSection.appendChild(nextQButton);

  nextQButton.addEventListener("click", () => {
    descriptionSection.querySelector("p").textContent = "";
    descriptionSection.querySelector("img").remove();
    descriptionSection.querySelector("button").remove();
    descriptionSection.classList.add("hidden");
    runGame(quesNum, 0, score);
  });

  answerSection.childNodes.forEach((button) => {
    button.disabled = true;
    if (button.textContent == correctAuthor) {
      button.style.backgroundColor = "green";
      button.style.color = "white";
    }
  });
};

const finishGame = () => {
  const resultsText = resultsSection.childNodes[0];
  resultsText.textContent = `You have completed the game! Your final score is ${score} points.`;
  const playAgainSection = document.createElement("div");
  playAgainSection.className = "play-again-section";
  descriptionSection.appendChild(playAgainSection);
  const playEasyMode = document.createElement("button");
  const playHardMode = document.createElement("button");
  playEasyMode.textContent = "Play again: Easy Mode";
  playEasyMode.classList.add("easy-mode-button");
  playHardMode.textContent = "Play again: Hard Mode";
  playHardMode.classList.add("hard-mode-button");
  playAgainSection.appendChild(playEasyMode);
  playAgainSection.appendChild(playHardMode);

  playEasyMode.addEventListener("click", () => {
    fetchStatus = false;
    localStorage.setItem("difficulty", "easy");
    window.location.reload();
  });

  playHardMode.addEventListener("click", () => {
    fetchStatus = false;
    localStorage.setItem("difficulty", "hard");
    window.location.reload();
  });
};

const runGame = (quesNum, wrongGuess, score) => {
  wrongGuess = 0;
  if (quesNum < 6) {
    displayTopBar(quesNum, wrongGuess, score);
    displayQues(quesNum);
  } else {
    fetchStatus = false;
  }
};

const randomSpotImg = () => {
  const painting = document.getElementById("painting");
  const randomX = Math.floor(Math.random() * 100);
  const randomY = Math.floor(Math.random() * 100);
  painting.style.translate = `-${randomX}% -${randomY}%`;
  return [randomX, randomY];
};

const zoomOut = () => {
  const painting = document.getElementById("painting");
  zoomLevel -= (40 / 100) * zoomLevel;
  painting.style.transform = `scale(${zoomLevel})`;
};

const showDescription = () => {
  descriptionSection.classList.remove("hidden");
  const paragraphElement = descriptionSection.querySelector("p");
  const descriptionTitle =
    descriptionSection.querySelector(".description-title");
  descriptionTitle.textContent = `${data[quesNum - 1].name}(${
    data[quesNum - 1].author
  })`;
  const image = document.querySelector("#painting");
  const imageUrl = image.src;
  const correctObj = data.filter((obj) => obj.imageUrl === imageUrl);
  const description = correctObj["0"].description;
  const quesImage = document.createElement("img");
  quesImage.className = "desciption-painting";
  quesImage.src = data[quesNum - 1].imageUrl;
  quesImage.alt = `Q${quesNum} painting`;
  descriptionSection.appendChild(quesImage);
  paragraphElement.textContent = description;
};

const topBar = document.querySelector(".topBar");
const questionSection = document.querySelector(".image-container");
const answerSection = document.querySelector(".answers");
const resultsSection = document.querySelector(".results");
const descriptionSection = document.querySelector(".description");
const titleBar = document.querySelector(".title");

let zoomLevel = 10;
let quesNum = 1;
let wrongGuess = 0;
let score = 0;

let data = null;
let fetchStatus = false;

runGame(quesNum, wrongGuess, score);
