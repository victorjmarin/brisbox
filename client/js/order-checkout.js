Template.orderCheckout.events({
    'click #showStripeModal': function(){
        Session.set('showStripeModal', true);
    },
    'click #buttom-next': function(event){
        $('#budget').css('transition', '2s');
        $('#budget').css('background','url(lgnoverlyback.png) repeat,-webkit-linear-gradient(80deg, #612301, #000000)');
        $('#budget').css('background','url(lgnoverlyback.png) repeat,-o-linear-gradient(80deg, #612301, #000000)');
        $('#budget').css('background','url(lgnoverlyback.png) repeat,linear-gradient(170deg, #612301, #000000)');
        $('#budget').css('opacity','0.9');
        $('#budget').css('z-index','500');
        $('#budget').css('left','0');
        $('#budget').css('right','0');
        $('#budget').css('background-color','rgba(0, 0, 0, 0.5)');
        $('#budget').css('will-change','opacity');
        $('#form-stripe').css('transition', '2s');
        $('#prueba').css('background-color','white');
        $('#prueba').css('transition', '2s');
        $('#prueba').css('background','none');
        $('#prueba').css('padding-bottom', '0px');
        $('#number').css(readonly,false);
        $('#cvc').css(readonly,false);
        $('#exp-month').css('readonly','false');
        $('#exp-year').css('readonly','false');
        $('#amount').css('readonly','false');
    }
});