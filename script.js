const url = "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy";

let allQuestions = [];
let questionsDiv = document.getElementById("questions");

// Sebo pridam ti poznamky co treba zmenit

function shuffle(arr) {
    return arr.sort(function () {
        return Math.random() - 0.5;
    });
}

function generateQuestions() {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            allQuestions = data.results;
            questionsDiv.innerHTML = "";

            let allHtml = "";

            // skus zjednodusit resp. odstranit for loopy
            for (let i = 0; i < allQuestions.length; i++) {
                let q = allQuestions[i];

                let answers = [];
                answers.push(q.correct_answer);

                for (let j = 0; j < q.incorrect_answers.length; j++) {
                    answers.push(q.incorrect_answers[j]);
                }
                shuffle(answers);
                let answerHtml = "";
                for (let a = 0; a < answers.length; a++) {
                    answerHtml +=
                        "<label>" +
                        "<input type='radio' name='q" + i + "' value='" + answers[a] + "'>" +
                        answers[a] +
                        "</label><br>";
                }
                allHtml +=
                    "<div class='question' data-id='" + i + "' style='margin-bottom:15px;'>" +
                    "<p><b>" + (i + 1) + ". " + q.question + "</b></p>" +
                    answerHtml +
                    "</div>";
            }
                // toto mozes dat do html
            allHtml += "<button id='checkBtn'>Check Answers</button>";
            allHtml += "<p id='scoreText'></p>";

            questionsDiv.innerHTML = allHtml;
            document.getElementById("checkBtn").onclick = checkAnswers;
        });
}

function checkAnswers() {
    let score = 0;
    for (let i = 0; i < allQuestions.length; i++) {
        let q = allQuestions[i];
        
        let picked = document.querySelector("input[name='q" + i + "']:checked");
        let correct = document.querySelector("input[name='q" + i + "'][value='" + q.correct_answer + "']");
        if (picked == null) {
            continue; 
        }
        if (picked.value === q.correct_answer) {
            score++;
            picked.parentElement.classList.add('right-answer'); 
        } else {
            picked.parentElement.classList.add('wrong-answer');
            correct.parentElement.classList.add('right-answer'); 
        }
    } 

    document.getElementById("scoreText").innerHTML =
        "Score: " + score + " / " + allQuestions.length;
}