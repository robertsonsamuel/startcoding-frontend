/*
 * ENUMERATION OF VALID CATEGORIES
 */

let correctCase = {
  'javascript': 'JavaScript',
  'python': 'Python',
  'go': 'Go',
  'ruby': 'Ruby',
  'html': 'HTML',
  'css': 'CSS',
  'swift': 'Swift',
  'general': 'General',
  'all': 'All'
};

let allCategories = ['-select one-'].concat(Object.keys(correctCase).map(key => correctCase[key]))

delete correctCase['all'];
let allExceptAll = ['-select one-'].concat(Object.keys(correctCase).map(key => correctCase[key]))

export const CORRECT_CASE = correctCase;
export const ALL_CATEGORIES = allCategories;
export const POSTABLE_CATEGORIES = allExceptAll;


/*
 * LIMITS ON INPUT SIZES
 */

export const MAX_USERNAME_LENGTH = 20;
export const MAX_PASSWORD_LENGTH = 100;

export const MAX_RESOURCE_TITLE_LENGTH = 100;
export const MAX_RESOURCE_BODY_LENGTH  = 250;
export const MAX_COMMENT_LENGTH        = 2500;
