const startButton = () =>{
    const start = document.querySelector("#play")
    start.addEventListener('click', () => {
        console.log("testing")
        window.open("../quesPage.html","_self")
    })
}

startButton()