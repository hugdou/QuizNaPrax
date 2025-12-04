const url = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy';

const questionsContainer = document.querySelector('#questions');
let allQuestions = []; // store fetched questions

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateQuestions() {
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            allQuestions = json.results;

            questionsContainer.innerHTML = "";
            
            let html = "";

            allQuestions.forEach((question, index) => {
                const answers = shuffle([
                    question.correct_answer,
                    ...question.incorrect_answers
                ]);

                let ansHtml = answers.map(ans => `
                    <label style="display:block;margin:4px 0;">
                        <input type="radio" name="q${index}" value="${ans}">
                        ${ans}
                    </label>
                `).join("");

                html += `
                    <div class="question" data-id="${index}" style="margin-bottom:20px;">
                        <p><strong>${index + 1}. ${question.question}</strong></p>
                        ${ansHtml}
                    </div>
                `;
            });

            // Add a check answers button
            html += `
                <button id="checkBtn" style="margin-top:20px;">Check Answers</button>
                <p id="scoreText" style="font-size:18px; font-weight:bold; margin-top:10px;"></p>
            `;

            questionsContainer.innerHTML = html;

            document
                .querySelector("#checkBtn")
                .addEventListener("click", checkAnswers);
        });
}

function checkAnswers() {
    let score = 0;

    allQuestions.forEach((question, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const questionDiv = document.querySelector(`.question[data-id="${index}"]`);

        if (!selected) return; // unanswered

        const isCorrect = selected.value === question.correct_answer;

        // highlight
        if (isCorrect) {
            selected.parentElement.style.color = "green";
            selected.parentElement.style.fontWeight = "bold";
            score++;
        } else {
            selected.parentElement.style.color = "red";
            selected.parentElement.style.fontWeight = "bold";

            // also show the correct answer
            const correctLabel = [...questionDiv.querySelectorAll("label")]
                .find(l => l.textContent.includes(question.correct_answer));

            correctLabel.style.color = "green";
            correctLabel.style.fontWeight = "bold";
        }
    });

    // show score
    document.querySelector("#scoreText").textContent = `Score: ${score} / ${allQuestions.length}`;
}
