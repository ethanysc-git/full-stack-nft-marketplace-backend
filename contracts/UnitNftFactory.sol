// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract UnitNft is ERC721URIStorage {
    address public factory;
    string public tokenName;
    string public tokenSymbol;
    uint256 public tokenTotalSupply;
    uint256 private s_tokenCounter;

    event NftMinted(string cid, address minter);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        factory = msg.sender;
        s_tokenCounter = 0;
    }

    function initialize(uint256 _tokenTotalSupply) external {
        require(msg.sender == factory, "UnitNft: FORBIDDEN");
        tokenTotalSupply = _tokenTotalSupply;
    }

    function mint(string memory tokenUri) external {
        require(s_tokenCounter <= tokenTotalSupply, "Over max supply");
        uint256 newItemId = s_tokenCounter;
        s_tokenCounter = s_tokenCounter + 1;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenUri);
        emit NftMinted(tokenUri, msg.sender);
    }

    function safeTransfer(address to, uint256 tokenId) external {
        approve(to, tokenId);
        safeTransferFrom(msg.sender, to, tokenId, "");
    }
}

contract UnitNftFactory {
    mapping(address => address) public getPair;

    event ContractCreated(address unitAddr);

    function createUnitNft(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _tokenTotalSupply
    ) external returns (address unitAddr) {
        bytes32 salt = keccak256(abi.encodePacked(_tokenName, _tokenSymbol));

        UnitNft unit = new UnitNft{salt: salt}(_tokenName, _tokenSymbol);

        unit.initialize(_tokenTotalSupply);
        unitAddr = address(unit);
        getPair[unitAddr] = msg.sender;
        emit ContractCreated(unitAddr);
    }
}
