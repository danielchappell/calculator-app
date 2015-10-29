/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Calc from 'calculator-app/utils/math';

describe('math', function() {
    it('should be able to add two numbers', function() {
        expect(Calc.add(5)(20)).to.equal(25);
        expect(Calc.add(-5)(20)).to.equal(15);
        expect(Calc.add(-5)(-20)).to.equal(-25);
    });
    it('should allow addition via currying', function() {
        let closure = Calc.add(5);
        expect(typeof closure).to.equal('function');
        expect(closure(20)).to.equal(25);
    });
});
