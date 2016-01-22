import API from '../API'

let callbacks = Symbol();
let data = Symbol();

class EventEmitter {
  constructor() {
    this[callbacks] = {};
  }
  registerListener(name,cb) {
    let theEvent = this[callbacks][name];
    this[callbacks][name] = theEvent ? theEvent.concat(cb) : [cb];
  }
  emitChange(name) {
    this[callbacks][name].forEach( cb => cb() );
  }
}

class Store extends EventEmitter {
  constructor() {
    super();
    this[data] = {};
  }
  saveDatum(name, datum) {
    this[data][name] = datum;
  }
  getDatum(name) {
    return this[data][name];
  }
}

export const eventEmitter = new EventEmitter();
