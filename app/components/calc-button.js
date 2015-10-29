import Ember from 'ember';

export default Ember.Component.extend({
    isDisabled: false,
    tagName: 'button',
    classNames: ['btn-flat', 'waves-effect', 'waves-light'],
    classNameBindings: ['isDisabled:disabled'],
    attributeBindings: ['isDisabled:disabled'],
    click() {
        this.sendAction('action');
    }
});
