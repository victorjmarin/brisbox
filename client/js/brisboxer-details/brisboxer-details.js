Template.brisboxerDetails.helpers({
    email: function(){
    	return this.emails[0].address;
    },
    exists: function(){
    	return this._id != undefined;
    },
	verified: function(){
		return this.emails[0].verified;
	},
	editBrisboxer: function(){
		return Session.get('editBrisboxer');
	},
	isCurrentUser:function(id){
		return	Meteor.userId() === id;
	},
	imageProfile: function() {
		if (this.profile.image && this.profile.image != null){
			return "/cfs/files/images/".concat(this.profile.image);
		} else {
			return "/placeholder.png";
		}
	}
});

Template.brisboxerDetails.onRendered(function(){
	var self = this;

	Session.set('editBrisboxer', false);
    this.autorun(function(a) {
        var data = Template.currentData(self.view);
        if(!data) return;
		var assessments = data.assessments;
			if(assessments != undefined && assessments.length > 0){
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
				$el.text("N/A");
				$(".c100:hover > span").css("color", "orange");
				$(".c100 > span").css("color", "white");
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
Template.brisboxerDetails.events({
	'click #edit_button': function(event){
		event.preventDefault();
		Session.set('editBrisboxer', true);
	},
	'click #save_button': function(event){
		event.preventDefault();
        var name = $('#edit_brisboxer_name').val();
        var surname = $('#edit_brisboxer_surname').val();
        var phone = $('#edit_brisboxer_phone').val();

        Meteor.call('updateBrisboxerDetails', name, surname, phone,function(err, res){
            if(res){
                Materialize.toast(TAPi18n.__('brisboxer_details_ok'), 4000) // 4000 is the duration of the toast
            }
        });

		Session.set('editBrisboxer', false);
	}
	,
	'click #cancel_button': function(event){
		event.preventDefault();
		Session.set('editBrisboxer', false);
	}
});
