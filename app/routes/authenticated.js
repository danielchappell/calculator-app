import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    beforeModel(transition) {
        if (!this.get('session.isAuthenticated')) {
            transition.abort();
            this.set('session.attemptedTransition');
            this.transitionTo('login');
        }
    }
});
