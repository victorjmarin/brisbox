Template.listAllOrders.helpers({
    orders: function () {
        var user_id = Meteor.userId();
        orders = Orders.find({
            $where: "this.brisboxers.length < this.numberBrisboxers",
            "brisboxers._id": {$ne: user_id}
        });
        return orders;
    }
});

Template.listAllOrders.onRendered(function () {
    var $container = $('.isotope').isotope({
        // main isotope options
        itemSelector: '.grid-item',
        transitionDuration: '0.5s',
        // set layoutMode
        layoutMode: 'masonry',
        // options for masonry layout mode
        masonry: {
            columnWidth: 328,
            gutter: 30,
        },
        getSortData: {
            hours: '[data-hours]',
            left: '[data-left]'
        }
    });
    var iso = $container.data('isotope');
    $container.isotope('reveal', iso.items);
})

sortByHoursCrit = true;
sortByLeftCrit = true;

Template.listAllOrders.events({
    'click #byDuration': function (event) {
        event.preventDefault();
        $('.isotope').isotope({
            sortBy: 'hours',
            sortAscending: sortByHoursCrit
        });
        sortByHoursCrit = !sortByHoursCrit
    },
    'click #byLeft': function (event) {
        event.preventDefault();
        $('.isotope').isotope({
            sortBy: 'left',
            sortAscending: sortByLeftCrit
        });
        sortByLeftCrit = !sortByLeftCrit
    },
    'click #random': function (event) {
        event.preventDefault();
        $('.isotope').isotope({
            sortBy: 'random'
        });
    },
    'click #original': function (event) {
        event.preventDefault();
        $('.isotope').isotope({
            sortBy: 'original-order'
        });
    }
});