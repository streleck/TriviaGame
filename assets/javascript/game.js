var questionNum = 1;
var response = [0,0,0,0];
var answers = [[0,1,0,0],[1,0,0,0],[1,1,1,1],[0,0,0,1],[1,0,0,0],[0,0,1,0]];
var correct = 0;


var content = {
	questionList: ["Which animal attacks it's prey by delivering a punch with greater acceleration than a bullet?", "Which of these animals is believed to have the longest lifespan?", "Which of the following animals are herbivores? (check all that apply)", "Which of the following is a special ability of Sacoglassa Sea Slugs?", "A newborn Kangaroo is about the same size as...", "How many times per minute can a hummingbird flap its wings?"],
	answerList: [["Kangaroo","Mantis Shrimp", "Gorilla", "Bullet Beetle"],["Greenland Shark", "Galapagos Tortise", "Human", "Bowhead Whale"],["Elephants", "Koalas", "Rhinoceros", "Parrots"], ["They can swallow prey bigger than themselves", "They can change color depending on water temperature", "They can bury themselves in the ground for months if food is scarce", "They can photosynthesize."], ["lima bean", "plum", "grapefruit", "watermelon"], ["300", "1,000", "3,000", "10,000"]],
	image: ["<img id='mantis-pic' alt='punching mantis shrimp' src='assets/images/mantis_shrimp.gif'>", "<img id='shark-pic' alt='greenland shark' src='assets/images/shark.jpg'>", "<img id='elephant-pic' alt='elephant eating a whole watermelon' src='assets/images/elephant.jpg'>", "<img id='slug-pic' alt='green sea slug' src='assets/images/sea_slug.jpg'>", "<img id='kangaroo-pic' alt='baby kangaroo in pouch' src='assets/images/kangaroo.jpg'>", "<img id='hummingbird-pic' alt='hummingbird mid-air' src='assets/images/hummingbird.gif'>"],
	info: ["Some species of mantis shrimps can punch with an acceleration of up to 10,400 gs!", "The oldest Greenland Sharks have lived for an extimated 392 years! The others have impressive lifespans as well: Bowhead whales at ~ 200 years, Galapagos tortises at ~ 190 years, and human Jeanne Calment lived to 122.", "All of these animals subsist mostly on plants or seeds. As you can see, it doesn't take meat to grow to a very large size!", "Sacoglossia typically subsist on algae, but when food is scarce, they can utilize the chloroplasts from algae to gather solar energy. Amazing!", "Though they are born blind, hairless, and only a few centimeters tall, newborn kangaroos climb under their own power from their mothers vaginas up to the pouch!", "Beating their wings over 300 times per minute takes energy. Hummingbirds have the highest metabolic rate of any warm-blooded animal."],
	spiritAnimal: ["Possum", "Gecko", "Fox", "Penguin", "Polar Bear", "Camel", "Moorish Idol"],
	spiritPic: ["<img id='possum' alt='possum' src='assets/images/possum.jpg'>", "<img id='gecko' alt='gecko with wide open mouth' src='assets/images/gecko.jpg'>", "<img id='fox' alt='fox' src='assets/images/fox.jpg'>", "<img id='penguin' alt='penguin' src='assets/images/penguin.jpg'>", "<img id='polar-bear' alt='polar-bear' src='assets/images/polar-bear.jpg'>", "<img id='camel' alt='camel' src='assets/images/camel.jpg'>", "<img id='moorish-idol' alt='moorish-idol' src='assets/images/moorish-idol.jpg'>"]
}


function timer(){
	var timeSet = 14;

	tick = setInterval(function(){

		$(".clock").html(timeSet);
		timeSet -= 1;

		if (timeSet < 0){
			submitAnswer();
			clearInterval(tick);
		}
	}, 1000);
}


function submitAnswer(){
	//make an array of which boxes checked in binary form
	response.fill(0);
	for (i=0; i < 4; i++){
		if ($("#answer"  + (i + 1)).is(":checked")){
			response[i] = 1;
		}
	}
	//compare to answer array for that question
	if((response[0] == answers[questionNum -1][0]) && 
		(response[1] == answers[questionNum -1][1]) &&
		(response[2] == answers[questionNum -1][2]) &&
		(response[3] == answers[questionNum -1][3])){
		
		//if correct, display answer page(correct answer), increase correct counter,increase question number counter
		displayAnswer(questionNum, true);
		questionNum++;
		correct++
		//give correct answer page 5 seconds, then load new question
		var page = setTimeout(function(){
			displayQuestion(questionNum);
		}, 5000)
	}

	else{
		//if correct, display correct page, increase correct counter,increase question number counter
		displayAnswer(questionNum, false);
		questionNum++
		//show answer for 5 seconds, then display next question
		var page = setTimeout(function(){
			displayQuestion(questionNum);
		}, 5000)
	}
}


function displayQuestion(questionNum){
	console.log(questionNum)

//if still in answer range, display question content
	if(questionNum < 7){
		$(".clock").html(15);
		timer();
		$("#answer-box").css("display","none");
		$("#question-box").css("display","block");
		$("#question").html(content.questionList[questionNum - 1]);
		$("#choice1").html(content.answerList[questionNum -1][0]);
		$("#choice2").html(content.answerList[questionNum -1][1]);
		$("#choice3").html(content.answerList[questionNum -1][2]);
		$("#choice4").html(content.answerList[questionNum -1][3]);
	}
//else, display the final results page
	else{
		resultsPage();
	}
}


function displayAnswer(questionNum, correctness){
	clearInterval(tick)
	$(".form-check-input").prop('checked',false)
	$("#question-box").css("display","none");
	$("#answer-box").css("display","block");
	$(".pic-box").html(content.image[questionNum - 1]);
	$("#answer-info").html(content.info[questionNum - 1]);
	if (correctness){
		$("#right-wrong").html("You're Right!");
	}
	else{
		$("#right-wrong").html("Wrong!");
	}
}



function resultsPage(){
	$("#answer-box").css("display","none");
	$("#results-box").css("display","block");
	$("#correct-answers").html(correct);
	$("#spirit-pic").html(content.spiritPic[correct]);
	$("#spirit-animal").html(content.spiritAnimal[correct]);
	$("#restart").on("click", function(){
		correct = 0;
		questionNum = 1;
		$("#results-box").css("display","none");
		displayQuestion(1);
	})
}


displayQuestion(1);
$("#submit").on("click", submitAnswer);
