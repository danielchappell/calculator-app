/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'save-register-modal',
  'Integration: SaveRegisterModalComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#save-register-modal}}
      //     template content
      //   {{/save-register-modal}}
      // `);

      this.render(hbs`{{save-register-modal}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
