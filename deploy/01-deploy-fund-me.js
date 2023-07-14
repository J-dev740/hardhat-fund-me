//imports 
const {network}= require("hardhat")
const {networkConfig, developmentChains}= require("../helper-hardhat-config")
//function definition
module.exports=async ({getNamedAccounts,deployments})=>{
    //same as async (hre)={ const{getNamedAccounts,deployments}=hre 
    // or hre.deployments ,hre.getNamedAccounts}

    const {deploy, log, get } =deployments       //did not fully understand these type of exports 
    const {deployer} = await getNamedAccounts()   //are these exports variables or functions how do we identify that
    const ChainId = network.config.chainId
    const Name=network.name;
    let PriceFeedAddress;
    if(developmentChains.includes(Name)){
        log("local network detected! deploying mock contract for price feeds...")
        const MockPriceFeed= await get("MockV3Aggregator")
        PriceFeedAddress= MockPriceFeed.address
        

    }
    else {
        log("deploying to testnets with ethUsdPriceFeeds")
        PriceFeedAddress=networkConfig[ChainId]["ethUsdPriceFeedAddress"]
         }   
        log ("deploying please wait..... \n waiting for confirmations....")
        const fundMe=await deploy("FundMe",{
            from:deployer,
            args:[PriceFeedAddress],
            log:true,
            waitConfirmations:network.config.BlockConfirmations || 1,

        })

    
}
module.exports.tags=["all","fundme"]


//function export