import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    model() {
        return this.store.createRecord('user');
    },
    actions: {
        createUser(user) {
            if (!user.get('isValid')) {
                return;
            }

            user.save().then(() => {
                this.set('session.isAuthenticated', true);
                this.transitionTo('calculator');
            }, (err) => {
                console.error(err);
            });
        }
    }
});
