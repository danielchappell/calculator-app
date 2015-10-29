import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    beforeModel(transition) {
        return this.get('session').checkAuth().catch(() => {
            transition.abort();
            this.set('session.attemptedTransition');
            this.transitionTo('login');
        });
    }
});
