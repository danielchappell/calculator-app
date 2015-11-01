//import Ember from 'ember';
import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({
    model(params) {
        return this.store.findRecord('register', params.register_id);
    },
    actions: {
        deleteRegister(register) {
            let deletingRecord = register.destroyRecord();
            this.controller.set('deletePromise', deletingRecord);
            deletingRecord.then(() => {
                this.transitionTo('calculator');
            },(err) => {
                console.log(err);
            });
        }
    }
});
