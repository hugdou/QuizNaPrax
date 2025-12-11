const url = 'https://opentdb.com/api.php?amount=10';

const questionsContainer = document.querySelector('#questions');
let allQuestions = []; // zoznam na otazky
function fetchQuestions() {
  return fetch(url) // zober otazky z url API
    .then(response => {
      if (!response.ok) { // skontroluj ci je odpoved OK, aj nie hod chybu
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => { // uloz otazky do zoznamu allQuestions
      allQuestions = data.results;
      console.log(allQuestions);
      return allQuestions;
    })
    .catch(error => console.error('Error fetching questions:', error)); // vyhod chybu ak sa nieco pokazilo
}

function displayQuestions() {
  questionsContainer.innerHTML = ''; // vycisti pred novymi otazkami

  fetchQuestions().then(() => {
    allQuestions.forEach((questionObj, index) => {
      const questionDiv = document.createElement('div'); // vytvor div v HTML pre kazdu otazku
      questionDiv.innerHTML = `${index + 1}. ${questionObj.question}`; //
      questionsContainer.appendChild(questionDiv); // pridaj ako poslednu otazku do zoznamu

      const answers = [...questionObj.incorrect_answers, questionObj.correct_answer]; // rozdiel medzi spravnou a nespravnou odpovedou a rozdeli na separatne polozky
      console.log(answers);
      answers.sort(() => Math.random() - 0.5); // zamiesaj odpovede nahodne

      let answered = false; 

      answers.forEach(answer => {
        const answerButton = document.createElement('button'); // urob tlacidlo pre kazdu odpoved
        answerButton.innerHTML = answer; // nastav text tlacidla na odpoved
        questionDiv.appendChild(answerButton);
        answerButton.addEventListener('click', () => {
          if (answered) return; // zabran opakovanym klikom
          answered = true;
          
            if (answer === questionObj.correct_answer) { 
                answerButton.style.backgroundColor = 'green'; // ak je spravna odpoved, zmen farbu na zeleno
            } else {
                answerButton.style.backgroundColor = 'red'; // ak je zla, zmen na cerveno
            }
      });
    });
  });
})}

displayQuestions(); 
