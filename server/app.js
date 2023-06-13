const express = require("express");
const app = express();
const data = require("./data.json");
const cors = require('cors');
const logger = require("./logger");

app.use(cors());
app.use(express.json());
app.use(logger);

let questions = [];
//will randomly generate 10 objects for the questions and 4 multiple choice wrong answers inside obj.wrongAuthors. Need to generate the question first
const generateRandomAnswers = () => {

  let randomIDX = null;   

  if(questions.length != 0) {

    for(const obj of questions) {
      
      while(obj['wrongAuthors'].length < 4){
        randomIDX = Math.floor(Math.random() * data.length); 
        
        if(obj['wrongAuthors'].some(authors => data[randomIDX].author === authors) === false && obj.author != data[randomIDX].author) {          

          obj['wrongAuthors'].push(data[randomIDX].author);
        }
      }
    }  

  }else {
    
    res.status(404).send("Question is not available yet, generate it first.")
  }
}

app.get("/", (req, res) => {
  console.log("ALL THE DATA");
  res.send(data);
});

//will pick randomly 10 objects for the 10 questions 
app.get("/randomQuestions/", (req, res) => {  
    
  let randomIDX = null;    

  try {

    while(questions.length < 10) {
      randomIDX = Math.floor(Math.random() * data.length); 
  
      if(questions.some(obj => data[randomIDX].name === obj.name) === false){

        questions.push({...data[randomIDX], wrongAuthors: []});                        
      }                  
    }
    
  } catch (error) {

    console.log(error);    
  } 

  generateRandomAnswers();

  res.send(questions);  
  questions = []
})

module.exports = app;
