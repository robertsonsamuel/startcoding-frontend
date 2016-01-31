import moment from 'moment';

export function formatTime(timestamp) {
  if (!timestamp) return 'deleted';
  let fromNow = moment(timestamp).fromNow();
  return fromNow.includes('year') ? moment(timestamp).format('ll') : fromNow;
}
