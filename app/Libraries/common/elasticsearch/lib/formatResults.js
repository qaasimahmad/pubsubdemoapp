function formatResults(elasticSearchResults){
  const result = elasticSearchResults.hits.hits.length > 0
    ? elasticSearchResults.hits.hits.map(((items) => items._source))
    : [];

  return result;
}
module.exports = formatResults;
