import { questions } from "./modules/question.js";
import { comment_1, comment_2, comment_3 } from "./modules/rezult.js";
import { a, b } from "./modules/rezult.js";

let index = 0;
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const rezult = document.getElementById("rezult");
const main = document.getElementById("main-container");
const restartBtn = document.getElementById("restart");

function start() {
  question.innerHTML = questions[index].title;
  // ボタン要素を作成して、textとvalueを紐づける
  questions[index].answers.forEach((el) => {
    const choiseBtn = document.createElement("button");
    // クラスを付与
    choiseBtn.classList.add("button");
    // ボタンにtext追加
    choiseBtn.innerText = el.text;
    // ボタンにvalueを追加
    choiseBtn.dataset.value = el.value;
    // 親要素にappend
    answers.appendChild(choiseBtn);
    // 要素の縦並び<br>を入れる
    answers.appendChild(document.createElement("br"));
    // ボタンをクリックした時に要素を取得
    choiseBtn.addEventListener("click", selectAns);

    const div = document.createElement("div");
    div.innerText = "";
    rezult.appendChild(div);
  });
}
const numArray = [];
function selectAns(e) {
  numArray.push(e.target.dataset.value);
  if (index < questions.length - 1) {
    reset();
    index++;
    start();
  } else {
    while (answers.firstChild) {
      answers.removeChild(answers.firstChild);
    }
    restartBtn.classList.remove("hide");
    question.innerText = "結果発表";

    let intNum = numArray.map(Number);
    let total = intNum.reduce(function (sum, el) {
      return sum + el;
    });

    if (total < a) {
      const div = document.createElement("div");
      div.innerText = total + comment_1;
      rezult.appendChild(div);
      numArray.length = 0;
    } else if (total < b) {
      const div = document.createElement("div");
      div.innerText = total + comment_2;
      rezult.appendChild(div);
      numArray.length = 0;
    } else {
      const div = document.createElement("div");
      div.innerText = total + comment_3;
      rezult.appendChild(div);
      total = 0;
      numArray.length = 0;
    }
  }
}

function reset() {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }
}

restartBtn.addEventListener("click", () => {
  index = 0;
  restartBtn.classList.add("hide");
  main.classList.remove("hide");
  start();
  restartBtn.innerText = "もういちど";

  while (rezult.firstChild) {
    rezult.removeChild(rezult.firstChild);
  }
});
