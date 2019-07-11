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
        <input type="radio" value ="${STORE[questionNumber].answers[0]}" name="answer" requred>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        </li>
        <li>
        <label class="answerChoice">
        <input type="radio" value ="${STORE[questionNumber].answers[1]}" name="answer" requred>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        </li>
        <li>
        <label class="answerChoice">
        <input type="radio" value ="${STORE[questionNumber].answers[1]}" name="answer" requred>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        </li>
        <li>
        <label class="answerChoice">
        <input type="radio" value ="${STORE[questionNumber].answers[1]}" name="answer" requred>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        </li>
        </ol>
        <button type = "submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`;
    }
}

//starts the quiz by hiding the start div and changes the display of the questions form from none to block
function startQuiz() {
    $('.js-start').on('click', '.startButton', function (event) {
        $('.js-start').remove();
        $(".js-questionsForm").html(generateQuestion())
        $(".js-questionsForm").css("display", "inline-block");
        $(".questionNumber").text(1);
    });
}
function questionNumberCount() {
    questionNumber++;
}

function submitAnswer() {
    $('.js-questionsForm').submit(function(event) {
        event.preventDefault();
        let answerChosen = $('input:checked')
        
        questionNumberCount();
    });
}
$(submitAnswer);
$(generateQuestion);
$(startQuiz);