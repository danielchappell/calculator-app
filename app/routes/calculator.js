import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        display: {replace: true},
        registerDisplay: {replace: true},
        registerBuffer: {replace: true}
    },
    model() {
        //return this.store.findAll('register');
    },
    resetController(controller, isExiting) {
        if (isExiting) {
            controller.setProperties({
                registerBuffer: [],
                currentExpression: [],
                registerTape: []
            });
        }
    }
});
