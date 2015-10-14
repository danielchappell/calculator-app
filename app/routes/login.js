import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    model() {
        return Ember.Object.create({
            username: null,
            password: null
        });
    },
    actions: {
        login(username, password) {
            this.get('session').login(username, password).then(() => {
                if (this.get('session.attemptedTransition')) {
                    this.get('session.attemptedTransition').retry();
                    this.set('sesssion.attemptedTransition', null);
                } else {
                    this.transitionTo('calculator');
                }
            });
        }
    }
});
