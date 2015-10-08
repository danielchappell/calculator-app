import Ember from 'ember';

export default Ember.Controller.extend({
    init() {
        this._super();
        this.set('currentExpression', []);
    },
    queryParams: ['display'],
    display: Ember.computed('currentExpression.[]', {
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
    hasSufferedError: function() {
        return this.get('display') === 'ERROR';
    }.property('display'),
    canInputNumber: Ember.computed.not('hasSufferedError'),
    canInputOperator: function() {
        let currentExpression = this.get('currentExpression');
        return /[0-9.]/.test(currentExpression[currentExpression.length - 1]) && !this.get('hasSufferedError');
    }.property('currentExpression.[]'),
    cannotInputNumber: Ember.computed.not('canInputNumber'),
    cannotInputOperator: Ember.computed.not('canInputOperator'),
    currentExpression: null,
    _evaluateCurrentExpression(userRequested) {
        let currentExpression = this.get('currentExpression');
        let shouldEvaluate = currentExpression.length === 4 || userRequested && currentExpression.length === 3;
        let latestInput = currentExpression[currentExpression.length - 1];
        let expression;
        let newValue;

        if (!shouldEvaluate ) {
            return;
        }
        expression = currentExpression.slice(0, 3).join(' ');
        newValue = this._tryEval(expression);

        if (newValue === 'ERROR' || userRequested) {
            this.set('currentExpression', [newValue]);
        } else {
            this.set('currentExpression', [newValue, latestInput]);
        }

    },
    _tryEval(exp) {
        try {
            return  eval(`( ${exp} )`);
        } catch(e) {
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

            if (this.get('hasSufferedError')) {
                return;
            }

            if(isCharNumeric && isPreviousValueNumeric) {
                currentExpression.replace(currentExpression.length - 1, 1,  previousValue + char);
            } else if (isCharNumeric || isPreviousValueNumeric || Ember.isEmpty(currentExpression)){
                currentExpression.pushObject(char);
            } else {
                return;
            }

            this._evaluateCurrentExpression();
        },
        clearDisplay() {
            this.set('currentExpression', []);
        },
        requestEvaluation() {
            let userRequested = true;
            this._evaluateCurrentExpression(userRequested);
        }
    }
});
