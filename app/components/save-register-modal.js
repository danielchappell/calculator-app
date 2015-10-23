import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['modal bottom-sheet'],
    elementId: 'saveRegisterModal',
    hasLabel: Ember.computed.notEmpty('content.label'),

    didInsertElement() {
        this._super();

        $(this.get('element')).openModal({
            ready() {
                $('#saveRegisterModal input:first-of-type').focus();
            }
        });
    },

    actions: {
        saveRegister(register) {
            $(this.get('element')).closeModal();
            this.sendAction('saveRegister', register);
        },

        clearSaveModal() {
            $(this.get('element')).closeModal();
            this.sendAction('clearSaveModal');
        }
    }
});
