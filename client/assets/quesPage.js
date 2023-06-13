const fetchData = async (difficulty) => {
  const res = await fetch(`http://localhost:3000/randomQuestions/${difficulty}`);
  const data = await res.json();
  console.log(data)
  return data;
};

const displayTopBar = (quesNum, wrongGuess,score) => {
  topBar.textContent=""
  const quesProgress = document.createElement("p");
  quesProgress.textContent = `Q${quesNum}/5`;
  topBar.appendChild(quesProgress);
  
  const scoreBar = document.createElement("p")
  scoreBar.textContent = score

  const instruction = document.createElement("p");
  instruction.textContent = "Select the author of the painting";
  topBar.appendChild(instruction);

  const chancesLeft = document.createElement("p");
  chancesLeft.textContent = `${"x ".repeat(wrongGuess)}${"o ".repeat(
    4 - wrongGuess
  )}`;
  topBar.appendChild(chancesLeft);
};

let data = null;
let fetchStatus = false
const displayQues = async (quesNum) => {
  
  questionSection.textContent=""
  answerSection.textContent=""  
  

  if(!fetchStatus) {
    data = await fetchData("hard");
    fetchStatus = true
  }  
  
  const quesImage = document.createElement("img");
  quesImage.id = "painting"  
  let correctAuthor = data[quesNum-1].author  
  quesImage.src = data[quesNum - 1].imageUrl;
  quesImage.alt = "Q1 picture";
 
  questionSection.appendChild(quesImage);

  let randomizeChoices = data[quesNum - 1].wrongAuthors;
  let randomNum = Math.floor(Math.random() * 5);
  randomizeChoices.splice(randomNum, 0, correctAuthor);

  for (let i = 0; i < 5; i++) {
    const choice = document.createElement("button");
    choice.textContent = randomizeChoices[i];
    choice
    answerSection.appendChild(choice);
    
    choice.addEventListener("click", () => {
      if (choice.textContent == correctAuthor){
        alert('correct')
        quesNum++
        wrongGuess=0
        painting.style.transform = `scale(${1})`
        zoomLevel = 10;        
        runGame(quesNum,wrongGuess)

      } else {
        wrongGuess++
        topBar.childNodes[2].textContent=`${"x ".repeat(wrongGuess)}${"o ".repeat(4 - wrongGuess)}`        

        if (wrongGuess==4){
          alert ('Out of tries')
          // quesImage.classList.remove("guess3")
          // questionSection.style.objectFit=none
          zoomLevel = 10;
          painting.style.transform = `scale(${1})`

        } else {
          zoomOut();
          // quesImage.className=`guess${wrongGuess}`
          alert('incorrect')
        }
      }
    })
  }
};

//need to fix the run game count
const runGame = (quesNum,wrongGuess,score) => {

  
  
  
  if (quesNum<6) {
    displayTopBar(quesNum, wrongGuess,score);
    displayQues(quesNum)
  } else {
    //cant finish the game, you need to go to next question
    alert ('you finished the game')
    fetchStatus = false;
  }
}

const zoomOut = () => {
  
  const painting = document.getElementById("painting");
  zoomLevel -= 2;
  painting.style.transform = `scale(${zoomLevel})`

}


const topBar = document.querySelector(".topBar");
const questionSection = document.querySelector(".image-container");
const answerSection = document.querySelector(".answers");

let zoomLevel = 10;
let quesNum = 1;
let wrongGuess = 0;
let score = 0


runGame(quesNum,wrongGuess,score)
