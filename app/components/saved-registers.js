import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['saved-registers'],
    registers: null,
    actions: {
        showRegisterDetails(register) {
            this.get('viewRegister')(register);
        }
    }
});
