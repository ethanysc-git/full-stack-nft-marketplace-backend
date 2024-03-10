const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // log("----------------------------------------------------")
    // const arguments_test_unit_nft = ["UnitNft", "UNFT"]
    // const unitNft = await deploy("UnitNft", {
    //     from: deployer,
    //     args: arguments_test_unit_nft,
    //     log: true,
    //     waitConfirmations: network.config.blockConfirmations || 1,
    // })

    // // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...")
    //     await verify(unitNft.address, arguments_test_unit_nft)
    // }
    log("----------------------------------------------------")
    const arguments_testGradientCircle = [deployer, deployer]
    const testGradientCircle = await deploy("GradientCircleOri", {
        from: deployer,
        args: arguments_testGradientCircle,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(testGradientCircle.address, arguments_testGradientCircle)
    }
}

module.exports.tags = ["all", "testnft", "main"]
