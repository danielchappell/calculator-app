import Ember from 'ember';

/**
 Pass promise to show loading message until promise settles

 {{loading-bar message="saving please standby.. promise=promiseProperty}}

 Then when needed..
 controller.set('promiseProperty', model.save());

 **/

export default Ember.Component.extend({
    promise: null,
    classNames: ['row'],
    message: null,
    isLoading: Ember.computed.readOnly('promise.isPending')
});
