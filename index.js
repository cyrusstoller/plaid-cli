#! /usr/bin/env node

console.log('Welcome to the Plaid CLI');
console.log('Type "help" for more information');
require('dotenv').config({ path: process.env.HOME + '/.plaidrc' });

const argv = require('minimist')(process.argv.slice(2));
const plaid = require('plaid');

// Initializing the Plaid Client
const client_id = argv['client_id'] || process.env.CLIENT_ID
const secret =  argv['secret'] || process.env.SECRET
const public_key = argv['public_key'] || process.env.PUBLIC_KEY
const plaid_env = computePlaidEnv(plaid, argv['plaid_env'] || process.env.PLAID_ENV)

const plaidClient = new plaid.Client(
  client_id,
  secret,
  public_key,
  plaid_env,
  { version: '2018-05-22' }
);

const vorpal = require('vorpal')();

vorpal
  .delimiter('Plaid CLI $>')
  .show();

vorpal
  .command('get_item <accessToken>')
  .description('Get the item')
  .action(function(args, callback) {
    plaidClient.getItem(args.accessToken, function(err, res){
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('accounts <accessToken>', 'Get accounts for an item')
  .alias('accts')
  .action(function(args, callback) {
    plaidClient.getAccounts(args.accessToken, args.options, function(err, res) {
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('auth <accessToken>', 'Get auth for an item')
  .action(function(args, callback) {
    plaidClient.getAuth(args.accessToken, args.options, function(err, res) {
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('balance <accessToken>', 'Get balance for an item')
  .action(function(args, callback) {
    plaidClient.getBalance(args.accessToken, args.options, function(err, res) {
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('categories', 'Get transaction categories')
  .action(function(args, callback) {
    plaidClient.getCategories(function(err, res) {
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('credit_details <accessToken>', 'Get credit details for an item')
  .alias('credit')
  .hidden()
  .action(function(args, callback) {
    plaidClient.getCreditDetails(args.accessToken, function(err, res) {
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('identity <accessToken>', 'Get identity for an item')
  .alias('id')
  .action(function(args, callback) {
    plaidClient.getIdentity(args.accessToken, function(err, res) {
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('income <accessToken>', 'Get income for an item')
  .action(function(args, callback) {
    plaidClient.getIncome(args.accessToken, function(err, res) {
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('institution <id>', 'Get institution by institution id')
  .action(function(args, callback) {
    plaidClient.getIncome(args.id, args.options, function(err, res) {
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('transactions <accessToken> <startDate> <endDate>')
  .description('Get transactions for an item using dates formatted as YYYY-MM-DD')
  .alias('txns')
  .option('-c, --count <count>', 'Between 0 and 500')
  .option('-o, --offset <offset>', 'Must be >0')
  .action(function(args, callback) {
    plaidClient.getTransactions(args.accessToken, args.startDate, args.endDate, args.options, function(err, res) {
      prettyPrint(res);
      callback();
    });
  });

vorpal
  .command('remove_item <accessToken>')
  .description('Remove an item')
  .alias('rm')
  .action(function(args, callback){
    plaidClient.removeItem(args.accessToken, function(err, res){
      prettyPrint(res);
      callback();
    })
  })

function computePlaidEnv(plaid, value) {
  const val = value.toLowerCase();
  if (val === 'sandbox') {
    return plaid.environments.sandbox;
  } else if (val === 'development') {
    return plaid.environments.development;
  } else if (val === 'production') {
    return plaid.environments.production;
  } else {
    return undefined;
  }
}

function prettyPrint(res) {
  const str = JSON.stringify(res, null, 2);
  console.log(str);
}
