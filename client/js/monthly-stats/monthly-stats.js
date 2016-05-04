Template.monthlyStats.helpers({
    month: function(){
        var currentLocale = TAPi18next.lng();
        if (currentLocale == 'es'){
            var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        } else if (currentLocale == 'en'){
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
        var today = new Date();
        var currentMonth = months[today.getMonth()];
        return currentMonth;
    }
});