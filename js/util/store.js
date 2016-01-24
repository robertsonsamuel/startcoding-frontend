import API from '../API'

let callbacks = Symbol();
let data = Symbol();

// THINGS IN THE STORE
// token - full token
// me - full user info (sans pword)

class EventEmitter {
  constructor() {
    this[callbacks] = {};
  }
  registerListener(name,cb) {
    let theEvent = this[callbacks][name];
    this[callbacks][name] = theEvent ? theEvent.concat(cb) : [cb];
  }
  emitChange(name) {
    console.log("emitting change", name);
    if (!this[callbacks][name]) return;
    this[callbacks][name].forEach( cb => cb() );
  }
}

class Store extends EventEmitter {
  constructor() {
    super();
    this[data] = {};
  }
  saveDatum(name, datum) {
    console.log("saving in store", name);
    this[data][name] = datum;
    this.emitChange(name);
  }
  getDatum(name) {
    return this[data][name];
  }
}

export const eventEmitter = new EventEmitter();
export const store = new Store();
