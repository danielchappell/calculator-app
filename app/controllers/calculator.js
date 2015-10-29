import Ember from 'ember';
import * as Calc from '../utils/math';

export default Ember.Controller.extend({
    queryParams: ['runningTotal', 'operand', 'fnName', 'registerTape', 'currentTotalFrozen', 'hasSufferedError'],
    runningTotal: '0',
    operand: '',
    loadedFn: null,
    fnName: null,
    registerTape: '',
    currentTotalFrozen: false,
    hasSufferedError: false,
    hasLoadedFunction: Ember.computed.bool('loadedFn'),
    cannotInputNumber: Ember.computed.or('currentTotalFrozen', 'hasSufferedError'),
    cannotInputOperator: Ember.computed('hasLoadedFunction', 'operand','hasSufferedError', function() {
        return this.get('hasLoadedFunction') && !this.get('operand') || this.get('hasSufferedError');
    }),
    canInputNumber: Ember.computed.not('cannotInputNumber'),
    canInputOperator: Ember.computed.not('cannotInputNumber'),
    cannotInputEqualOperator: Ember.computed.or('cannotInputOperator', 'currentTotalFrozen'),
    hasRegister: Ember.computed.notEmpty('registerTape'),
    isAdding: Ember.computed.equal('fnName', 'add'),
    isSubtracting: Ember.computed.equal('fnName', 'subtract'),
    isDividing: Ember.computed.equal('fnName', 'divide'),
    isMultiplying: Ember.computed.equal('fnName', 'multiply'),
    isPowerOfing: Ember.computed.equal('fnName', 'powerOf'),
    clearCurrent: Ember.computed('runningTotal', function() {
        return this.get('runningTotal') !== '0'  ? "C" : "CR";
    }),
    display: Ember.computed('runningTotal', 'operand', function() {
        return this.get('operand') || this.get('runningTotal');
    }),
    _tryEval(loadedFn, operand) {
        try {
            return loadedFn(operand);
        } catch (e) {
            console.error(e);
            this._printError();
        }
    },
    _printError() {
        this.setProperties({hasSufferedError: true,
                            registerTape: this.get('registerTape').concat(`\n----------- \n  ERROR  \n`)
                           });
    },
    _getOperatorSymbol(fnName) {
        let symbol;
        switch (fnName) {
        case 'add':
            symbol = '+';
            break;
        case 'subtract':
            symbol = '-';
            break;
        case 'multiply':
            symbol = '×';
            break;
        case 'divide':
            symbol = '÷';
            break;
        case 'factorial':
            symbol = '!';
            break;
        case 'powerOf':
            symbol = 'x(y)';
            break;
        case 'sin':
            symbol = 'sin';
            break;
        case 'cos':
            symbol = 'cos';
            break;
        case 'equal':
            symbol = '=';
        }
        return symbol;
    },
    _updateAndPrintRunningTotal(newRunningTotal) {
        this.setProperties({runningTotal: newRunningTotal,
                            currentTotalFrozen: true,
                            registerTape: this.get('registerTape').concat(`\n----------- \n${newRunningTotal}  \n`)
                           });
    },
    actions: {
        add(runningTotal) {
            this.setProperties({loadedFn: Calc.add(runningTotal),
                                fnName: 'add'});
        },
        subtract(runningTotal) {
            this.setProperties({loadedFn: Calc.subtract(runningTotal),
                                fnName: 'subtract'});
        },
        multiply(runningTotal) {
            this.setProperties({loadedFn: Calc.multiply(runningTotal),
                                fnName: 'multiply'});
        },
        divide(runningTotal) {
            this.setProperties({loadedFn: Calc.divide(runningTotal),
                                fnName: 'divide'});
        },
        powerOf(runningTotal) {
            this.setProperties({loadedFn: Calc.powerOf(runningTotal),
                                fnName: 'powerOf'});
        },
        factorial(runningTotal) {
            this._updateAndPrintRunningTotal(Calc.factorial(runningTotal));
        },
        sin(runningTotal) {
            this._updateAndPrintRunningTotal(Math.sin(runningTotal));
        },
        cos(runningTotal) {
            this._updateAndPrintRunningTotal(Math.cos(runningTotal));
        },
        equal(runningTotal) {
            this._updateAndPrintRunningTotal(runningTotal);
        },
        inputOperator(fnName) {
            let {loadedFn,
                 operand,
                 runningTotal,
                 registerTape} = this.getProperties(['loadedFn', 'operand', 'runningTotal', 'registerTape']);
            //Only the first register line will use runningTotal
            //If fn is = after a unary operator don't print a value;
            let registerPrintValue = operand || fnName !== 'equal' && runningTotal || '';

            if (loadedFn) {
                runningTotal = this._tryEval(loadedFn, +operand);
                if (runningTotal === undefined) {
                    return;
                }
                this.setProperties({runningTotal,
                                    loadedFn: null,
                                    fnName: null,
                                    operand: ''
                                   });
            }

            this.setProperties({registerTape: registerTape.concat(`\n${registerPrintValue} ${this._getOperatorSymbol(fnName)}`),
                                currentTotalFrozen: false
                               });
            this.send(fnName, +runningTotal);
        },
        inputNum(num) {
            let runningTotal = this.get('runningTotal');
            let operand = this.get('operand');
            let loadedFn = this.get('loadedFn');

            if (operand && operand !== '0' && loadedFn) {
                this.set('operand', this.get('operand').concat(num));
            } else if(loadedFn) {
                this.set('operand', num);
            } else if (runningTotal === '0' || this.get('currentTotalFrozen')) {
                this.set('runningTotal', num);
            } else {
                this.set('runningTotal', this.get('runningTotal').concat(num));
            }
        },
        clearDisplay() {
            if (this.get('runningTotal') !== '0') {
                this.setProperties({
                    runningTotal: '0',
                    loadedFn: null,
                    fnName: null,
                    operand: '',
                    registerTape: this.get('registerTape').concat('\n\nCLEAR\n')
                });
            } else {
                this.set('registerTape', '');
            }
            this.setProperties({
                hasSufferedError: false,
                currentTotalFrozen: false
            });
        }
    }
});
