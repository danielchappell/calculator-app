//import Ember from 'ember';
import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({
    queryParams: {
        display: {replace: true},
        registerDisplay: {replace: true},
        registerBuffer: {replace: true}
    },
    model() {
        return this.store.findAll('register');
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
