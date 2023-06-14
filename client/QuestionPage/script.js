const fetchData = async () => {
  const res = await fetch("http://localhost:3000");
  const data = await res.json();
  console.log(data);
  return data;
};

const displayTopBar = (quesNum, chances) => {
  const quesProgress = document.createElement("p");
  quesProgress.textContent = `Q${quesNum}/5`;
  topBar.appendChild(quesProgress);

  const instruction = document.createElement("p");
  instruction.textContent = "Select the matching painting";
  topBar.appendChild(instruction);

  const chancesLeft = document.createElement("p");

  chancesLeft.textContent = `${"x ".repeat(chances)}${"o ".repeat(
    3 - chances
  )}`;
  topBar.appendChild(chancesLeft);
};

const displayQues = async (quesNum) => {
  //get random image from api
  const data = await fetchData();
  const quesImage = document.createElement("img");
  quesImage.src = data[quesNum - 1].imageUrl;
  quesImage.alt = "Q1 picture";
  questionSection.appendChild(quesImage);

  //get wrong answers from api
  for (let i = 0; i < 4; i++) {
    const choice = document.createElement("button");
    answerSection.appendChild(ansButton);
    choice.textContent = "possible answers";
    answerSection.appendChild(choice);
  }
};

const topBar = document.querySelector(".topBar");
const questionSection = document.querySelector(".image-container");
const answerSection = document.querySelector(".answers");

//test
let currentQue = 1;
displayTopBar(currentQue, 1);
displayQues(currentQue);
