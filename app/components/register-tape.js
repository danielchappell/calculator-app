import Ember from 'ember';

export default Ember.Component.extend({
    classNames:['register-tape'],
    register: null,

    _scrollToBottom: function() {
        Ember.run.later(this, function() {
            let elem$ = this.$();
            elem$.scrollTop(elem$.prop('scrollHeight'));
        }, 1);
    }.observes('register')
});
