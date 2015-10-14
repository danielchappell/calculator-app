//import Ember from 'ember';
import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({
    model(params) {
        return this.store.findRecord('register', params.register_id);
    }
});
