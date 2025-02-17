const parseSortOrder = (sortOrder) => {
  const isKnownOrder = ['asc', 'desc', 'ascending', 'descending'].includes(
    sortOrder,
  );
  if (isKnownOrder) return sortOrder;
  return 'asc';
};

const parseSortBy = (sortBy) => {
  const keysOfContact = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];

  if (keysOfContact.includes(sortBy)) {
    return sortBy;
  }

  return 'name';
};

export const sortParse = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
