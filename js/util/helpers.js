import moment from 'moment';

export function formatTime(timestamp) {
  if (!timestamp) return 'deleted';

  let diff = moment().diff(moment(timestamp));
  if (diff <= 0) return 'just now'; // if the timestamp appears to be in the future
  if (diff > 31536000000) return moment(timestamp).format('ll'); // if older than a year
  return moment(timestamp).fromNow();;
}
