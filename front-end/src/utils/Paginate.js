import _ from 'lodash';

export function paginate(items, pageNumber, pageSzie) {
  const startIndex = (pageNumber - 1) * pageSzie;
  return _(items).slice(startIndex).take(pageSzie).value();
}
