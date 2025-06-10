const questions = [
  {
    question: "What does 'phishing' mean in cybersecurity?",
    options: ["A type of encryption", "A hacking technique", "A malware type", "A security protocol"],
    answer: "A hacking technique"
  },
  {
    question: "What is a strong password?",
    options: ["123456", "yourname", "P@ssw0rd123!", "abcdefg"],
    answer: "P@ssw0rd123!"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.sort(() => Math.random() - 0.5); // shuffle options
  q.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.onclick = () => checkAnswer(option);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) score++;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionEl.textContent = "Quiz completed!";
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  scoreEl.textContent = `Your score: ${score} / ${questions.length}`;
}

nextBtn.addEventListener('click', showQuestion);

showQuestion();

