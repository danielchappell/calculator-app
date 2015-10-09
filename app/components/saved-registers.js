import Ember from 'ember';

export default Ember.Component.extend({
    registers: null,
    actions: {
        showRegisterDetails(register) {
            this.viewRegister(register);
        }
    }
});
