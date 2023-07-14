//staging is the last test before deploying to test net
//here we do not use fixtures() since we assume that deployments are already there 
//while conducting staging tests we are testing in testnet env so we don't need mocks
const { developmentChains } = require("../../helper-hardhat-config");
const {network,ethers,getNamedAccounts,deployments} = require ("hardhat")
const {assert,expect} = require ("chai")

developmentChains.includes(network.name)
?describe.skip
:   describe("FundMe staging test",()=>{
    let fundme,
        fundme_address,
        deployer,
        accounts;

       const  sendValue= ethers.parseEther("0.1")


    beforeEach(async ()=>{
        // accounts= ethers.getSigners()
        // deployments.fixture("all",{network:"sepolia"})
        accounts = await ethers.getSigners()
        deployer= await ethers.getSigner("0xa81DE2e4693b9fC3Bc16Ab56D148CC938203B430")
        fundme_address= (await deployments.get("FundMe")).address
        fundme= await ethers.getContractAt("FundMe",fundme_address)
        fundme = fundme.connect(deployer);

    })
    describe("fund and withdraw",function () {
        // this.timeout(60000);
        it("funders should be able to fund and owner is able to withdraw", async ()=>{
        await  fundme.fund({ value:sendValue });


 
            // tx_response.wait(1)
             await fundme.withdraw()
             const balance=(await ethers.provider.getBalance(fundme_address)).toString()
             assert(balance,"0")
         })
    })
});