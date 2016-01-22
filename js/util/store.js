import API from '../API'

let callbacks = Symbol();

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

export const eventEmitter = new EventEmitter();
