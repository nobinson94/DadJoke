let showAnswerBtn = document.getElementById("showAnswerBtn");
let answerBox = document.getElementById("answerBox");
let answer = document.getElementById("answer");
let question = document.getElementById("question");
let kkk = document.getElementById("afterShowAnswer");
let laughBtn = document.getElementById("laughBtn");
let seriousBtn = document.getElementById("seriousBtn");
let showOtherJoke = document.getElementById("showOtherJoke");
let showYourJoke = document.getElementById("showYourJoke");

let scored = 0;

let xhr = new XMLHttpRequest();

window.onload = function() {
	xhr.open("GET", 'http://127.0.0.1:3000/api/joke/random', true);
	xhr.send();
}

xhr.onreadystatechange = function() {
	if (xhr.readyState === xhr.DONE) { // 요청이 완료되면
	    if (xhr.status === 200 || xhr.status === 201) {
	    	console.log(this.responseText);
			let msg = JSON.parse(this.responseText);
			answer.innerHTML = msg.Answer;
			question.innerHTML = msg.Question;
	    } else {
	      console.error(xhr.responseText);
	    }
  }
} // Implemented elsewhere.

showAnswerBtn.onclick = function() {
	answerBox.classList.toggle("hidden-box");
	kkk.classList.toggle("hidden-box");
}

laughBtn.onclick = function() {
	if(scored !== 1) {
		showOtherJoke.classList.toggle("hidden-box");
		laughBtn.classList.add("btn-light");
		laughBtn.classList.remove("btn-outline-light");
	}
	if(scored === -1) {
		showYourJoke.classList.toggle("hidden-box");
		seriousBtn.classList.add("btn-outline-light");
		seriousBtn.classList.remove("btn-light");
	}
	scored = 1;
}

seriousBtn.onclick = function() {
	if(scored !== -1) {
		showYourJoke.classList.toggle("hidden-box");
		seriousBtn.classList.add("btn-light");
		seriousBtn.classList.remove("btn-outline-light");
	}
	if(scored === 1) {
		showOtherJoke.classList.toggle("hidden-box");
		laughBtn.classList.add("btn-outline-light");
		laughBtn.classList.add("btn-light");
	}

	scored = -1;
}