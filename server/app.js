const express = require("express");
const app = express();
const data = require("./data.json");
const cors = require('cors');
const logger = require("./logger");

app.use(cors());
app.use(express.json());
app.use(logger);

//variable that will store the obj that is is being used for the question
let question = null;

app.get("/", (req, res) => {
  console.log("ALL THE DATA");
  res.send(data);
});

//will pick randomly an object for the question 
app.get("/randomQuestion/", (req, res) => {
  const randomIDX = Math.floor(Math.random() * data.length); 

  question = data[randomIDX]  
  res.send(question);
})

//will randomly generate 4 objects for the multiple choice questions and make sure that its not the same as the question. Need to generate the question first
app.get("/randomQuestion/randomAnswers/", (req, res) => {  
  const arrAnswers = [];
  let randomIDX = null;   

  if(question != null) {

    while(arrAnswers.length < 4) {
      randomIDX = Math.floor(Math.random() * data.length); 
  
      if(arrAnswers.some(obj => data[randomIDX].name === obj.name && question.name === obj.name) === false){
  
        arrAnswers.push(data[randomIDX]);        
      }             
    }
  }else {
    res.status(500).send("Question is not available yet, generate it first.")
  }
     
  res.send(arrAnswers);
})

module.exports = app;
