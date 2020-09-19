import { GET_LANGUAGE_ISO, HAS_PERMISSION } from './constants';
import { SUPPORTED_LANGUAGES, EN } from '../../conf/translation';

export default {
  [GET_LANGUAGE_ISO]: (state) => SUPPORTED_LANGUAGES[state.user.language] || EN,
  [HAS_PERMISSION]: (state) => (permission) => state.permissions.includes(permission) || false,
};
