const question = document.querySelector('#question');

const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#qanswer2');
const answer3 = document.querySelector('#answer3');
const answer4 = document.querySelector('#answer4');

const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2');


function fillQuestionElements(data) {

  if (data.winner === true) {
    gameBoard.style.display = 'none';
    h2.innerText = 'WYGRANA !!!';
    return;
  }

  // To data question nie odwwołuje nam się do pobranego wyżej question tylko w momencie wywołania do promise
  question.innerText = data.question;

  for (const i in data.answers) {
    const answerEl = document.querySelector(`#answer${Number(i)+1}`);
    answerEl.innerText = data.answers[i];
  }
}



function showNextQuestion() {
  fetch('/question', {
      method: 'GET'
    }).then(r => r.json())
    .then(data => fillQuestionElements(data))
  // TO nasze data to jest tak naprawdę tablica question z której możemy wziąć pytania i odpowiedzi odebrane z backendu za pomocą res.json()

  // FillQuestion elements wyświetli nam pytania i odopowiedzi na stronie Czyli zamiast pisać data.question itd dajemy to poprostu do funkcji dla przejrzystości
}

showNextQuestion();

const goodAnswersSpan = document.querySelector('#goodAnswers');

function handleAnswerFeedBack(data) {
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
      method: 'POST'
    })
    .then(r => r.json())
    .then(data => handleAnswerFeedBack(data))

}

const buttons = document.querySelectorAll('button');

for (const button of buttons) {
  button.addEventListener('click', function () {
    const answerIndex = this.dataset.answer;
    sendAnswer(answerIndex);
  })
}