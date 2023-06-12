async function randomQuestions() {   

  const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  }
  try {    
    const response = await fetch(`http://localhost:3000/randomQuestions`, options); 
    const questions = await response.json(); 
    
    const q1 = questions[0];
    const q2 = questions[1];
    const q3 = questions[2];
    const q4 = questions[3];
    const q5 = questions[4];
    const q6 = questions[5];
    const q7 = questions[6];
    const q8 = questions[7];
    const q9 = questions[8];
    const q10 = questions[9];    

  } catch (error) {
    console.log(error);
  }
}  

async function randomAnswers() {   

  const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  }
  try {    
         
    const response = await fetch(`http://localhost:3000/randomQuestions/randomAnswers`, options);
    const answers = await response.json()

    const q1MultipleChoices = answers[0].wrongAuthors;
    const q2MultipleChoices = answers[1].wrongAuthors;
    const q3MultipleChoices = answers[2].wrongAuthors;
    const q4MultipleChoices = answers[3].wrongAuthors;
    const q5MultipleChoices = answers[4].wrongAuthors;
    const q6MultipleChoices = answers[5].wrongAuthors;
    const q7MultipleChoices = answers[6].wrongAuthors;
    const q8MultipleChoices = answers[7].wrongAuthors;
    const q9MultipleChoices = answers[8].wrongAuthors;
    const q10MultipleChoices = answers[9].wrongAuthors;

  } catch (error) {
    console.log(error);
  }
}  

randomQuestions();
randomAnswers();

