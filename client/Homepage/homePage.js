const startButton = () =>{
    const start = document.querySelector("#play")
    start.addEventListener('click', () => {
        console.log("testing")
        window.open("../QuestionPage/quesPage.html","_self")
    })
}

startButton()
