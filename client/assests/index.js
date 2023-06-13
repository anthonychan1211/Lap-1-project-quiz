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
    
  } catch (error) {
    console.log(error);
  }
} 

randomQuestions();

