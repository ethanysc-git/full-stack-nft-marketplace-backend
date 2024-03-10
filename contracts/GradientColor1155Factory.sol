//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract UnitNft is ERC1155, AccessControl {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(address defaultAdmin, address minter) ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, minter);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

contract GradientColor1155Factory {
    mapping(address => address) public getPair;

    event ContractCreated(address gradientColorAddr);

    function createGradientColor(
        address _contractOwner,
        address _initialTokenOwner,
        string memory _tokenName,
        string memory _tokenSymbol
    ) external returns (address gradientColorAddr) {
        bytes32 salt = keccak256(abi.encodePacked(_tokenName, _tokenSymbol));

        UnitNft gc = new UnitNft{salt: salt}(_contractOwner, _initialTokenOwner);

        gradientColorAddr = address(gc);
        getPair[gradientColorAddr] = msg.sender;
        emit ContractCreated(gradientColorAddr);
    }
}
