const {ethers,getNamedAccounts,deployments} =  require ("hardhat")
const main= async ()=>{
const deployer=(await getNamedAccounts()).deployer
const fundme_address= (await deployments.get("FundMe")).address
const fundme= await ethers.getContractAt("FundMe",fundme_address)
const sendValue= ethers.parseEther("0.1")
console.log("withdrawing funds from contract...")
const tx_response= await fundme.withdraw()
 tx_response.wait(1)
 console.log("withdrawn..")

}

main()
.then(()=>process.exit(0))
.catch((e)=>{
    console.log(e)
    process.exit(1)
})