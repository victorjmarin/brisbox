Template.Faqs.events({
	'click .faqs-question-icon': function(event){
		var question = $(event.target);
		var answer = question.parent().next();
		if (answer.css("display") == "none"){
			answer.slideDown("fast");
		}else if(answer.css("display") !== "none"){
			answer.slideUp("fast");
		}
	}
});