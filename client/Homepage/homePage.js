// This code is published under GNU GPL v3.0 License. Copyright 2023 404: Name Not Found (Liskov)

const easyButton = () =>{
    const start = document.querySelector("#easy")
    start.addEventListener('click', () => {

        localStorage.setItem("difficulty","easy")

        window.open("../QuestionPage/quesPage.html","_self")
    })
}


const hardButton = () =>{
    const start = document.querySelector("#hard")
    start.addEventListener('click', () => {
        
        localStorage.setItem("difficulty","hard")
        window.open(`../QuestionPage/quesPage.html`,"_self")
    })
}


easyButton()
hardButton()



