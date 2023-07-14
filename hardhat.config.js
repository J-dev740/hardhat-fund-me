require("@nomicfoundation/hardhat-toolbox");
// require ("@nomiclabs/hardhat-waffle")
// require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
//for deployments using hardhat-deploy
 // will look for deploy scripts in deploy folder when: npx hardhat deploy --network <network_name>
require("hardhat-deploy")
//npm install --save-dev @nomicfoundations/hardhat-ethers@npm:hardhat-deploy-ethers ethers
//hardhat-deploy-ethers will override hardhat-ethers which was overriding ethers with its own plugins over ethers for local devlelopment
// require("")

/** @type import('hardhat/config').HardhatUserConfig */

RPC_URL=process.env.RPC_URL
PRIVATE_KEY=process.env.PRIVATE_KEY
API_KEY=process.env.ETHERSCAN_API_KEY
module.exports = {
  defaultNetwork:"hardhat",
  solidity: {    
    compilers:[
    {
      version:"0.8.8",
    },
    {
      version:"0.6.6",
    }
  ]},
  etherscan:{
    apiKey:API_KEY,
  },
  mocha:{
    timeout:500000,
  },
  namedAccounts:{
    deployer:{
      default:0,
      1:0,
    }

  },
  networks:{
    hardhat:{},
    sepolia:{
      url:RPC_URL,
      accounts:[PRIVATE_KEY,],
      chainId:11155111,
      BlockConfirmations:3,
    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      chainId:31337,
      //accounts:[] is not  req as hardhat automatically locates its private key from the node that we are running locally


    },

}
};
