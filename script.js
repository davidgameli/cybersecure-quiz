let questions = [];
let currentQuestion = 0;
let score = 0;

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data.sort(() => Math.random() - 0.5).slice(0, 10); // pick 10 random
    showQuestion();
  });

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';

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
    optionEl.onclick = null;
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

// ⬇️ THIS is what makes "Next" work
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
  scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
}
