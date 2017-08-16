var timeOut;
var tick;
var questionNumber = 1;
var correct = 0;
var incorrect = 0;


function timer(){
	// var timeSet = 30;
	// clearInterval(tick);
	// tick = setInterval(function(){

	// 	$(".clock").html(timeSet);
	// 	timeSet -= 1;

	// 	if (timeSet < 0){
	// 		submitAnswer();
	// 		clearInterval(tick);
	// 	}
	// }, 1000);
}

function submitAnswer(){

	clearInterval(tick);

	if (questionNumber === 1){
		questionNumber++;
		if (!($("#1a").is(":checked")) && ($("#1b").is(":checked")) && !($("#1c").is(":checked")) && !($("#1d").is(":checked"))){
			correct++
			$("#question-1").css("display", "none");
			$("#correct-1").css("display", "block");
			
			var page = setTimeout(function(){
				$("#correct-1").css("display", "none");
				$("#question-2").css("display", "block");
				timer();
			}, 5000)
		}
		else{
			incorrect++
			$("#question-1").css("display", "none");
			$("#wrong-1").css("display", "block");

			var page = setTimeout(function(){
				$("#wrong-1").css("display", "none");
				$("#question-2").css("display", "block");
				timer();
			}, 5000)
		}		
	}

	else if (questionNumber === 2){
		questionNumber++;
		if (($("#2a").is(":checked")) && !($("#2b").is(":checked")) && !($("#2c").is(":checked")) && !($("#2d").is(":checked"))){
			correct++
			$("#question-2").css("display", "none");
			$("#correct-2").css("display", "block");
			
			var page = setTimeout(function(){
				$("#correct-2").css("display", "none");
				$("#question-3").css("display", "block");
				timer();
			}, 6000)
		}
		else{
			incorrect++
			$("#question-2").css("display", "none");
			$("#wrong-2").css("display", "block");

			var page = setTimeout(function(){
				$("#wrong-2").css("display", "none");
				$("#question-3").css("display", "block");
				timer();
			}, 6000)
		}		
	}



};


timer();

$(".submit").on("click", function(){

	submitAnswer();
});


