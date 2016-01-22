import API from '../API'


function EventEmitter() {
  let callbacks = {};
  this.registerListener = function(name,cb) {
    let theEvent = callbacks[name];
    callbacks[name] = theEvent ? theEvent.concat(cb) : [cb];
  }
  this.emitChange = function(name) {
    callbacks[name].forEach( cb => cb() );
  }
}

export const eventEmitter = new EventEmitter();
