import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['modal bottom-sheet'],
    elementId: 'saveRegisterModal',
    hasLabel: Ember.computed.notEmpty('content.label'),

    didInsertElement() {
        var context = this;

        this.$().openModal({
            ready() {
                context.$('#saveRegisterModal input:first-of-type').focus();
            },
            complete() {
                context.sendAction('clearSaveModal');
            }
        });
    },

    actions: {
        saveRegister(register) {
            this.$().closeModal();
            this.sendAction('saveRegister', register);
        },

        clearSaveModal() {
            this.$().closeModal();
            this.sendAction('clearSaveModal');
        }
    }
});
