//import Ember from 'ember';
import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({
    queryParams: {
        runningTotal: {replace: true},
        registerTape: {replace: true},
        operand: {replace: true},
        fnName: {replace: true},
        currentTotalFrozen: {replace: true},
        hasSufferedError: {replace: true}
    },
    model() {
        return this.store.findAll('register');
    },
    setupController(controller, model) {
        this._super(controller, model);

        let fnName = controller.get('fnName');

        if (fnName) {
            controller.send(fnName, controller.get('runningTotal'));
        }
    },
    resetController(controller, isExiting) {
        if (isExiting) {
            controller.setProperties({
                runningTotal: '0',
                registerTape: '',
                operand: '',
                fnName: null,
                currentTotalFrozen: false,
                hasSufferedError: false
            });
        }
    }
});
