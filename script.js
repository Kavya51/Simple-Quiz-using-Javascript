const questions = [
    {
      question: "Which of the following is not linear data structure?",
      answers: [
        { text: "Stack", correct: false },
        { text: "Queue", correct: false },
        { text: "Linked list", correct: false },
        { text: "Tree", correct: true }
      ]
    },
    {
      question: "How is second element in an array accessed based on pointer notation?",
      answers: [
        { text: "*a+2", correct: false },
        { text: "*(a+2)", correct: true },
        { text: "*(*a+2)", correct: false },
        { text: "&(a+2)", correct: false }
      ]
    },
    {
      question: "When pop() operation is called on an empty queue,what is that condition called?",
      answers: [
        { text: "Underflow", correct: true },
        { text: "Overflow", correct: false },
        { text: "Garbage Value", correct: false },
        { text: "Syntax error", correct: false }
      ]
    },
    {
      question: "Best time complexity of Quicksort?",
      answers: [
        { text: "O(logn)", correct: false },
        { text: "O(n)", correct: false },
        { text: "O(n^2)", correct: false },
        { text: "O(nlogn)", correct: true }
      ]
    },
    {
        question: "Which of the following data structure allows insertion and deletion from both ends",
        answers: [
          { text: "stack", correct: false },
          { text: "queue", correct: false },
          { text: "deque", correct: true },
          { text: "linkedlist", correct: false }
        ]
      }
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();
  