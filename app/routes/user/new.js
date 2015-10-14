import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    model() {
        return this.store.createRecord('user');
    },
    actions: {
        createUser(user) {
            user.save().then(() => {
                this.set('session.isAuthenticated', true);
                this.transitionTo('calculator');
            }, (err) => {
                this.set('errorMessage', "Something went wrong! Possibly the username is taken?");
                console.error(err);
            });
        }
    }
});
