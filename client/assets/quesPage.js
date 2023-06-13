const fetchData = async (difficulty) => {
  const res = await fetch(`http://localhost:3000/randomQuestions/${difficulty}`);
  const data = await res.json();  
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
let fetchStatus = false;
const displayQues = async (quesNum) => {
  
  questionSection.textContent="";
  answerSection.textContent="" ;   

  if(!fetchStatus) {
    data = await fetchData("easy");
    fetchStatus = true;
  }  
  
  const quesImage = document.createElement("img");
  let correctAuthor = data[quesNum-1].author  
  quesImage.id = "painting"  
  quesImage.src = data[quesNum - 1].imageUrl;
  quesImage.alt = "Q1 picture";
 
  questionSection.appendChild(quesImage);

  let randomizeChoices = data[quesNum - 1].wrongAuthors;
  let randomNum = Math.floor(Math.random() * 5);
  randomizeChoices.splice(randomNum, 0, correctAuthor);
  randomSpotImg();
  console.log(data[quesNum-1].name)

  for (let i = 0; i < 5; i++) {
    const choice = document.createElement("button");
    choice.textContent = randomizeChoices[i];    
    answerSection.appendChild(choice);    
    
    choice.addEventListener("click", () => {
      
      if (choice.textContent == correctAuthor){
        alert('correct');
        quesNum++;
        wrongGuess=0;
        painting.style.transform = `scale(${1})`;
        zoomLevel = 10;        
        runGame(quesNum,wrongGuess);

      } else {
        wrongGuess++
        topBar.childNodes[2].textContent=`${"x ".repeat(wrongGuess)}${"o ".repeat(4 - wrongGuess)}`        

        if (wrongGuess==4){
          alert ('Out of tries');
          zoomLevel = 10;
          painting.style.transform = `scale(${1})`;

        } else {
          zoomOut();          
          alert('incorrect');
        }
      }
    })
  }
};

const runGame = (quesNum,wrongGuess,score) => {  
  
  if (quesNum<6) {
    
    displayTopBar(quesNum, wrongGuess,score);
    displayQues(quesNum);

  } else {    
    alert ('you finished the game');
    fetchStatus = false;
  }
}

const randomSpotImg = () => {

  const painting = document.getElementById("painting");
  const imageWidth = painting.offsetWidth;
  const imageHeight = painting.offsetHeight;
  let randomX = Math.floor(Math.random() * imageWidth);
  let randomY = Math.floor(Math.random() * imageHeight);

  //CAN SOMEONE FIX THE IMAGE POSITION PROBLEM??
  if(randomX < 100) {randomX += 200};
  if(randomY < 100) {randomX += 200};

  painting.style.transformOrigin = `${randomX}px ${randomY}px`;
  console.log(imageHeight, imageWidth, randomX, randomY)

}

const zoomOut = () => {  
  
  zoomLevel -= (40/100) * zoomLevel;
  painting.style.transform = `scale(${zoomLevel})`

}

const topBar = document.querySelector(".topBar");
const questionSection = document.querySelector(".image-container");
const answerSection = document.querySelector(".answers");
let zoomLevel = 10;
let quesNum = 1;
let wrongGuess = 0;
let score = 0;

runGame(quesNum,wrongGuess,score);
