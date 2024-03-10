const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("----------------------------------------------------")
    const arguments_testGradientColor1155 = [deployer, deployer]
    const testGradientColor1155 = await deploy("GradientColor1155", {
        from: deployer,
        args: arguments_testGradientColor1155,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(testGradientColor1155.address, arguments_testGradientColor1155)
    }
    // log("----------------------------------------------------")
    // const arguments_testGradientColor1155Factory = []
    // const testGradientColor1155Factory = await deploy("GradientColor1155Factory", {
    //     from: deployer,
    //     args: arguments_testGradientColor1155Factory,
    //     log: true,
    //     waitConfirmations: network.config.blockConfirmations || 1,
    // })

    // // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...")
    //     await verify(testGradientColor1155Factory.address, arguments_testGradientColor1155Factory)
    // }
}

module.exports.tags = ["all", "test1155NftFactory", "main"]
