const easyButton = () =>{
    const start = document.querySelector("#easy")
    start.addEventListener('click', () => {
        let difficulty = "easy"
        window.open(`../quesPage/${difficulty}.html`,"_self")
    })
}

const hardButton = () =>{
    const start = document.querySelector("#hard")
    start.addEventListener('click', () => {
        let difficulty = "hard"
        window.open(`../quesPage.html`,"_self")
    })
}


easyButton()
hardButton()

