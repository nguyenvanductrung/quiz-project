// let questions = [];
// let currentIndex = 0;
// let userAnswers = new Array(262).fill(null);

// async function loadQuestions() {
//     try {
//         const response = await fetch('questions.json');
//         questions = await response.json();
//         initializeQuiz();
//     } catch (error) {
//         console.error('Error loading questions:', error);
//     }
// }

// function initializeQuiz() {
//     populateQuestionSelect();
//     renderQuestion();
//     document.getElementById('prev-btn').addEventListener('click', () => {
//         if (currentIndex > 0) {
//             currentIndex--;
//             renderQuestion();
//         }
//     });
//     document.getElementById('next-btn').addEventListener('click', () => {
//         if (currentIndex < questions.length - 1) {
//             currentIndex++;
//             renderQuestion();
//         }
//     });
//     document.getElementById('submit-btn').addEventListener('click', showResult);
//     document.getElementById('question-select').addEventListener('change', (e) => {
//         currentIndex = parseInt(e.target.value);
//         renderQuestion();
//     });
// }

// function populateQuestionSelect() {
//     const select = document.getElementById('question-select');
//     for (let i = 1; i <= questions.length; i++) {
//         const option = document.createElement('option');
//         option.value = i - 1;
//         option.textContent = `Câu hỏi ${i}`;
//         select.appendChild(option);
//     }
// }

// function renderQuestion() {
//     const question = questions[currentIndex];
//     document.getElementById('question-number').textContent = `Câu hỏi ${currentIndex + 1}/${questions.length}`;
//     document.getElementById('question-text').textContent = question.question;
//     const choicesDiv = document.getElementById('choices');
//     choicesDiv.innerHTML = '';
    
//     question.choices.forEach((choice, index) => {
//         const btn = document.createElement('button');
//         btn.className = 'choice-btn';
//         btn.textContent = `${String.fromCharCode(65 + index)}. ${choice}`;
        
//         // Nếu đã chọn đáp án
//         if (userAnswers[currentIndex] !== null) {
//             const isCorrect = String.fromCharCode(65 + index) === question.correct;
//             const isSelected = userAnswers[currentIndex] === index;
            
//             if (isCorrect) {
//                 btn.classList.add('correct');
//             } else if (isSelected) {
//                 btn.classList.add('incorrect');
//             }
//             btn.disabled = true;
//         } else {
//             btn.addEventListener('click', () => {
//                 userAnswers[currentIndex] = index;
//                 renderQuestion();
//             });
//         }
        
//         choicesDiv.appendChild(btn);
//     });
    
//     document.getElementById('question-select').value = currentIndex;
//     document.getElementById('prev-btn').disabled = currentIndex === 0;
//     document.getElementById('next-btn').style.display = currentIndex === questions.length - 1 ? 'none' : 'inline-block';
//     document.getElementById('submit-btn').style.display = currentIndex === questions.length - 1 ? 'inline-block' : 'none';
// }

// function showResult() {
//     let score = 0;
//     userAnswers.forEach((answer, index) => {
//         if (answer !== null && String.fromCharCode(65 + answer) === questions[index].correct) {
//             score++;
//         }
//     });
//     const resultDiv = document.getElementById('result');
//     resultDiv.style.display = 'block';
//     resultDiv.textContent = `Bạn đã ghi được ${score} trên tổng số ${questions.length}`;
//     document.getElementById('navigation').style.display = 'none';
//     document.getElementById('jump-to-question').style.display = 'none';
//     document.getElementById('question-text').style.display = 'none';
//     document.getElementById('choices').style.display = 'none';
// }

// loadQuestions();
let questions = [];
let currentIndex = 0;
let userAnswers = new Array(262).fill(null);

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        initializeQuiz();
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

function initializeQuiz() {
    populateQuestionSelect();
    renderQuestion();
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    });
    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            renderQuestion();
        }
    });
    document.getElementById('submit-btn').addEventListener('click', showResult);
    document.getElementById('question-select').addEventListener('change', (e) => {
        currentIndex = parseInt(e.target.value);
        renderQuestion();
    });
    document.getElementById('shuffle-btn').addEventListener('click', shuffleQuestions);
}

function populateQuestionSelect() {
    const select = document.getElementById('question-select');
    select.innerHTML = '';
    for (let i = 1; i <= questions.length; i++) {
        const option = document.createElement('option');
        option.value = i - 1;
        option.textContent = `Câu hỏi ${i}`;
        select.appendChild(option);
    }
}

// function renderQuestion() {
//     const question = questions[currentIndex];
//     document.getElementById('question-number').textContent = `Câu hỏi ${currentIndex + 1}/${questions.length}`;
//     document.getElementById('question-text').textContent = question.question;
//     const choicesDiv = document.getElementById('choices');
//     choicesDiv.innerHTML = '';
    
//     question.choices.forEach((choice, index) => {
//         const btn = document.createElement('button');
//         btn.className = 'choice-btn';
//         btn.textContent = `${String.fromCharCode(65 + index)}. ${choice}`;
        
//         if (userAnswers[currentIndex] !== null) {
//             const isCorrect = String.fromCharCode(65 + index) === question.correct;
//             const isSelected = userAnswers[currentIndex] === index;
            
//             if (isCorrect) {
//                 btn.classList.add('correct');
//             } else if (isSelected) {
//                 btn.classList.add('incorrect');
//             }
//             btn.disabled = true;
//         } else {
//             btn.addEventListener('click', () => {
//                 userAnswers[currentIndex] = index;
//                 renderQuestion();
//             });
//         }
        
//         choicesDiv.appendChild(btn);
//     });
    


function renderQuestion() {
    const question = questions[currentIndex];
    document.getElementById('question-number').textContent = `Câu hỏi ${currentIndex + 1}/${questions.length}`;
    document.getElementById('question-text').textContent = question.question;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');

    question.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = `${String.fromCharCode(65 + index)}. ${choice}`;
        
        if (userAnswers[currentIndex] !== null) {
            const isCorrect = String.fromCharCode(65 + index) === question.correct;
            const isSelected = userAnswers[currentIndex] === index;
            
            if (isCorrect) {
                btn.classList.add('correct');
            } else if (isSelected) {
                btn.classList.add('incorrect');
            }
            btn.disabled = true;
        } else {
            btn.addEventListener('click', () => {
                userAnswers[currentIndex] = index;
                const isCorrect = String.fromCharCode(65 + index) === question.correct;
                
                if(isCorrect) {
                    correctSound.currentTime = 0;
                    correctSound.play();
                } else {
                    wrongSound.currentTime = 0;
                    wrongSound.play();
                }
                
                renderQuestion();
            });
        }
        
        choicesDiv.appendChild(btn);
    });
    document.getElementById('question-select').value = currentIndex;
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    document.getElementById('next-btn').style.display = currentIndex === questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = currentIndex === questions.length - 1 ? 'inline-block' : 'none';
}

function showResult() {
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer !== null && String.fromCharCode(65 + answer) === questions[index].correct) {
            score++;
        }
    });
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.textContent = `Bạn đã ghi được ${score} trên tổng số ${questions.length}`;
    document.getElementById('navigation').style.display = 'none';
    document.getElementById('jump-to-question').style.display = 'none';
    document.getElementById('question-text').style.display = 'none';
    document.getElementById('choices').style.display = 'none';
}

function shuffleQuestions() {
    if(confirm('Bạn có chắc muốn đảo thứ tự các câu hỏi? Tiến trình hiện tại sẽ bị mất.')) {
        shuffleArray(questions);
        currentIndex = 0;
        userAnswers = new Array(questions.length).fill(null);
        populateQuestionSelect();
        renderQuestion();
        alert('Đã đảo thứ tự câu hỏi!');
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

loadQuestions();