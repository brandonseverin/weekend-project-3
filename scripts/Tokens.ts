import { viem } from "hardhat";
import { parseEther, formatEther } from "viem";


async function main() {
    const publicClient = await viem.getPublicClient();
    const [deployer, account1, account2] = await viem.getWalletClients();
    const tokenContract = await viem.deployContract("MyToken");
    console.log(`Contract deployed at ${tokenContract.address}`);
    // Fetching the role code
    const code = await tokenContract.read.MINTER_ROLE();

    const roleTx = await tokenContract.write.grantRole([
        code,
        account2.account.address,
    ]);
    await publicClient.waitForTransactionReceipt({ hash: roleTx});
    const [name, symbol, decimals, totalSupply] = await Promise.all([
        tokenContract.read.name(),
        tokenContract.read.symbol(),
        tokenContract.read.decimals(),
        tokenContract.read.totalSupply(),
    ]);
    console.log({name, symbol, decimals, totalSupply});

    // Sending a transaction
    const tx = await tokenContract.write.transfer([account1.account.address, parseEther("2")]);

    // Viewing balances
    // const myBalance = await tokenContract.read.balanceOf([deployer.account.address]);
    // console.log(`My Balance is ${myBalance} decimals units`);
    // const otherBalance = await tokenContract.read.balanceOf([account1.account.address]);
    // console.log(
    // `The Balance of Acc1 is ${otherBalance} decimals units`

    // View converted balances
    const myBalance = await tokenContract.read.balanceOf([deployer.account.address]);
    console.log(`My Balance is ${formatEther(myBalance)} ${symbol}`);
    const otherBalance = await tokenContract.read.balanceOf([account1.account.address]);
    console.log(
    `The Balance of Acc1 is ${formatEther(otherBalance)} ${symbol}`
);


}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});