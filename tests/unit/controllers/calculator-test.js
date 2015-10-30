/* jshint expr:true */
import { expect } from 'chai';
import { describe } from 'mocha';
import {
    describeModule,
    it
} from 'ember-mocha';

describeModule.only(
    'controller:calculator',
    'CalculatorController',
    {
        // Specify the other units that are required for this test.
        // needs: ['controller:foo']
    },
    function() {
        describe('#clearDisplay-Action', function() {
            it('clearDisplay should clear display property', function() {
                var controller = this.subject();

                expect(controller.get('display')).to.equal('0');

                controller.set('runningTotal', '232');
                expect(controller.get('display')).to.equal('232');

                controller.send('clearDisplay');
                expect(controller.get('display')).to.equal('0');
            });

            it('clearDisplay should clear register if and only if display is empty', function() {
                var controller = this.subject();

                controller.set('registerTape', '+ 4');
                controller.set('runningTotal', '232');
                expect(controller.get('display')).to.equal('232');

                controller.send('clearDisplay');
                expect(controller.get('display')).to.equal('0');
                expect(controller.get('registerTape')).to.not.equal('');

                controller.send('clearDisplay');
                expect(controller.get('registerTape')).to.equal('');
            });

        });
        describe('#inputNum-Action', function() {
            it('should replace 0 as first digit if left operand is 0 and no function is selected', function() {
                var controller = this.subject();
                controller.set('loadedFn', null);
                expect(controller.get('runningTotal')).to.equal('0');
                controller.send('inputNum', '1');
                expect(controller.get('runningTotal')).to.equal('1');
            });

            it('should add digit to first operand if operator is not selected', function() {
                var controller = this.subject();
                controller.set('loadedFn', null);
                controller.set('runningTotal', '1');
                expect(controller.get('runningTotal')).to.equal('1');
                controller.send('inputNum', '5');
                expect(controller.get('runningTotal')).to.equal('15');
            });

            it('should add digit to second operand if operator is has been chosen', function() {
                var controller = this.subject();
                controller.set('loadedFn', function(x) { return 3 + x;});
                expect(controller.get('operand')).to.equal('');
                controller.send('inputNum', '1');
                expect(controller.get('operand')).to.equal('1');
                controller.send('inputNum', '4');
                expect(controller.get('operand')).to.equal('14');
            });
        });

        describe('#inputOperator-Action', function() {
        });
        it('should diplay ERROR if there is an error during evaluation', function() {
            var controller = this.subject();
            expect(controller.get('hasSufferedError')).to.be.false;
            controller.set('currentExpression', ['12', "+/", '234', '/']);
            controller._evaluateCurrentExpression();
            expect(controller.get('hasSufferedError')).to.be.true;
        });

        it('should only allow clear function on error', function() {
            var controller = this.subject();
            controller.set('currentExpression', ['12', "+/", '234', '/']);
            controller._evaluateCurrentExpression();
            expect(controller.get('currentExpression').length).to.equal(1);
            expect(controller.get('currentExpression.0')).to.equal('ERROR');

            controller.send('inputChar', '5');
            controller.send('inputChar', '+');

            expect(controller.get('currentExpression').length).to.equal(1);
            expect(controller.get('currentExpression.0')).to.equal('ERROR');

            controller.send('clearDisplay');

            expect(controller.get('currentExpression').length).to.equal(0);
            expect(controller.get('display')).to.equal('');
        });

        it('should evaluate expression when user presses =', function() {
            var controller = this.subject();
            controller.set('currentExpression', ['1', '+', '2']);

            controller.send('requestEvaluation');

            expect(controller.get('currentExpression').length).to.equal(2);
            expect(controller.get('currentExpression.0')).to.equal('3');
            expect(controller.get('currentExpression.1')).to.equal('|');

        });

        it('should prevent adding operators when not appropriate', function() {
            var controller = this.subject();
            controller.set('currentExpression', ['1', '+', '2']);
            expect(controller.get('canInputOperator')).to.be.true;

            controller.send('inputChar', '/');
            expect(controller.get('canInputOperator')).to.be.false;
        });
    });
