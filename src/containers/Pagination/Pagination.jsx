import React from 'react';
import Helmet from 'react-helmet';
import { List } from 'immutable';
import { connect } from 'react-redux';

import './violet.min.scss';
import './Pagination.scss';

function paginate(list, page, pageSize) {
  return list.skip((page - 1) * pageSize).take(pageSize);
}

function order(list, sort, sortOrder) {
  if (sort) {
    const sorted = list.sortBy(item => item[sort]);
    if (sortOrder === 'desc') {
      return sorted.reverse();
    }

    return sorted;
  }

  return list;
}

function mockFetch({ query: { pageSize, page, sort, sortOrder } }) {
  const records = List([{
    name: 'Ewe and IPA',
    rank: 75
  }, {
    name: 'Pouty Stout',
    rank: 86
  }, {
    name: 'WPA Evil Angel',
    rank: 63
  }, {
    name: 'Maltster',
    rank: 68
  }, {
    name: 'Beer Mosaic Pale',
    rank: 92
  }, {
    name: 'Honey Porter IDK',
    rank: 93
  }, {
    name: 'Puntification BeerSocialist Brown',
    rank: 88
  }, {
    name: 'HefeLite Dubble All-Grain',
    rank: 55
  }]);

  const filtered = paginate(
    order(records, sort, sortOrder),
    page,
    pageSize
  );

  return () => Promise.resolve({
    data: {
      results: filtered.toJS(),
      total_count: records.count()
    }
  });
}

export function Pagination() {
  return (
    <section style={{ width: '50%' }}>
      <h1>Pagination</h1>
      <Helmet title="Pagination" />

      <p>
        This is an example of a datatable in redux with sorting and pagination capability
        provided by <a href="https://www.npmjs.com/package/violet-paginator" target="_blank">violet-paginator</a>.
      </p>
    </section>
  );
}

export default connect(
  undefined,
  { fetch: mockFetch }
)(Pagination);
