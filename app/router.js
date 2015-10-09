import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route('calculator');
    this.route('review');
    this.route('view-receipt', {path: '/register/:register_id'});
});

export default Router;
