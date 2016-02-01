import API from '../API'

let callbacks = Symbol();
let data = Symbol();

// THINGS IN THE STORE
// token - full token
// me {
//   username: string
//   upvotes: [] (set)
//   downvotes: []
// }

// EVENTS
// 'goMain' event!


class EventEmitter {
  constructor() {
    this[callbacks] = {};
  }
  registerListener(name, cb) {
    let theEvent = this[callbacks][name];
    this[callbacks][name] = theEvent ? theEvent.concat(cb) : [cb];
  }
  stopListening(name, listeningFunction){
    let theEvent = this[callbacks][name];
    if (!theEvent) return;
    let cbIndex = theEvent.indexOf(listeningFunction);
    this[callbacks][name] = theEvent.splice(cbIndex,1);
  }
  emitChange(name) {
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
    this[data][name] = datum;
    this.emitChange(name);
  }
  getDatum(name) {
    return this[data][name];
  }
}

export const eventEmitter = new EventEmitter();
export const store = new Store();
