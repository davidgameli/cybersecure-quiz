let questions = [];
let currentQuestion = 0;
let score = 0;

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data.sort(() => Math.random() - 0.5).slice(0, 10); // Show 10 random from the full set
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
  nextBtn.style.display = 'none'; // hide until answer is picked
  q.options.sort(() => Math.random() - 0.5);

  q.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.classList.add('option');
    li.onclick = () => checkAnswer(li, option);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selectedEl, selectedOption) {
  const correct = questions[currentQuestion].answer;
  const optionsList = document.querySelectorAll('#options li');

  optionsList.forEach(optionEl => {
    optionEl.onclick = null; // disable all further clicks
    if (optionEl.textContent === correct) {
      optionEl.classList.add('correct');
    } else if (optionEl === selectedEl) {
      optionEl.classList.add('wrong');
    }
  });

  if (selectedOption === correct) {
    score++;
  }

  nextBtn.style.display = 'inline-block'; // show next button
}

