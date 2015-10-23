import Ember from 'ember';

export default Ember.Controller.extend({
    init() {
            this._super();
            this.set('currentExpression', []);
            this.set('registerTape', []);
            this.set('registerBuffer', []);
        },
        queryParams: ['displayParam', 'registerDisplay', 'registerBufferParam'],
        currentExpression: null,
        registerBuffer: null,
        registerTape: null,
        display: function() {
            return this.get('currentExpression') && this.get('currentExpression').without('|').join(' ');
        }.property('currentExpression.[]'),
        displayParam: Ember.computed('currentExpression.[]', {
            get() {
                    return this.get('currentExpression') && this.get('currentExpression').join(' ');
                },
                set(key, value) {
                    if (value) {
                        this.set('currentExpression', value.split(' '));
                    }
                    return value;
                }
        }),
        registerBufferParam: Ember.computed('registerBuffer.[]', {
            get() {
                    return this.get('registerBuffer') && this.get('registerBuffer').join(' ');
                },
                set(key, value) {
                    if (value) {
                        this.set('registerBuffer', value.split(' '));
                    }
                    return value;
                }
        }),
        hasRegister: Ember.computed.notEmpty('registerTape'),
        clearCopy: function() {
            return this.get('display') ? "C" : "CR";
        }.property('display'),
        registerDisplay: Ember.computed('registerTape.[]', {
            get() {
                    return this.get('registerTape') && this.get('registerTape').join('');
                },
                set(key, value) {
                    if (value) {
                        this.set('registerTape', value.split(''));
                    }
                    return value;
                }
        }),
        hasSufferedError: function() {
            return this.get('display') === 'ERROR';
        }.property('display'),
        wasTotalRequested: function() {
            let currentExpression = this.get('currentExpression');
            return currentExpression && currentExpression[currentExpression.length - 1] === '|';
        }.property('currentExpression.[]'),
        canInputNumber: Ember.computed.not('hasSufferedError'),
        canInputOperator: function() {
            let currentExpression = this.get('currentExpression');
            return /[0-9.]/.test(currentExpression[currentExpression.length - 1]) && !this.get('hasSufferedError') && !this.get('wasTotalRequested');
        }.property('currentExpression.[]'),
        cannotInputNumber: Ember.computed.not('canInputNumber'),
        cannotInputOperator: Ember.computed.not('canInputOperator'),
        _emptyRegisterBuffer: function() {
            let registerBuffer = this.get('registerBuffer');
            let line;
            if (registerBuffer && registerBuffer.length === 2) {
                line = '\n'.concat(registerBuffer.join(' '));
                this.get('registerTape').pushObject(`${line}`);
                this.set('registerBuffer', []);
            }
        }.observes('registerBuffer.[]'),
        _evaluateCurrentExpression(userRequested) {
            let currentExpression = this.get('currentExpression');
            let shouldEvaluate = currentExpression.length === 4 || userRequested && currentExpression.length === 3;
            let latestInput = currentExpression[currentExpression.length - 1];
            let expression;
            let newValue;

            if (!shouldEvaluate) {
                return;
            }
            expression = currentExpression.slice(0, 3).join(' ');
            newValue = this._tryEval(expression);

            if (newValue === 'ERROR' || userRequested) {
                this.set('currentExpression', [`${newValue}`]);
            } else {
                this.set('currentExpression', [`${newValue}`, latestInput]);
            }
            return newValue; //return total for use with requestEvaluation
        },
        _tryEval(exp) {
            try {
                return eval(`( ${exp} )`);
            } catch (e) {
                console.log(e);
                return 'ERROR';
            }
        },
        actions: {
            inputChar(char) {
                    let currentExpression = this.get('currentExpression');
                    let previousValue = currentExpression[currentExpression.length - 1];
                    let numericRegEx = /[0-9.]/;
                    let isCharNumeric = numericRegEx.test(char);
                    let isPreviousValueNumeric = numericRegEx.test(previousValue);
                    let registerBuffer = this.get('registerBuffer');
                    let wasTotalRequested = this.get('wasTotalRequested');
                    if (this.get('hasSufferedError')) {
                        return;
                    }

                    if (wasTotalRequested && isCharNumeric) {
                        //if previous number is requested total start over
                        currentExpression = [char];
                        this.set('currentExpression', currentExpression);
                        this.set('registerBuffer', currentExpression);
                    } else if (isCharNumeric && isPreviousValueNumeric) {
                        currentExpression.replace(currentExpression.length - 1, 1, previousValue + char);
                        registerBuffer.replace(registerBuffer.length - 1, 1, previousValue + char);
                    } else if (isCharNumeric || isPreviousValueNumeric || Ember.isEmpty(currentExpression)) {
                        currentExpression.pushObject(char);
                        registerBuffer.pushObject(char);
                    } else {
                        return;
                    }

                    this._evaluateCurrentExpression();
                },
                clearDisplay() {
                    if (!Ember.isEmpty(this.get('currentExpression'))) {
                        this.setProperties({
                            currentExpression: [],
                            registerBuffer: []
                        });
                        this.get('registerTape').pushObject("\n\nCLEAR\n");
                    } else {
                        this.set('registerTape', []);
                    }
                },
                registerUpdated() {
                    Ember.run.later(this, function() {
                        let elem$ = $('.register-container:first');
                        elem$.scrollTop(elem$.prop('scrollHeight'));
                    }, 1);
                },
                requestEvaluation() {
                    let userRequested = true;
                    let total = this._evaluateCurrentExpression(userRequested);

                    if (total) {
                        this.get('registerBuffer').pushObject('=');
                        this.get('registerTape').pushObject(`\n----------- \n${total}  \n`);
                        this.get('currentExpression').pushObject('|');
                    }
                },
                goToViewRegister(register) {
                    this.transitionToRoute('view-receipt', register);
                }
        }
});
