let questions = [];
let currentQuestion = 0;
let score = 0;

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data.sort(() => Math.random() - 0.5).slice(0, 10); // Use 10 random questions
    showQuestion();
  });

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const progressEl = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';

  progressEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  q.options.sort(() => Math.random() - 0.5).forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.classList.add('option');
    li.onclick = () => checkAnswer(li, option);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selectedEl, selectedOption) {
  const correct = questions[currentQuestion].answer;
  const optionEls = document.querySelectorAll('#options li');

  optionEls.forEach(optionEl => {
    optionEl.onclick = null; // disable more clicks
    if (optionEl.textContent === correct) {
      optionEl.classList.add('correct');
    } else if (optionEl === selectedEl) {
      optionEl.classList.add('wrong');
    }
  });

  if (selectedOption === correct) {
    score++;
  }

  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  progressEl.textContent = '';
  progressBar.style.width = '100%';
  scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
}
