function gameRoutes(app) {


  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriendUsed = false;
  let questionToTheCrowdUsed = false;
  let halfOnHalfUsed = false;

  const questions = [{

      question: 'Jaki jest najlepszy język programowania',
      answers: ['C++', 'Fortran', 'Javascript', 'Java'],
      correctAnswer: 2

    },
    {
      question: 'Czy ten kurs jest fajny',
      answers: ['Nie', 'Tak', '2xtak', 'Jest the best'],
      correctAnswer: 3

    },
    {
      question: 'Czy chcesz zjeść pizze',
      answers: ['Nawet dwie', 'Jestem na diecie', 'Nie dziękuję', 'Wole brokuły'],
      correctAnswer: 0
    }
  ];

  app.get('/question', (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      })
    } else if (isGameOver) {

      res.json({
        loser: true
      })


    } else {

      const nextQuestion = questions[goodAnswers];
      const {
        question,
        answers
      } = nextQuestion;

      res.json({
        question,
        answers
      })
    }
  });

  app.post('/answer/:index', (req, res) => {
    const {
      index
    } = req.params;

    if (isGameOver) res.json({
      loser: true,
    })


    const question = questions[goodAnswers];
    const isGoodAnswer = question.correctAnswer === Number(index);


    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }
    // Lub krócej

    res.json({
      correct: isGoodAnswer,
      goodAnswers,
    })

  })

}

module.exports = gameRoutes;