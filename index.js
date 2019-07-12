'use strict'
let questionNumber = 0;
let score = 0;
//generate Question html
function generateQuestion() {
    //checks to make sure no error is encountered if by chance the system goes onto question 6
    //when there are only 5 questions
    if(questionNumber < STORE.length){
        //Generates the question with 4 radio button answers that pull from the STORE dataset
        return `<div class = "question">
        <h1>${STORE[questionNumber].question}</h1>
        <form>
        <fieldset>
        <ol>
        <li>
        <label class="answerChoice">
        <input type="radio" value ="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        </li>
        <li>
        <label class="answerChoice">
        <input type="radio" value ="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        </li>
        <li>
        <label class="answerChoice">
        <input type="radio" value ="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        </li>
        <li>
        <label class="answerChoice">
        <input type="radio" value ="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        </li>
        </ol>
        <button type = "submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        generateResults();
        restartQuiz();
    }
}
//restarts quiz on click of restart button
function restartQuiz(){
    $(".results").on('click', '.restartButton', function(event) {
        location.reload();
    })
}
//generates results in js-questionsForm that depends on score
function generateResults() {
    if(score >=4){
        $('.js-questionsForm').html(
            `<div class="results">
                <img src="https://imgur.com/uw3OsYS.jpg" alt="A person pulling in a large amount of chips on the felt"/>
                <h1>Great job! You got ${score} questions out of 5 right. Go hit the felt!</h1>
                <button type=button class="restartButton">Restart Quiz</button>
            </div>`)
        
    } else {
        $('.js-questionsForm').html(
            `<div class="results">
                <img src="https://imgur.com/ElopCps.jpg" alt="Daniel Negreanu's MasterClass image about teaching poker"/>
                <h1>Yikes....You only got ${score} out of 5 right. You might want to get some more practice in!</h1>
                <button type=button class="restartButton">Restart Quiz</button>
            </div>`)
    }
}
//starts the quiz by hiding the start div and changes the display of the questions form from none to block
function startQuiz() {
    $('.js-start').on('click', '.startButton', function (event) {
        $('.js-start').remove();
        $(".js-questionsForm").html(generateQuestion())
        $(".js-questionsForm").css("display", "inline-block");
        updateQuestionNumber();
    });
}
//submits answers after pulling answer and converting it to a readable value and
//displays different page depending on if the answer was correct or not 
function submitAnswer() {
    $('.js-questionsForm').submit(function(event) {
        event.preventDefault();
        let selectedAnswer = $('input:checked');
        let chosenAnswer = selectedAnswer.val();
        let correctAnswer =`${STORE[questionNumber].correctAnswer}`;
        if (chosenAnswer === correctAnswer){
            rightAnswer();
            updateScore();
            nextQuestion();
        } else {
            wrongAnswer();
            nextQuestion();
        }
    });
}
//feedback for a wrong answer
function wrongAnswer() {
    let correctAnswer =`${STORE[questionNumber].correctAnswer}`;
    $('.js-questionsForm').html(
        `<div class="wrongAnswer">
            <img src="${STORE[questionNumber].wrongIcon}" alt="${STORE[questionNumber].wrongAlt}"/>
            <h2 class="wrongMessage">NO LUCK!</h2>
            <h3>The correct answer was ${correctAnswer}.</h3>
            <button type=button class="nextButton">Next</button>
        </div>`)
}
//feedback for a correct answer
function rightAnswer() {
    $('.js-questionsForm').html(
        `<div class="correctAnswer">
            <img src="${STORE[questionNumber].correctIcon}" alt="${STORE[questionNumber].correctAlt}"/>
            <h2 class="correctMessage">CORRECT!</h2>
            <button type=button class="nextButton">Next</button>
        </div>`)
}
//updates score and changes score count
function updateScore() {
    score++;
    $(".scoreCount").text(`${score}`)
}
//updates question number 
function updateQuestionNumber() {
    questionNumber++;
    $(".questionNumber").text(`${questionNumber}`)
}
//generates next question
function nextQuestion(){
    $('.nextButton').on('click', function(event) {
        updateQuestionNumber();
        $(".js-questionsForm").html(generateQuestion())
    })
}
//combines above functions into a single one
function quizApp(){
    submitAnswer();
    generateQuestion();
    startQuiz();
}

quizApp();