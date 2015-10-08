/* jshint expr:true */
import { expect } from 'chai';
import {
    describeModule,
    it
} from 'ember-mocha';

describeModule(
    'controller:calculator',
    'CalculatorController',
    {
        // Specify the other units that are required for this test.
        // needs: ['controller:foo']
    },
    function() {
        // Replace this with your real tests.
        it('clearDisplay should clear display property', function() {
            var controller = this.subject();

            expect(controller.get('display')).to.equal("");

            controller.set('currentExpression', ["123"]);
            expect(controller.get('display')).to.equal("123");

            controller.send('clearDisplay');
            expect(controller.get('display')).to.equal("");
        });

        it('inputChar method should add character to display string', function() {
            var controller = this.subject();
            expect(controller.get('display')).to.equal("");
            controller.send('inputChar', "1");
            expect(controller.get('display')).to.equal("1");
            controller.send('inputChar', "5");
            expect(controller.get('display')).to.equal("15");
        });

        it('should evaluate current expression', function() {
            var controller = this.subject();
            controller.set('currentExpression', ['1', '+', '2']);
            controller._evaluateCurrentExpression(); //won't eval until 4th input
            expect(controller.get('currentExpression').length).to.equal(3);

            controller.get('currentExpression').push('/');
            controller._evaluateCurrentExpression();

            expect(controller.get('currentExpression').length).to.equal(2); //['3', '/']
            expect(controller.get('currentExpression.0')).to.equal(3);


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

            expect(controller.get('currentExpression').length).to.equal(1);
            expect(controller.get('currentExpression.0')).to.equal(3);
        });

        it('should prevent adding operators when not appropriate', function() {
            var controller = this.subject();
            controller.set('currentExpression', ['1', '+', '2']);
            expect(controller.get('canInputOperator')).to.be.true;

            controller.send('inputChar', '/');
            expect(controller.get('canInputOperator')).to.be.false;
        });
    }
);
