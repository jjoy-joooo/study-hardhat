import { ethers } from 'hardhat';
import { expect } from 'chai';

import { HelloWorld } from '../typechain-types';

describe('HelloWorld', function () {
  it("Should return the new message once it's changed", async function () {
    const HelloWorld = await ethers.getContractFactory('HelloWorld');
    const helloWorld = (await HelloWorld.deploy('Hello, world!')) as HelloWorld;

    await helloWorld.waitForDeployment();

    expect(await helloWorld.getMessage()).to.equal('Hello, world!');

    const setMessageTx = await helloWorld.setMessage('Hola, mundo!');

    await setMessageTx.wait();

    expect(await helloWorld.getMessage()).to.equal('Hola, mundo!');
  });
});
