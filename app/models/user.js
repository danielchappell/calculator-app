import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    username: DS.attr(),
    password: DS.attr(),
    isUsernameValid: function() {
        return this.get('username') && this.get('username').length > 5;
    }.property('username'),
    isPasswordValid: function() {
        return this.get('password') && this.get('password').length > 8;
    }.property('password'),
    isValid: Ember.computed.and('isUsernameValid', 'isPasswordValid'),
    isNotValid: Ember.computed.not('isValid')
});
