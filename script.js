let url = "https://opentdb.com/api.php?amount=10"

fetch(url)
    .then((res) => res.json())
    .then((json) => {
        const questions = json.results;
    
    
    questions.forEach(function(question){
        const answers = [question.correct_answer,
            ...question.incorrect_answers
        ];
        let ansHtml = '';

        answers.forEach((ans) => {
            ansHtml =`
            <label>
                <input type="radio" name="${question.question}" value="${ans}">
                ${ans}
            </label><br>
            `;
    }
    ) 

    
})})