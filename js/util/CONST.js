let correctCase = {
  'javascript': 'JavaScript',
  'python': 'Python',
  'go': 'Go',
  'ruby': 'Ruby',
  'html': 'HTML',
  'css': 'CSS',
  'general': 'General',
  'all': 'All'
};

let allCategories = ['-select one-'].concat(Object.keys(correctCase).map(key => correctCase[key]))

delete correctCase['all'];
let allExceptAll = ['-select one-'].concat(Object.keys(correctCase).map(key => correctCase[key]))

export const CORRECT_CASE_CATEGORY = correctCase;
export const ALL_CATEGORIES = allCategories;
export const POSTABLE_CATEGORIES = allExceptAll;
