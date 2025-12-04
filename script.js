const url = "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy";

let allQuestions = [];
let questionsDiv = document.getElementById("questions");

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

            // Go through all 10 questions
            for (let i = 0; i < allQuestions.length; i++) {
                let q = allQuestions[i];

                let answers = [];
                answers.push(q.correct_answer);

                for (let j = 0; j < q.incorrect_answers.length; j++) {
                    answers.push(q.incorrect_answers[j]);
                }

                // Shuffle answers
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
        let questionBox = document.querySelector(".question[data-id='" + i + "']");
        let picked = document.querySelector("input[name='q" + i + "']:checked");

        if (picked == null) {
            continue; 
        }

        if (picked.value === q.correct_answer) {
            picked.parentNode.style.color = "green";
            score++;
        } else {
            picked.parentNode.style.color = "red";
            let labels = questionBox.getElementsByTagName("label");
            for (let x = 0; x < labels.length; x++) {
                if (labels[x].textContent.indexOf(q.correct_answer) !== -1) {
                    labels[x].style.color = "green";
                }
            }
        }
    }

    document.getElementById("scoreText").innerHTML =
        "Score: " + score + " / " + allQuestions.length;
}