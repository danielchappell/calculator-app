import Ember from 'ember';

export default Ember.Component.extend({
    classNames:['register-tape white'],
    register: null,

    hasRegister: Ember.computed.notEmpty('register'),

    /**
        Trims register and replaces line breaks with break tags for display.
        (Could not combine `white-space: pre;` with `vertical-align: bottom;`)

        @property registerDisplay
        @return {String} Register display string.
     */
    registerDisplay: function() {
        var register = this.get('register') || '';
        return register.trim().replace(/(\n)+/g, '<br />');
    }.property('register'),

    scrollRegister: function() {
        Ember.run.later(this, function() {
            let elem$ = this.$(this.element);
            elem$.scrollTop(elem$.prop('scrollHeight'));
        }, 1);
    }.on('didInsertElement').observes('register')
});
