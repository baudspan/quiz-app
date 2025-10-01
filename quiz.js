const startbtn = document.querySelector('.start-btn');
const popupinfo = document.querySelector('.popup-info');
const exitbtn = document.querySelector('.exitbtn');
const main = document.querySelector('.main');
const contbtn = document.querySelector('.contbtn');
const quizsection = document.querySelector('.quizsection');
const quizbox = document.querySelector('.quizbox');
const resultbox = document.querySelector('.resultbox');
const tryagainbtn = document.querySelector('.tryagainbtn');
const gohomebtn = document.querySelector('.gohomebtn');
const time = document.querySelector('.time');

startbtn.onclick = function() {
  popupinfo.classList.add('active');
  main.classList.add('active');
};
exitbtn.onclick = function() {
  popupinfo.classList.remove('active');
  main.classList.remove('active');
};
contbtn.onclick = function() {
  quizsection.classList.add('active');
   popupinfo.classList.remove('active');
   main.classList.remove('active');
   quizbox.classList.add('active');

   showquestions(0);
   questioncounter(1);
   headerscore();
   clearInterval(timerInterval);   
  timeLeft = 60;                  
  startTimer(); 
};
tryagainbtn.onclick = function() {
  clearInterval(timerInterval);
  timeLeft = 60;
  startTimer();
  quizbox.classList.add('active');
  nextbtn.classList.remove('active');
  resultbox.classList.remove('active');
  questioncount=0;
  questionnumb=1;
  userscore=0;
  showquestions(questioncount);
  questioncounter(questionnumb);
  headerscore();

};
gohomebtn.onclick = function() {
  quizsection.classList.remove('active');
  resultbox.classList.remove('active');
  nextbtn.classList.remove('active');
  questioncount=0;
  questionnumb=1;
  userscore=0;
  showquestions(questioncount);
  questioncounter(questionnumb);
  headerscore();

  
};

let questioncount=0;
let questionnumb=1;
let userscore=0;

const nextbtn = document.querySelector('.nextbtn');
nextbtn.onclick = function() {
  if(questioncount < questions.length-1){
  questioncount++;
  showquestions(questioncount);

  questionnumb++;
  questioncounter(questionnumb);
  nextbtn.classList.remove('active');
}
  else{
    console.log('question completed');
    showresultbox();
  }
   
};
const optionlist = document.querySelector('.optionlist');

function showquestions(index){
  const question=document.querySelector('.question');
  question.textContent=`${questions[index].numb}. ${questions[index].question}`
  let optiontag = `<div class="option"><span>${questions[index].option[0]}</span></div>
  <div class="option"><span>${questions[index].option[1]}</span></div>
  <div class="option"><span>${questions[index].option[2]}</span></div>
  <div class="option"><span>${questions[index].option[3]}</span></div>`;

  optionlist.innerHTML = optiontag;

  const option = document.querySelectorAll('.option');
  for(let i = 0; i <option.length; i++ ){
    option[i].setAttribute('onclick','optionselected(this)');
  }
}
function optionselected(answer){
  let useranswer=answer.textContent;
  let correctanswer= questions[questioncount].answer;
  let alloptions = optionlist.children.length;
  if(useranswer==correctanswer){
  answer.classList.add('correct');
  userscore += 1;
  headerscore();
   }
  else{
    answer.classList.add('incorrect');
    for(let i = 0; i < alloptions; i++){
      if(optionlist.children[i].textContent == correctanswer){
        optionlist.children[i].setAttribute('class','option correct');
      }
       
  }

  }

  for(let i = 0; i < alloptions; i++){
    optionlist.children[i].classList.add('disabled')
  }
  nextbtn.classList.add('active');
}
function questioncounter(index){
  const questiontotal=document.querySelector('.totalquestion')
  questiontotal.textContent = `${index} of ${questions.length} questions`;
}
function headerscore(){
  const headerscore= document.querySelector('.headerscore');
  headerscore.textContent = `score: ${userscore}/${questions.length}`
}
function showresultbox(){
  quizbox.classList.remove('active');
  resultbox.classList.add('active');

  const scoretext= document.querySelector('.scoretest');
  scoretext.textContent=`your score ${userscore} out of ${questions.length}`;

  const circularpro= document.querySelector('.circularprogress');
  const proval= document.querySelector('.progressvalue');
  let provalstart=-1;
  let provalend = (userscore / questions.length) * 100;
  let speed=20;

  let progress = setInterval(() => {
    provalstart++;
    //console.log(provalstart);
    proval.textContent=`${provalstart}%`;
    circularpro.style.background = `conic-gradient(rgb(232, 5, 168) ${provalstart * 3.6}deg,rgba(255,255,255,.1) 0deg)`;

    if(provalstart==provalend){
      clearInterval(progress);
    }
  },speed

  );


}
let timeLeft = 60;
let timerInterval;
function startTimer() {
  const timeDisplay = document.querySelector('.time');
  timeDisplay.textContent = formatTime(timeLeft);
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    timeDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeDisplay.textContent = "00:00";
      setTimeout(showresultbox, 1500);
    }
  }, 1000);
}
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

