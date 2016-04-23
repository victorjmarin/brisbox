Template.brisboxerDetails.helpers({
    email: function(){
    	return this.emails[0].address;
    },
    exists: function(){
    	return this._id != undefined;
    },
    verified: function(){
        return this.emails[0].verified;
    }
});

Template.brisboxerDetails.onRendered(function(){
	var self = this;

    this.autorun(function(a) {
        var data = Template.currentData(self.view);
        if(!data) return;
		var assessments = data.assessments;

			if(assessments.length > 0){
					var $el = $("#assessment-avg"),
					$circle =$("#circle-avg"),
					$bar = $(".bar"),
					$fill = $(".fill"),
			        value = getAssessmentAvg(assessments);

			        $bar.css("border-color", "red");
			        $fill.css("border-color", "red");
			
					$({percentage: 0}).stop(true).animate({percentage: value}, {
				        duration : 4000,
				        easing: "easeOutExpo",
				        step: function () {
				            // percentage with 1 decimal;
				            var percentageVal = Math.round(this.percentage * 10) / 10;
				            $circle.removeClass();
				        	$circle.addClass("c100" + " big" + " p"+(percentageVal*10))
				            $el.text(percentageVal);
				            if(percentageVal < 3){
				           		$bar.css("border-color", "red");
				        		$fill.css("border-color", "red");
				        		$(".c100:hover > span").css("color", "red");
				        		$(".c100 > span").css("color", "red");
				            }else if(percentageVal >=3 && percentageVal < 6){
				            	$bar.css("border-color", "yellow");
				        		$fill.css("border-color", "yellow");
				        		$(".c100:hover > span").css("color", "yellow");
				        		$(".c100 > span").css("color", "yellow");
				            }else{
				            	var green = "#558b2f"
				            	$bar.css("border-color", green);
				        		$fill.css("border-color", green);
				        		$(".c100:hover > span").css("color", green);
				        		$(".c100 > span").css("color", green);
				            }
			        	}
			   		}).promise().done(function () {
				        // hard set the value after animation is done to be
				        // sure the value is correct
				        $el.text(value);
			   	 	});
			}else{
				var $el = $("#assessment-avg");
				$el.text("-");
			}
    });
	
});

function getAssessmentAvg(assessments){
	var res = 0.0;
	for(var x in assessments){
		res += assessments[x].rating;
	}
	res = res / assessments.length;
	res = Math.round(res*100) / 100;
	return res;
}
