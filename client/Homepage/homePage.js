const easyButton = () =>{
    const start = document.querySelector("#play")
    start.addEventListener('click', () => {
        console.log("testing")
        window.open("../quesPage.html","_self")
    })
}

const hardButton = () =>{
    const start = document.querySelector("#play")
    start.addEventListener('click', () => {
        console.log("testing")
        window.open("../quesPage.html","_self")
    })
}


easyButton()
hardButton()

