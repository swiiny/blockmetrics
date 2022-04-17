const validSortByAttributes = ['rank'];

// parses sorting and pagination parameters and return object params = { orderBy, pagination }
export const parseParams = (sortBy = null, desc = null, offset = null, limit = null) => {
  // ordering parameters
  if (!sortBy) {
    sortBy = 'rank';
  } else if (!validSortByAttributes.includes(sortBy)) {
    return { error: 'Invalid sortBy parameter' };
  }

  desc = desc || 'true';

  if (desc !== 'false' && desc !== 'False' && desc !== 'true' && desc !== 'True') {
    return { error: 'Invalid desc parameter' };
  }

  const orderBy = ` ORDER BY ${sortBy}${(desc === 'true' || desc === 'True') ? ' DESC' : ''}`;

  // pagination parameters
  let pagination = '';

  if (limit) {
    try {
      limit = parseInt(limit, 10);
      
      if (!(limit > 0)) {
        throw new Error('');
      }
      if (offset) {
        offset = parseInt(offset, 10);
        if (!(offset >= 0)) {
          throw new Error('');
        }
      }
      offset = offset ? ` OFFSET ${offset}` : '';
      pagination = ` LIMIT ${limit}${offset}`;
    } catch (err) {
      return { error: 'Invalid limit or offset parameter, must be positive numbers' };
    }
  } else if (offset) {
    return { error: 'Offset argument cannot be provided without limit argument' };
  }

  return { orderBy, pagination, sortByField: sortBy };
};

// get blockchains data in the database endpoint
// TODO : protect from sql injection
export const getBlockchains = async (dbcpool, params) => {
  try {
    let { orderBy, pagination } = params;
    orderBy = orderBy || '';
    pagination = pagination || '';

    
    // TODO : Set fields to fetch separated by coma
    let queryPrefix = 'SELECT  set, fields, to, fetch, separated, by, coma FROM coinsData WHERE ibt = 0';

    if (params.sortByField) {
      queryPrefix += ` AND ${params.sortByField} IS NOT NULL`;
    }

    const res = await dbcpool.query(queryPrefix + orderBy + pagination);
    
    return buildUniqueTokensListData(res[0]);
  } catch (err) {
    console.error('getBlockchains', err);
    return null;
  }
};