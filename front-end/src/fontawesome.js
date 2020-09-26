import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as fullHeart,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';

library.add(emptyHeart, fullHeart, faSortUp, faSortDown);
