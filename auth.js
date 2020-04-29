import SyncStorage from 'sync-storage';
class Auth {
    constructor() {
        this.authenticated = this.getLocalStorage('authenticated');
        this.userDetails = this.getLocalStorage('userDetails');
    }
    login(cb) {
        this.authenticated = true;
        this.setLocalStorage('authenticated', true);
        cb();
    }
    logout(cb) {
        this.authenticated = false;
        this.setLocalStorage('authenticated', false);
        cb()
    }
    isAuthenticated() {
        return this.authenticated;
    }
    setUserDetails(details) {
        this.userDetails = { ...details };
        this.setLocalStorage('userDetails', details);
    }
    getUserDetails() {
        return this.userDetails;
    }
    setLocalStorage = async (key, value) => {
        SyncStorage.set(key, value);
    }
    getLocalStorage = async (key) => {
        return SyncStorage.get(key);
    }
}

export default new Auth();