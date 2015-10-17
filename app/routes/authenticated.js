import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    beforeModel(transition) {
        this.get('session').checkAuth().catch(() => {
            transition.abort();
            this.set('session.attemptedTransition');
            this.transitionTo('login');
        });
    }
});
