const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // const arguments_unit_nft = ["UnitNft", "UNFT"]
    // const unitNft = await deploy("UnitNft", {
    //     from: deployer,
    //     args: arguments_unit_nft,
    //     log: true,
    //     waitConfirmations: network.config.blockConfirmations || 1,
    // })

    // // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...")
    //     await verify(unitNft.address, arguments_unit_nft)
    // }

    // log("----------------------------------------------------")
    const arguments_unit_factory = []
    const unitNftFactory = await deploy("UnitNftFactory", {
        from: deployer,
        args: arguments_unit_factory,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("----------------------------------------------------")
    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(unitNftFactory.address, arguments_unit_factory)
    }
}

module.exports.tags = ["all", "unit_nft_factory"]
