async function randomQuestion(e) {  
  e.preventDefault();   

  const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  }
  try {    
    const response = await fetch(`http://localhost:3000/randomQuestion`, options);   
    const question = await response.json()  

    const paintingImageURL = question.imageUrl;
    const choice1 = `${question.name} - ${question.author}`;   

  } catch (error) {
    console.log(error);
  }
}  

async function randomAnswers(e) {  
  e.preventDefault();   

  const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  }
  try {    
     
    const response = await fetch(`http://localhost:3000/randomQuestion/randomAnswers`, options);
    const answers = await response.json()
   
    const choice2 = `${answers[0].name} - ${answers[0].author}`;
    const choice3 = `${answers[1].name} - ${answers[1].author}`;
    const choice4 = `${answers[2].name} - ${answers[2].author}`;
    const choice5 = `${answers[3].name} - ${answers[3].author}`;
    
  } catch (error) {
    console.log(error);
  }
}  


