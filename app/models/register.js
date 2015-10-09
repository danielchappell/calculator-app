import DS from 'ember-data';

export default DS.Model.extend({
    register: DS.attr(),
    label: DS.attr(),
    date: DS.attr()
});
