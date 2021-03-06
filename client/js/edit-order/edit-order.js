Template.EditOrder.helpers({
    hours: function(){
        return this.hours;
    },
    canEditDate: function(){
        return canEditDate(this);
    },
    cannotEdit: function(){
        return !canEditDate(this);
    }
});

function canEditDate(data){
    var hoy = new Date();
    return hoy.getTime()-data.day.getTime()>0 && data.brisboxers.length != data.numberBrisboxers;
}

Template.EditOrder.events({
    'submit #edit-order-form': function (event) {
        $("#codeError").css("display", "none");
        event.preventDefault();
        var code = event.target.code.value;
        var order_id = this._id
        var res = Meteor.call("checkOrderCode", order_id, code, function (error, response) {
            if(response){
                var data = {};
                if(event.target.day){
                    var dia = event.target.day.value.split("/");
                    var diaFormateado = new Date();
                    diaFormateado.setDate(dia[0]);
                    diaFormateado.setMonth(parseInt(dia[1])-1);
                    diaFormateado.setFullYear(dia[2]);
                    data["day"] = diaFormateado;
                }
                if(event.target.startMoment){
                    data["startMoment"] = event.target.startMoment.value;
                }
                Meteor.call("editOrder", order_id, data, function(error, response) {
                    if(response){
                        Router.go('order_dashboard', {_id: Base64.encode(order_id)});
                    }else{
                         $("#error").css("display", "inline");
                    }
                });
            }else{
                $("#codeError").css("display", "inline");
            }
        });
        return false;
    },
    'click #dashboard': function (event) {
        var orderIdCodificado = Base64.encode(this._id);
        Router.go('order_dashboard', {_id: orderIdCodificado});

    }
});

Template.EditOrder.onRendered(function (){
    var tomorrow = new Date();
    tomorrow.setTime(tomorrow.getTime() + 86400000);
    var currentLocale = TAPi18next.lng();
    if (currentLocale == 'es') {
        $('#day').pickadate({
            monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            weekdaysFull: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            weekdaysShort: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
            today: 'Hoy',
            min: tomorrow,
            clear: 'Limpiar fecha',
            close: 'Cerrar',
            firstDay: 1,
            format: 'dd/mm/yyyy',
            formatSubmit: 'yyyy-mm-dd',
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    } else if (currentLocale == 'en') {
        $('#day').pickadate({
            monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekdaysFull: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            weekdaysShort: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'St', 'Su'],
            today: 'Today',
            min: tomorrow,
            clear: 'Clean date',
            close: 'Close',
            firstDay: 1,
            format: 'dd/mm/yyyy',
            formatSubmit: 'yyyy-mm-dd',
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    }
    $('#startMoment').lolliclock({
        autoclose: false,
        hour24:false
    });
});
