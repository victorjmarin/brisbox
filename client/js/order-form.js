function getParameterByName(variable) {
    return Router.current().params.query[variable]
}

function validate_day_address(loading, unloading, day) {
    var today = new Date();
    console.log(day);
    var validate_day = day.getTime() <= today.getTime();
    if (loading == true || unloading == true) {
        $('.errorAddress').css('visibility', 'hidden');
        if (day == "Invalid Date") {
            $('.errorDay').css('visibility', 'visible');
            return false;
        } else if (validate_day) {
            $('.errorDay').css('visibility', 'visible');
            return false;
        } else {
            $('.errorDay').css('visibility', 'hidden');
        }
    }
    if (loading == false && unloading == false) {
        $('.errorAddress').css('visibility', 'visible');
        if (day == "Invalid Date") {
            $('.errorDay').css('visibility', 'visible');
            return false;
        }
        if (validate_day) {
            $('.errorDay').css('visibility', 'visible');
            return false;
        } else {
            $('.errorDay').css('visibility', 'hidden');
        }
        return false;
    }
}

Template.orderForm.onRendered(function () {
    $('#divAddressUnLoading').css('display', 'none');
    $('#divAddressLoading').css('display', 'none');
    $('#divPortalLoading').css('display', 'none');
    $('#divPortalUnloading').css('display', 'none');
    $('.modal').closeModal();
    $('.lean-overlay').remove();
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
    var zip = getParameterByName("zip");
    if (zip != null) {
        Session.set("zip", zip);
        document.getElementById("label-zip").className = "active";
    } else {
        document.getElementById("label-zip").className = "";
    }
});

Template.orderForm.events({
    'click #loading': function (event) {
        var loading = document.getElementById('loading').checked;
        if (loading == true) {
            $('#divAddressLoading').css('display', 'block');
            $('#divAddressLoading').css('visibility', 'visible');
            $('#divPortalLoading').css('display', 'block');
            $('#divPortalLoading').css('visibility', 'visible');
            $('#addressLoading').prop('required', true);
            $('#portalLoading').prop('required', true);
        }
        if (loading == false) {
            $('#divAddressLoading').css('display', 'none');
            $('#divAddressLoading').css('visibility', 'hidden');
            $('#divPortalLoading').css('display', 'none');
            $('#divPortalLoading').css('visibility', 'hidden');
            $('#addressLoading').prop('required', false);
            $('#portalLoading').prop('required', false);
        }
    },
    'click #unloading': function (event) {
        var unloading = document.getElementById('unloading').checked;
        if (unloading == true) {
            $('#divAddressUnLoading').css('display', 'block');
            $('#divAddressUnLoading').css('visibility', 'visible');
            $('#divPortalUnloading').css('display', 'block');
            $('#divPortalUnloading').css('visibility', 'visible');
            $('#addressUnloading').prop('required', true);
            $('#portalUnloading').prop('required', true);
        }
        if (unloading == false) {
            $('#divAddressUnLoading').css('display', 'none');
            $('#divAddressUnLoading').css('visibility', 'hidden');
            $('#divPortalUnloading').css('display', 'none');
            $('#divPortalUnloading').css('visibility', 'hidden');
            $('#addressUnloading').prop('required', false);
            $('#portalUnloading').prop('required', false);
        }
    },
    'submit #order-form': function (event) {
        event.preventDefault();
        var loading = document.getElementById('loading').checked;
        var unloading = document.getElementById('unloading').checked;
        var dia = document.getElementById('day').value.split("/");
        var diaFormateado = new Date();
        diaFormateado.setDate(dia[0]);
        diaFormateado.setMonth(dia[1]);
        diaFormateado.setFullYear(dia[2]);
        var day = new Date(diaFormateado);
        if (validate_day_address(loading, unloading, day) == false) {
            return false;
        }
        var orderForm = {
            addressLoading: document.getElementById("addressLoading").value,
            addressUnloading: document.getElementById("addressUnloading").value,
            portalLoading: document.getElementById("portalLoading").value,
            portalUnloading: document.getElementById("portalUnloading").value,
            zip: document.getElementById("zip").value,
            loading: document.getElementById("loading").value,
            unloading: document.getElementById("unloading").value,
            comments: document.getElementById("comments1").value,
            numberBrisboxers: document.getElementById("numberBrisboxers").value,
            hours: document.getElementById("hours").value,
            startMoment: document.getElementById("startMoment").value,
            day: document.getElementById("day").value,
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            brisboxers: []
        };
        sessionStorage.setItem("addressLoading", orderForm.addressLoading);
        sessionStorage.setItem("addressUnloading", orderForm.addressUnloading);
        sessionStorage.setItem("portalLoading", orderForm.portalLoading);
        sessionStorage.setItem("portalUnloading", orderForm.portalUnloading);
        sessionStorage.setItem("zip", orderForm.zip);
        sessionStorage.setItem("loading", orderForm.loading);
        sessionStorage.setItem("unloading", orderForm.unloading);
        sessionStorage.setItem("comments", orderForm.comments);
        sessionStorage.setItem("numberBrisboxers", orderForm.numberBrisboxers);
        sessionStorage.setItem("hours", orderForm.hours);
        sessionStorage.setItem("startMoment", orderForm.startMoment);
        sessionStorage.setItem("day", orderForm.day);
        sessionStorage.setItem("name", orderForm.name);
        sessionStorage.setItem("surname", orderForm.surname);
        sessionStorage.setItem("phone", orderForm.phone);
        sessionStorage.setItem("email", orderForm.email);
        Router.go("order-checkout");
    }
})
;


Template.orderForm.onRendered(function () {
    GoogleMaps.load();
});

Template.orderForm.helpers({
    exampleMapOptions: function () {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(37.389434, -5.984706),
                zoom: 13
            };
        }
    },
    zip: function () {
        var zip = Session.get("zip");
        return zip;
    }
});

Template.orderForm.onCreated(function () {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function (map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
});
