// Deploy all contracts to the selected network (CommonJS so it works regardless of ESM project type)
const hre = require('hardhat');
const fs = require('fs');
const path = require('path');

function deployedAddress(c) {
  // support ethers v6 (c.target) and v5 (c.address)
  return c.target !== undefined ? c.target : c.address;
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deployer:', deployer.address);
  console.log('Network:', hre.network.name);

  const artifactsOut = {};

  // helper to capture artifact ABI + address
  function capture(name, contractInstance) {
    const addr = deployedAddress(contractInstance);
    let abi = null;
    try {
      const art = hre.artifacts.readArtifactSync(name);
      abi = art.abi;
    } catch (err) {
      console.warn('Could not read artifact for', name, err.message || err);
    }
    artifactsOut[name] = { address: addr, abi };
    return addr;
  }

  // 1) PaymentSplitter
  console.log('\nDeploying PaymentSplitter...');
  const PaymentSplitter = await hre.ethers.getContractFactory('PaymentSplitter');
  const paymentSplitter = await PaymentSplitter.deploy([deployer.address], [100]);
  if (paymentSplitter.waitForDeployment) await paymentSplitter.waitForDeployment();
  else await paymentSplitter.deployed();
  console.log('PaymentSplitter deployed to', deployedAddress(paymentSplitter));
  capture('PaymentSplitter', paymentSplitter);

  // 2) Factory
  console.log('\nDeploying Factory...');
  const Factory = await hre.ethers.getContractFactory('Factory');
  const factory = await Factory.deploy();
  if (factory.waitForDeployment) await factory.waitForDeployment();
  else await factory.deployed();
  console.log('Factory deployed to', deployedAddress(factory));
  capture('Factory', factory);

  // 3) Marketplace (pass deployer as feeRecipient by default)
  console.log('\nDeploying Marketplace...');
  const Marketplace = await hre.ethers.getContractFactory('Marketplace');
  const marketplace = await Marketplace.deploy(deployer.address);
  if (marketplace.waitForDeployment) await marketplace.waitForDeployment();
  else await marketplace.deployed();
  console.log('Marketplace deployed to', deployedAddress(marketplace));
  capture('Marketplace', marketplace);

  // Summary
  console.log('\n--- Deployment summary ---');
  Object.entries(artifactsOut).forEach(([name, info]) => console.log(`${name}: ${info.address}`));
  console.log('--------------------------');

  // write deployments file
  const outDir = path.join(process.cwd(), 'deployments');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${hre.network.name}.json`);
  fs.writeFileSync(outFile, JSON.stringify({ network: hre.network.name, deployer: deployer.address, contracts: artifactsOut }, null, 2));
  console.log('Wrote deployments to', outFile);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
