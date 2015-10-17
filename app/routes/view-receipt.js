//import Ember from 'ember';
import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({
    model(params) {
        return this.store.findRecord('register', params.register_id);
    },
    actions: {
        deleteRegister(register) {
            register.destroyRecord().then(() => {
                this.transitionTo('calculator');
            },(err) => {
                console.log(err);
            });
        }
    }
});
