import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    actions: {
        goBack() {
            window.history.back();
        },
        logout() {
            this.get('session').logout().then(() => {
                this.transitionTo('login');
            });
        }
    }
});
