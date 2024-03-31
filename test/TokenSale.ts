import { expect } from "chai";
import { viem } from "hardhat";
import { parseEther } from 'viem'
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";

const TEST_RATIO = 10n;
const TEST_PRICE = 5n;
const TEST_BUY_AMOUNT = "10";

async function fixture() {
  const publicClient = await viem.getPublicClient();
  const deployer 
  const myTokenContract = await viem.deployContract("MyToken", []);
  const tokenSaleContract = await viem.deployContract("TokenSale", 
  [ 
    TEST_RATIO, 
    TEST_PRICE, 
    myTokenContract.address, 
    "0x0000000000000000000000000000000000000000"
  ]
    );

    const 
  // const MINTER_ROLE 
    // console.log(tokenSaleContract.address)

  return {tokenSaleContract, myTokenContract};
}

describe("NFT Shop", async () => {
  describe("When the Shop contract is deployed", async () => {
    it("defines the ratio as provided in parameters", async () => {
      const {tokenSaleContract, myTokenContract} = await loadFixture(fixture);
      const ratio = await tokenSaleContract.read.ratio();
      expect(ratio).to.be.eq(TEST_RATIO);

    })
    it("defines the price as provided in parameters", async () => {
      const tokenSaleContract = await loadFixture(fixture);
      const price = await tokenSaleContract.read.price();
      expect(price).to.be.eq(TEST_PRICE);
    });
    it("uses a valid ERC20 as payment token", async () => {
      const tokenSaleContract = await loadFixture(fixture);
      const paymentTokenAddress = await tokenSaleContract.read.paymentToken();
      const paymentToken = await viem.getContractAt("IERC20", paymentTokenAddress);
      const totalSupply = await paymentToken.read.totalSupply();
      expect(totalSupply).to.be.gte(0);

    });
    it("uses a valid ERC721 as NFT collection", async () => {
      throw new Error("Not implemented");
    });
  })
  describe("When a user buys an ERC20 from the Token contract", async () => {  
    it("charges the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    })
    it("gives the correct amount of tokens", async () => {
      const {tokenSaleContract, myTokenContract, deployer, acc1} = await loadFixture(fixture);
      const tokenBalanceBefore = await myTokenContract.read.balanceOf([deployer.account.address]);
      const tx = await tokenSaleContract.write.buyTokens({value: parseEther(TEST_BUY_AMOUNT)});
      const tokenBalanceAfter = await myTokenContract.read.balanceOf([deployer.account.address]);
      const diff = tokenBalanceAfter - tokenBalanceBefore;
      expect(diff).to.be.eq(parseEther(TEST_BUY_AMOUNT) * TEST_RATIO);
    });
  })
  describe("When a user burns an ERC20 at the Shop contract", async () => {
    it("gives the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    })
    it("burns the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  })
  describe("When a user buys an NFT from the Shop contract", async () => {
    it("charges the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    })
    it("gives the correct NFT", async () => {
      throw new Error("Not implemented");
    });
  })
  describe("When a user burns their NFT at the Shop contract", async () => {
    it("gives the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });
  })
  describe("When the owner withdraws from the Shop contract", async () => {
    it("recovers the right amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    })
    it("updates the owner pool account correctly", async () => {
      throw new Error("Not implemented");
    });
  });
});