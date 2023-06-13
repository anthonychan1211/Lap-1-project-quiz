const fetchData = async (difficulty) => {
  const res = await fetch(`http://localhost:3000/randomQuestions/${difficulty}`);
  const data = await res.json();  
  return data;
};


const displayTopBar = (quesNum,wrongGuess,score) => {
  topBar.textContent=""
  const quesProgress = document.createElement("p");
  quesProgress.textContent = `Q${quesNum}/5`;
  topBar.appendChild(quesProgress);
  
  const scoreBar = document.createElement("p")
  scoreBar.textContent = `Score: ${score}`
  topBar.appendChild(scoreBar)

  const instruction = document.createElement("p");
  instruction.textContent = "Select the author of the painting";
  topBar.appendChild(instruction);

  const chancesLeft = document.createElement("p");
  chancesLeft.textContent = `${"x ".repeat(wrongGuess)}${"o ".repeat(
    4 - wrongGuess
  )}`;
  topBar.appendChild(chancesLeft);
}

let data = null;
let fetchStatus = false

let data = null;
let fetchStatus = false;
const displayQues = async (quesNum) => {
  questionSection.textContent=""
  answerSection.textContent=""
  resultsSection.textContent=""

  if (!fetchStatus){
    data = await fetchData("hard")
    fetchStatus = true
  }

  const quesImage = document.createElement("img");
  quesImage.id="painting"
  let correctAuthor = data[quesNum-1].author
  quesImage.src = data[quesNum - 1].imageUrl;
  quesImage.alt = `Q${quesNum} painting`;
  questionSection.appendChild(quesImage);

  let randomizeChoices = data[quesNum - 1].wrongAuthors;
  let randomNum = Math.floor(Math.random() * 5);
  randomizeChoices.splice(randomNum, 0, correctAuthor);

  for (let i = 0; i < 5; i++) {
    const choice = document.createElement("button");
    choice.textContent = randomizeChoices[i];
    answerSection.appendChild(choice);

    choice.addEventListener('click', () => {
      let correct = false
      if (choice.textContent==correctAuthor){
        correct = true
      } else {
        correct = false
        choice.disabled=true
      }
      checkAnswer(correct)
    })
  }

};

const checkAnswer = (correct) => {
  resultsSection.textContent=""
  quesImage = document.querySelector('.image-container img')
  if (correct==true && wrongGuess<5){
    // alert('correct')
    zoomLevel = 10
    quesNum++
    results('correct')
    painting.style.transform = `scale(${1})`
  } else {
    wrongGuess++
    topBar.childNodes[2].textContent=`${"x ".repeat(wrongGuess)}${"o ".repeat(4 - wrongGuess)}`
    if (wrongGuess==4){
      // alert ('game over')
      painting.style.transform = `scale(${1})`
      wrongGuess=0
      results('fail')
    } else {
     zoomOut()
      // alert('incorrect')
      results('incorrect')
    }
  }
}

const results = (result) => {
  console.log(wrongGuess)
  const resultsText = document.createElement('p')
  if (result=='correct'){
    resultsText.textContent="Correct!"
    resultsSection.appendChild(resultsText)
    if (quesNum<5){
      nextQues()
    }
  } else if (result=='incorrect'){
    resultsText.textContent=`Incorrect! You have ${4-wrongGuess} chance${((4-wrongGuess)==1?``: `s`)} left`
    resultsSection.appendChild(resultsText)
  } else if (result=='fail'){      
      resultsText.textContent="Incorrect! You have no chances left."
      resultsSection.appendChild(resultsText)
    if (quesNum<5){
      nextQues()
    }
  } 
  if (quesNum==5) {
    answerSection.childNodes.forEach(button => button.disabled=true)
    finishGame()
  }
}

const zoomOut = () => {
  const painting = document.getElementById("painting");
  zoomLevel -= 2;
  painting.style.transform = `scale(${zoomLevel})`
}

const nextQues = () => {
  const nextQButton = document.createElement('button')
  nextQButton.textContent = "Next question"
  resultsSection.appendChild(nextQButton)
  nextQButton.addEventListener('click', () => {
  runGame(quesNum,0,score)})
  answerSection.childNodes.forEach(button => button.disabled=true)
}

const finishGame = () => {
  alert ('you finished the game')
}

const runGame = (quesNum,wrongGuess,score) => {
  wrongGuess=0
  if (quesNum<6) {
    displayTopBar(quesNum, wrongGuess,score);
    displayQues(quesNum)
  } else {
    fetchStatus = false
  }
}

const zoomOut = () => {
  
  const painting = document.getElementById("painting");
  zoomLevel -= (40/100) * zoomLevel;
  painting.style.transform = `scale(${zoomLevel})`

}


const topBar = document.querySelector(".topBar");
const questionSection = document.querySelector(".image-container");
const answerSection = document.querySelector(".answers");
const resultsSection = document.querySelector(".results")

let zoomLevel =10
let quesNum = 1;
let wrongGuess = 0;
let score = 0;


runGame(quesNum,wrongGuess,score);
