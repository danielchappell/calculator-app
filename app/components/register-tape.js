import Ember from 'ember';

export default Ember.Component.extend({
    classNames:['register-tape white'],
    register: null,

    didInsertElement: function() {
        this.sendAction('registerUpdated');
    }.observes('register'),

    watchRegister: function() {
        this.sendAction('registerUpdated');
    }.observes('register')
});
