import {
  GET_LANGUAGE_ISO,
  GET_LOCALE_ISO,
  HAS_PERMISSION,
} from './constants';
import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_LOCALES,
  EN,
  EN_US,
} from '../../conf/translation';

export default {
  [GET_LANGUAGE_ISO]: (state) => SUPPORTED_LANGUAGES[state.user.language] || EN,
  [GET_LOCALE_ISO]: (state) => SUPPORTED_LOCALES[state.user.locale] || EN_US,
  [HAS_PERMISSION]: (state) => (permission) => state.permissions.includes(permission) || false,
};
