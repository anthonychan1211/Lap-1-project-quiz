const fetchData = async (difficulty) => {
    const res = await fetch(`http://localhost:3000/randomQuestions/${difficulty}`)
    const data = await res.json()
    return data
  }

const displayTopBar= (quesNum) => {
    topBar.textContent=""

    const quesProgress = document.createElement("p") 
    quesProgress.textContent = `Q${quesNum}/5`
    topBar.appendChild(quesProgress)

    const scoreBar = document.createElement("p")
    scoreBar.textContent = `Score: ${score}`
    topBar.appendChild(scoreBar)

    const instruction = document.createElement("p") 
    instruction.textContent = "Select the author of the painting" 
    topBar.appendChild(instruction) 

    const chancesLeft = document.createElement("p") 
    chancesLeft.textContent = `${"x ".repeat(wrongGuess)}${"o ".repeat(4 - wrongGuess)}` 
    topBar.appendChild(chancesLeft) 
}

const displayQues = async (quesNum) => {
    questionSection.textContent=""
    answerSection.textContent=""
    resultsSection.textContent=""

    if (!fetchStatus){
        data = await fetchData(difficulty)
        fetchStatus = true
    }
    
    const quesImage = document.createElement("img")
    quesImage.id="painting"
    quesImage.src = data[quesNum - 1].imageUrl
    quesImage.alt = `Q${quesNum} painting`
    questionSection.appendChild(quesImage)

    let correctAuthor = data[quesNum-1].author
    //wrongAuthors shouldn't contain correct author
    let randomizeChoices = data[quesNum - 1].wrongAuthors 
    let randomNum = Math.floor(Math.random() * 5) 
    randomizeChoices.splice(randomNum, 0, correctAuthor) 

    for (let i = 0; i < 5; i++) {
        const choice = document.createElement("button")
        choice.textContent = randomizeChoices[i]
        answerSection.appendChild(choice)

        choice.addEventListener('click', () => {
            console.log()
            let correct = false
            if (choice.textContent==correctAuthor){
                correct = true
                score += (4-wrongGuess)
            } else {
                correct = false
                choice.disabled=true
            }
            checkAnswer(correct)
        })
    }
}

const checkAnswer = (correct) => {
    resultsSection.textContent = ""
    quesImage = document.querySelector('#painting')

    if (correct==true){
        answerSection.childNodes.forEach(button => button.disabled=true)
    }

    if (correct==true && wrongGuess<4){
        zoomLevel = 10
        results('correct')
    }

    if (correct==false && wrongGuess<4){
        wrongGuess++

    }    

    if (quesNum==5){
        answerSection.childNodes.forEach(button => button.disabled=true)
        //final score
        //play again button
    }
}

const results = (result) => {
    const resultsText = document.createElement('p')

    if (result=='correct' && wrongGuess<4){
        resultsText.textContent=`Correct! You scored ${5-wrongGuess} points.`
        resultsSection.appendChild(resultsText)
        answerSection.childNodes.forEach(button => button.disabled=true)
    }

    if (quesNum<5){

    }
}

const runGame = (quesNum,wrongGuess,score) => {
    if (quesNum<6) {
        displayTopBar(quesNum,wrongGuess,score)
        displayQues(quesNum)        
    } else {
        fetchStatus = false  
    }
}

const topBar = document.querySelector(".topBar")
const questionSection = document.querySelector(".image-container")
const answerSection = document.querySelector(".answers")
const resultsSection = document.querySelector(".results")

let quesNum = 1
let wrongGuess = 0 
let score = 0

let fetchStatus = false

let difficulty = 'easy'
runGame(quesNum,wrongGuess,score)
