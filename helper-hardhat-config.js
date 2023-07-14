require("dotenv").config()

const DECIMAL=process.env.DECIMAL
const INITIAL_INTEGER=process.env.INITIAL_INTEGER
const networkConfig={
    11155111:{
        name:"sepolia",
        ethUsdPriceFeedAddress:"0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },

}

const developmentChains=["hardhat","localhost"]
 module.exports={
    networkConfig,
    developmentChains,
    DECIMAL,
    INITIAL_INTEGER,
 }