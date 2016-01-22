import moment from 'moment';

export function formatTime(timestamp) {
  return moment(timestamp).format('lll');
}
