const questions = [
  {
    que: "Which of the following is a markup language?",
    a: "HTML",
    b: "CSS",
    c: "JavaScript",
    d: "PHP",
    correct: "a",
  },
  {
    que: "Which language is used for styling web pages?",
    a: "HTML",
    b: "JQuery",
    c: "CSS",
    d: "XML",
    correct: "c",
  },
  {
    que: "Which is not a JavaScript Framework?",
    a: "Python Script",
    b: "JQuery",
    c: "Django",
    d: "NodeJS",
    correct: "c",
  },
  {
    que: "Which is used to connect to a database in PHP?",
    a: "HTML",
    b: "MySQLi",
    c: "CSS",
    d: "PDO",
    correct: "b",
  },
  {
    que: "What does CSS stand for?",
    a: "Creative Style Sheets",
    b: "Colorful Style Sheets",
    c: "Cascading Style Sheets",
    d: "Computer Style Sheets",
    correct: "c",
  },
  {
    que: "Which HTML tag is used to define an internal style sheet?",
    a: "<css>",
    b: "<script>",
    c: "<style>",
    d: "<link>",
    correct: "c",
  },
  {
    que: "Inside which HTML element do we put the JavaScript?",
    a: "<js>",
    b: "<scripting>",
    c: "<script>",
    d: "<javascript>",
    correct: "c",
  },
  {
    que: "Which HTML attribute is used to define inline styles?",
    a: "styles",
    b: "style",
    c: "class",
    d: "font",
    correct: "b",
  },
  {
    que: "Which property is used to change the background color in CSS?",
    a: "color",
    b: "bgcolor",
    c: "background-color",
    d: "background",
    correct: "c",
  },
  {
    que: "Which symbol is used for comments in JavaScript?",
    a: "//",
    b: "#",
    c: "<!-- -->",
    d: "**",
    correct: "a",
  },
];

let index = 0;
let total = questions.length;
let right = 0;
let wrong = 0;
const queBox = document.getElementById("queBox");
const optionInputs = document.querySelectorAll(".option");
const loadQuestion = () => {
  if (index === total) {
    return end();
  } else {
    reset();
  }

  const data = questions[index];
  queBox.innerText = `${index + 1}. ${data.que}`;
  optionInputs[0].nextElementSibling.innerText = data.a;
  optionInputs[1].nextElementSibling.innerText = data.b;
  optionInputs[2].nextElementSibling.innerText = data.c;
  optionInputs[3].nextElementSibling.innerText = data.d;
};

const submitQuiz = () => {
    const data = questions[index]; // এটা যোগ করো
    const ans = getAnwers();
    if (ans === data.correct) {
      right++;
    } else {
      wrong++;
    }
    index++;
    loadQuestion();
  };
  
const getAnwers = () => {
    for (let input of optionInputs) {
      if (input.checked) {
        return input.value;
      }
    }
    return null;
  };
  
const reset = () => {
  optionInputs.forEach((input) => {
    input.checked = false;
  });
};

const end = () => {
    document.getElementById(
      "box"
    ).innerHTML = `<h3>Thank You for Playing the quiz.</h3>
    <h2>${right} / ${total} are correct</h2>`;
  };
  
loadQuestion();
document.getElementById("submit").addEventListener("click", submitQuiz);