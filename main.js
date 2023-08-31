// Import required libraries
const Web3 = require('web3');
const Web3ProviderEngine = require('web3-provider-engine');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
const ProviderPatchers = require('web3-provider-patchers');
const createInfuraMiddleware = require('eth-json-rpc-infura');

// Configure the Infura middleware
const infuraMiddleware = createInfuraMiddleware({
  projectId: 'YOUR_INFURA_PROJECT_ID',
  projectSecret: 'YOUR_INFURA_PROJECT_SECRET', // Optional: Only required for some networks
});

// Create a Web3ProviderEngine instance
const engine = new Web3ProviderEngine();

// Add the Infura middleware
engine.addProvider(infuraMiddleware);

// Apply filter patcher to the engine
ProviderPatchers.applyFilterPatcher(engine);

// Apply wallet patcher to the engine (optional, for wallet interaction)
// const walletPatcher = ProviderPatchers.walletPatcher(web3, YOUR_PRIVATE_KEY);
// engine.addProvider(walletPatcher);

// Add RPC subprovider
engine.addProvider(new RpcSubprovider({
  rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', // Replace with your Infura URL
}));

// Start the engine
engine.start();

// Create a Web3 instance using the custom provider
const web3 = new Web3(engine);

// Example usage
(async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts);

    const blockNumber = await web3.eth.getBlockNumber();
    console.log('Block Number:', blockNumber);

    // Subscribe to new block headers
    web3.eth.subscribe('newBlockHeaders', (error, blockHeader) => {
      if (!error) {
        console.log('New Block Header:', blockHeader);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
})();
