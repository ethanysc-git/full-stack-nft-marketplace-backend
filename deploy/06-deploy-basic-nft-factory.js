// const { network } = require("hardhat")
// const { developmentChains } = require("../helper-hardhat-config")
// const { verify } = require("../utils/verify")

// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments
//     const { deployer } = await getNamedAccounts()
//     log("----------------------------------------------------")
//     const arguments_testGradientCircle = [deployer, deployer]
//     const testGradientCircle = await deploy("GradientCircle", {
//         from: deployer,
//         args: arguments_testGradientCircle,
//         log: true,
//         waitConfirmations: network.config.blockConfirmations || 1,
//     })

//     // Verify the deployment
//     if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
//         log("Verifying...")
//         await verify(testGradientCircle.address, arguments_testGradientCircle)
//     }
// }

// module.exports.tags = ["all", "testfactory", "main"]

// const { network, ethers } = require("hardhat")

// module.exports = async ({ getNamedAccounts }) => {
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId
//     console.log(`Test GradientColorFactory`)
//     const testNftFactory = await ethers.getContract("GradientColorFactory", deployer)
// }
// module.exports.tags = ["all", "testNftFactory"]

const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("----------------------------------------------------")
    const arguments_testGradientColorFactory = []
    const testGradientColorFactory = await deploy("GradientColorFactory", {
        from: deployer,
        args: arguments_testGradientColorFactory,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(testGradientColorFactory.address, arguments_testGradientColorFactory)
    }
}

module.exports.tags = ["all", "testNftFactory", "main"]
