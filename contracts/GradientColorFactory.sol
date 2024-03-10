//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC404} from "./ERC404.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract GradientColor is ERC404 {
    using Strings for uint256;

    uint256 public immutable ERC721_SUPPLY = 10000;
    string public baseTokenURI;

    error NonExistentToken();

    constructor(
        address _contractOwner,
        address _initialTokenOwner,
        string memory _tokenName,
        string memory _tokenSymbol
    ) ERC404(_tokenName, _tokenSymbol, 18, ERC721_SUPPLY, _contractOwner) {
        balanceOf[_initialTokenOwner] = ERC721_SUPPLY * 10 ** 18;
    }

    function setTokenURI(string memory _tokenURI) public {
        baseTokenURI = _tokenURI;
    }

    function setNameSymbol(string memory _name, string memory _symbol) public {
        _setNameSymbol(_name, _symbol);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI, id.toString(), ".json"));
    }
}

contract GradientColorFactory {
    mapping(address => address) public getPair;

    event ContractCreated(address GradientColorAddr);

    function createGradientColor(
        address _contractOwner,
        address _initialTokenOwner,
        string memory _tokenName,
        string memory _tokenSymbol
    ) external returns (address GradientColorAddr) {
        bytes32 salt = keccak256(abi.encodePacked(_tokenName, _tokenSymbol));

        GradientColor gc = new GradientColor{salt: salt}(
            _contractOwner,
            _initialTokenOwner,
            _tokenName,
            _tokenSymbol
        );

        //gc.setNameSymbol(_tokenName, _tokenSymbol);

        GradientColorAddr = address(gc);
        getPair[GradientColorAddr] = msg.sender;
        emit ContractCreated(GradientColorAddr);
    }
}
