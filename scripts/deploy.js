async function main() {
  const [deployer] = await ethers.getSigners();
  // console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(
    "Deployer address:",
    await deployer.getAddress(),
    "Account balance:",
    await ethers.provider.getBalance(await deployer.getAddress())
  );

  const FruitSalad = await ethers.getContractFactory("FruitSalad");
  console.log("Deploying FruitSalad...");
  const fruitSalad = await FruitSalad.deploy();
  await fruitSalad.waitForDeployment();
  // await fruitSalad.deployed();
  console.log("FruitSalad deployed to:", await fruitSalad.getAddress());
  // console.log("FruitSalad deployed to:", fruitSalad.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
