const assert = require('assert');
const elasticSearch = require('elasticsearch');
const randomstring = require('randomstring');
const logger = require('../logger');
const formatResults = require('./lib/formatResults');
const { elasticUrl, index, type } = require('../../../config/config');

const client = new elasticSearch.Client({
  host: elasticUrl,
});

client.ping({
  requestTimeout: 30000,
}, (error) => {
  if (error) {
    logger.error('elasticsearch cluster is down!');
  } else {
    logger.info('elasticsearch is up and running ::)');
  }
});

async function deleteIndex(index) {
  assert(index, 'Name of the index must be specified for this operation');
  try {
    const result = await client.indices.delete({ index });
    if (result) {
      logger.info('index deleted successsfully');
    }
  } catch (error) {
    logger.error('IndexDelete Error!!', error);
    return error;
  }
}

async function saveDoc(itemsToSave) {
  assert(itemsToSave, 'itemsToSave cannot be missing');
  const { topic } = itemsToSave;
  // Rename this variable *
  const esData = {
    index,
    type,
    id: topic || randomstring.generate(8),
    body: itemsToSave,
  };
  try {
    const savedResponse = await client.create(esData);
    if (savedResponse && savedResponse.result === 'created') {
      logger.info(`successfully saved subscription data, ${JSON.stringify(savedResponse)}`);
      return 1;
    }
  } catch (error) {
    logger.info(`Failed to save subscription data, ${error}`);
    return 0;
  }
}

async function indexDoc(id = null, items) {
  return await client.index({
    index,
    type,
    body: items,
    // id,
    refresh: true,
  });
}

async function findByParam(searchParam) {
  console.log('Searchparam>>', searchParam);
  try {
    const result = await client.search({
      index,
      type,
      body: {
        query: {
          bool: {
            must: {
              term: searchParam,
            },
          },
        },
      },
    });
    if (result) {
      const formattedResults = formatResults(result);
      return formattedResults;
    }
  } catch (error) {
    return error;
  }
}

async function createIndex(indexName) {
  try {
    await client.indices.create(indexName);
  } catch (error) {
    return error;
  }
}

module.exports = {
  deleteIndex, createIndex, indexDoc, client, findByParam, saveDoc,
};
