/**
 * Created by blezerd on 3/04/16.
 */
AccountController = RouteController.extend({
    verifyEmail: function () {
        Accounts.verifyEmail(this.params.token, function () {
            Meteor.call('verificaEmailDesdeCorreo');
            Router.go('AccountVerified');
        });
    }
});