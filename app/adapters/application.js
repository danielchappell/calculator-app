import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'https://ember-calc.herokuapp.com',
    namespace: 'api/v1'
});
