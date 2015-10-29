import Ember from 'ember';

export default Ember.Component.extend({
    isDisabled: false,
    tagName: 'button',
    classNames: ['btn-flat'],
    classNameBindings: ['isDisabled:disabled'],
    attributeBindings: ['isDisabled:disabled'],
    click() {
        this.sendAction('action');
    }
});
