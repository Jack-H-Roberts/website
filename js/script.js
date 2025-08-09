// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Game data
const gameQuestions = [
    {
        question: "Does Jack prefer waffles or pancakes?",
        options: ["Waffles", "Pancakes"],
        answer: "Waffles",
        explanation: "I prefer the crispiness of waffles to the fluffiness of pancakes."
    },
    {
        question: "If Jack could only eat one cuisine forever, what would it be?",
        options: ["Italian", "Mexican", "Chinese", "Indian"],
        answer: "Mexican",
        explanation: "Too many of my favorite foods are Mexican, like fajitas and quesadillas."
    },
    {
        question: "Vacation to the lake or to the beach?",
        options: ["Lake", "Beach"],
        answer: "Lake",
        explanation: "I love jet skiing and tubing at the lake, as well as the peacefulness of the water."
    },
    {
        question: "What's Jack's secret talent?",
        options: ["Chess", "Pottery", "Golf", "Robotics"],
        answer: "Chess",
        explanation: "I have played chess for years and am in the top 0.5% of players worldwide."
    },
    {
        question: "What was Jack's first programming language?",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: "Java",
        explanation: "I started with object-oriented programming in Java in high school."
    },
    {
        question: "What language did Jack study in college?",
        options: ["Spanish", "Japanese", "German", "French"],
        answer: "Japanese",
        explanation: "I studied Japanese for four semesters and nearly completed an Asian Studies major."
    },
    {
        question: "Jack's coding style preference: camelCase or snake_case?",
        options: ["camelCase", "snake_case"],
        answer: "snake_case",
        explanation: "it_is_just_so_much_more_readable"
    },
    {
        question: "The eternal debate - tabs or spaces?",
        options: ["Tabs", "Spaces"],
        answer: "Tabs",
        explanation: "Tabs are more flexible and easier to manage, making them my prefered choice."
    },
    {
        question: "What's Jack's go-to data visualization tool?",
        options: ["Excel", "Tableau", "Matplotlib", "ggplot2", "Power BI"],
        answer: "ggplot2",
        explanation: "I love the control and aesthetics of ggplot2."
    },
    {
        question: "What's Jack's secret passion project?",
        options: ["Mobile app development", "Vlogging", "Game development", "Woodworking"],
        answer: "Game development",
        explanation: "One day I hope to release the game I always wanted to play as a kid."
    }
];

let currentQuestion = 0;
let score = 0;
let gameComplete = false;

function loadQuestion() {
    if (currentQuestion >= gameQuestions.length) {
        showFinalScore();
        return;
    }

    const question = gameQuestions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-counter').textContent = `Question ${currentQuestion + 1} of ${gameQuestions.length}`;
    
    const optionsContainer = document.getElementById('game-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'game-button';
        button.textContent = option;
        button.onclick = () => answerQuestion(option);
        optionsContainer.appendChild(button);
    });

    document.getElementById('game-result').innerHTML = '';
}

function answerQuestion(selectedAnswer) {
    if (gameComplete) return;

    const question = gameQuestions[currentQuestion];
    const resultDiv = document.getElementById('game-result');
    const buttons = document.querySelectorAll('.game-button');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedAnswer === question.answer) {
        score++;
        resultDiv.innerHTML = `<p style="color: #5865f2; margin-top: 1rem;">Correct! ✓</p>`;
    } else {
        resultDiv.innerHTML = `<p style="color: #ed4245; margin-top: 1rem;">Not Quite!</p>`;
    }
    resultDiv.innerHTML += `<p class="explanation">${question.explanation}</p>`;

    // Add next question button or show final score
    if (currentQuestion < gameQuestions.length - 1) {
        resultDiv.innerHTML += '<button class="game-button next-question-btn" onclick="nextQuestion()" style="display: block; margin: 1rem auto 0;">Next Question</button>';
    } else {
        resultDiv.innerHTML += '<button class="game-button next-question-btn" onclick="showFinalScore()" style="display: block; margin: 1rem auto 0;">See Final Score</button>';
    }
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function showFinalScore() {
    gameComplete = true;
    const gameContainer = document.querySelector('.game-container');
    const percentage = Math.round((score / gameQuestions.length) * 100);
    
    let message = '';
    if (percentage === 100) {
        message = "Perfect! You know Jack really well! 🎉";
    } else if (percentage >= 80) {
        message = "Impressive! You've got Jack figured out! 👏";
    } else if (percentage >= 60) {
        message = "Not bad! You know Jack pretty well. 👍";
    } else if (percentage >= 40) {
        message = "Getting there! Jack is more mysterious than expected. 🤔";
    } else {
        message = "Jack remains an enigma! Better luck next time. 😄";
    }

    gameContainer.innerHTML = `
        <div class="game-complete">
            <div class="score-display">Final Score: ${score}/${gameQuestions.length} (${percentage}%)</div>
            <p>${message}</p>
            <button class="game-button" onclick="restartGame()" style="margin-top: 1rem;">Play Again</button>
        </div>
    `;
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    gameComplete = false;
    
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = `
        <div class="game-question" id="question-text"></div>
        <div class="game-options" id="game-options"></div>
        <div id="game-result"></div>
        <div class="game-progress">
            <span id="question-counter"></span>
        </div>
    `;
    
    loadQuestion();
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
});