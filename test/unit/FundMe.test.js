const { assert, expect } = require("chai");
const { network,ethers, deployments } = require("hardhat");
const {developmentChains}= require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", () => {
      let fundme,
        MockV3Aggregator,
        deployer,
        accounts,
        fundme_address,
        add,
        MockV3Aggregator_address;
      const sendValue = ethers.parseEther("1"); // converts the given  1 ethers in wei format 18 decimal places
      //  const deployer= (await getNamedAccounts()).deployer
      beforeEach(async () => {
        accounts = await ethers.getSigners(); //returns a list of accounts in the network which we deployed
        deployer = accounts[0];
        //deploy contracts in deploy section using the tags specified
        await deployments.fixture(["fundme", "mock"]);
        //fundMe will return the most recent deployments of FundMe contract deployed by the deployer account
        // fundme= await ethers.getContractAt("FundMe","0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")
        fundme_address = (await deployments.get("FundMe")).address;
        // console.log(fundme_address);
        fundme = await ethers.getContractAt("FundMe", fundme_address);

        fundme = fundme.connect(deployer);

        const tx_response = await fundme.fund({ value: sendValue });
        MockV3Aggregator_address = (await deployments.get("MockV3Aggregator"))
          .address;
        MockV3Aggregator = await ethers.getContractAt(
          "MockV3Aggregator",
          MockV3Aggregator_address
        );
        MockV3Aggregator = MockV3Aggregator.connect(deployer);
        add = await MockV3Aggregator.getAddress();
      });
      //Test for constructor unit
      describe("constructor", () => {
        // beforeEach(()=>{
        // })
        it("sets the correct address of the aggregator", async () => {
          //getPriceFeedAddress() will return an aggregator interface contract object address
          const response = await fundme.getPriceFeedAddress();
          assert.equal(response, add);
        });
      });

      describe("fund", () => {
        it("should revert on sending inefficient amount of eth", async () => {
          await expect(fundme.fund()).to.be.revertedWith(
            "You need to spend more ETH!"
          );
        });
        it("should update the addressToAmountFunded ", async () => {
          await fundme.fund({ value: sendValue });
          const response = await fundme.addressToAmountFunded(deployer);
          const bal = await ethers.provider.getBalance(fundme_address);
          assert(response.toString(), bal.toString());
        });

        it("should add funder to the funders array", async () => {
          fundme = await fundme.connect(accounts[1]);
          await fundme.fund({ value: sendValue });
          const response = await fundme.funders[1];
          assert(accounts[1], response);
        });

        // it("should update the addressToAmountFunded ",async ()=>{
        //     const initial_fundme_bal= await ethers.provider.getBalance(fundme_address)
        //     const new_fundme_bal= initial_fundme_bal.add(sendValue)
        //     await fundme.fund({value:sendValue})
        //     const expected_fundme_bal= await ethers.provider.getBalance(fundme_address)
        // })
      });
      describe("withdraw", () => {
        it("only allows the owner to withdraw ", async () => {
          fundme = await fundme.connect(accounts[2]);
          // await expect(fundme.withdraw()).to.be.reverted
          await expect(fundme.withdraw()).to.be.revertedWithCustomError(
            fundme,
            "NotOwner"
          );
        });

        it("empty the balance of the fundme contract when called by owner", async () => {
          fundme = await fundme.connect(deployer);
          await fundme.withdraw();
          const response = await ethers.provider.getBalance(fundme_address);
          assert(response.toString(), "0");
        });
      });
    });
