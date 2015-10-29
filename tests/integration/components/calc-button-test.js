/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'calc-button',
  'Integration: CalcButtonComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#calc-button}}
      //     template content
      //   {{/calc-button}}
      // `);

      this.render(hbs`{{calc-button}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
