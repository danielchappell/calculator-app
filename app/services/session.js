import Ember from 'ember';

export default Ember.Service.extend({
    isAuthenticated: false,
    apiBase: "https://ember-calc.herokuapp.com/api/v1",
    attemptedTranstion: null,

    login(username, password) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            let url = `${this.get('apiBase')}/login`;
            let success = () => {
                this.set('isAuthenticated', true);
                resolve();
            };
            let error = (jqXHR, status, err) => reject(err);

            Ember.$.ajax({
                method: "POST",
                data: {"username": username, "password": password},
                url,
                success,
                error
            });
        });
    },

    checkAuth() {
        return new Ember.RSVP.Promise((resolve, reject) => {
            let url = `${this.get('apiBase')}/checkAuth`;
            let success = () => {
                this.set('isAuthenticated', true);
                resolve();
            };
            let error = () => reject();

            // if marked as authenticated don't bother checking server
            if (this.get('isAuthenticated')) {
                resolve();
                return;
            }

            Ember.$.ajax({
                method: "GET",
                url,
                success,
                error
            });
        });
    },

    logout() {
        return new Ember.RSVP.Promise((resolve, reject) => {
            let url = `${this.get('apiBase')}/logout`;
            let success = () => {
                this.set('isAuthenticated', false);
                resolve();
            };

            let error = (jqXHR, status, err) => reject(err);

            Ember.$.ajax({
                method: "POST",
                url,
                success,
                error,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            });
        });
    }
});
