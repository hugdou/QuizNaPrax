const url = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy';

const questionsContainer = document.querySelector('#questions')
let questionId = 1;




function generateQuestions() {
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        const questions = json.results

        questions.forEach(function (question) {
            const answers = [
                question.correct_answer,
                ...question.incorrect_answers
            ];
        
            let ansHtml  = '';

            answers.forEach((ans) => {
                ansHtml += `
                    <label>
                        ${ans}
                        <input type="radio" name="${questionId}" value="${ans}">
                    </label>
                `
            })
                questionsContainer.innerHTML = `
                <div class="question">
                    <p>${question.question}</p>
                    ${ansHtml}
                </div> `
                
            questionId++;
                
            
            
        });
    }); }
    