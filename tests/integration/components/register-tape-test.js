/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'register-tape',
  'Integration: RegisterTapeComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#register-tape}}
      //     template content
      //   {{/register-tape}}
      // `);

      this.render(hbs`{{register-tape}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
