// This code is published under GNU GPL v3.0 License. Copyright 2023 404: Name Not Found (Liskov)
const express = require("express");
const app = express();
const data = require("./data.json");
const cors = require("cors");
const logger = require("./logger");

app.use(cors());
app.use(express.json());
app.use(logger);

let questions = [];
//will randomly generate 4 multiple choice wrong answers inside obj.wrongAuthors. 
const generateRandomAnswers = () => {
  let randomIDX = null;

  if (questions.length != 0) {
    for (const obj of questions) {
      while (obj["wrongAuthors"].length < 4) {
        randomIDX = Math.floor(Math.random() * data.length);

        if (
          obj["wrongAuthors"].some(
            (authors) => data[randomIDX].author === authors
          ) === false &&
          obj.author != data[randomIDX].author
        ) {
          obj["wrongAuthors"].push(data[randomIDX].author);
        }
      }
    }
  } else {
    res.status(404).send("Question is not available yet, generate it first.");
  }
};

app.get("/", (req, res) => {
  console.log("ALL THE DATA");
  res.send(data);
});

//will randomly pick 10 questions and their answers in the hard mode
app.get("/randomQuestions/hard", (req, res) => {
  let randomIDX = null;

  const hardLvlData = data.filter((obj) => {
    return obj.level === "hard";
  });

  try {
    while (questions.length < 10) {
      randomIDX = Math.floor(Math.random() * hardLvlData.length);
      if (
        questions.some((obj) => hardLvlData[randomIDX].name === obj.name) ===
        false
      ) {
        questions.push({ ...hardLvlData[randomIDX], wrongAuthors: [] });
      }

    }
  } catch (error) {

    console.log(error);    
  }   

  generateRandomAnswers();
  //console.log(questions)
  res.send(questions);  
  questions = []
})

//will randomly pick 10 questions and their answers in the easy mode
app.get("/randomQuestions/easy", (req, res) => {
  let randomIDX = null;

  const easyLvlData = data.filter((obj) => {
    return obj.level === "easy";
  });

  try {

    while(questions.length < 10) {
      randomIDX = Math.floor(Math.random() * easyLvlData.length); 
  
      if(questions.some(obj => easyLvlData[randomIDX].name === obj.name) === false){

        questions.push({...easyLvlData[randomIDX], wrongAuthors: []});                        
      }                  
    }   

  } catch (error) {
    console.log(error);
  }

  generateRandomAnswers();
  res.send(questions);
  questions = [];
});

module.exports = app;
