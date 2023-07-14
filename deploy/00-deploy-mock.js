const {DECIMAL,INITIAL_INTEGER}=require("../helper-hardhat-config")
const {network} = require("hardhat")
const construct_args=[DECIMAL,INITIAL_INTEGER]
module.exports=async ({getNamedAccounts,deployments})=>{
    const {deploy,log,get}=deployments
    const {deployer}=await getNamedAccounts()
    const ChainId =network.config.chainId

    if (ChainId==31337)
    log("local network detected! deploying mocks...")
{    await deploy("MockV3Aggregator",{
        // contract:"MockV3Aggregator",
        from:deployer,
        log:true,
        args:construct_args,
    })
    log("mocks deployed")
    log("-------------------------------------------------->")
}

}
module.exports.tags=[
    "all", "mock"
]