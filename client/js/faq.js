Template.Faq.events({
	'click .faqs-question-icon': function(event){
		var question = $(event.target);
		var answer = question.parent().parent().next();
		if (answer.css("display") == "none"){
			answer.slideDown("fast");
		}else if(answer.css("display") !== "none"){
			answer.slideUp("fast");
		}
	},
	'click .faqs-question-text': function(event){
		var question = $(event.target);
		var answer = question.parent().parent().next();
		if (answer.css("display") == "none"){
			answer.slideDown("fast");
		}else if(answer.css("display") !== "none"){
			answer.slideUp("fast");
		}
	}
});

Template.Faq.onRendered(function(){
	var id_question = getIdQuestionByURL();
	if(id_question != null){
		$i = $(id_question + " > .faqs-answer");
		if($i.css("display") == "none"){
			$i.slideDown("fast");
		}
	}
});

function getIdQuestionByURL(){
	var url = window.location.href;
	var id_question = url.match(/#(\w+)/g);
	if (id_question == null || id_question.length != 1){
		return null;
	}
	return id_question[0];
}