const {ethers,getNamedAccounts,deployments} =  require ("hardhat")
const main= async ()=>{
// const deployer =(await getNamedAccounts()).deployer  
const accounts = await ethers.getSigners()
const deployer  = accounts[0]
const fundme_address= (await deployments.get("FundMe")).address
let fundme= await ethers.getContractAt("FundMe",fundme_address)
const sendValue= ethers.parseEther("0.1")
fundme=fundme.connect(deployer)
const tx_response= await fundme.fund({value:sendValue})
 tx_response.wait(1)
 console.log("funded.....")

}

main()
.then(()=>process.exit(0))
.catch((e)=>{
    console.log(e)
    process.exit(1)
})