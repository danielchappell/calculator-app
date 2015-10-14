import Ember from 'ember';

export function initialize() {
    Ember.$.ajaxSetup({
        beforeSend: (xhr) => {
            xhr.withCredentials = true;
        }
    });
}

export default {
  name: 'ajax-setup',
  initialize: initialize
};
