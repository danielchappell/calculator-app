import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'https://blah.herokuapp.com',
    namespace: 'api/v1'
});
