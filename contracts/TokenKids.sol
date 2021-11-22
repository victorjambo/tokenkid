// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TokenKids is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct TokenKid {
        uint256 tokenId;
        string tokenName;
        address payable owner;
        address payable previousOwner;
        uint256 price;
        string tokenURI;
        bool isOnSale;
    }

    mapping(uint256 => TokenKid) public tokenKids;

    uint256 internal tokenCounter = 0;

    constructor() ERC721("TokenKid", "cKID") {}

    function safeMint(
        string memory _tokenName,
        uint256 _price,
        string memory _tokenURI
    ) public onlyOwner {
        // Mint
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        // update tokenKids mapping with newly minted token
        tokenKids[tokenCounter] = TokenKid(
            tokenId,
            _tokenName,
            payable(msg.sender), // owner
            payable(msg.sender), // previousOwner
            _price,
            _tokenURI,
            true
        );
        tokenCounter++;
    }

    function buyToken(uint256 _tokenId) public {
        TokenKid memory tokenkid = tokenKids[_tokenId];

        // safe Transfer
        _transfer(tokenkid.owner, msg.sender, _tokenId);

        // update tokenKids mapping
        tokenkid.previousOwner = tokenkid.owner;
        tokenkid.owner = payable(msg.sender);
        tokenKids[_tokenId] = tokenkid;
    }

    function changeTokenPrice(uint256 _tokenId, uint256 _price) public {
        tokenKids[_tokenId].price = _price;
    }

    function getMintedToken(uint256 _tokenId)
        public
        view
        returns (
            uint256,
            string memory,
            address payable,
            address payable,
            uint256,
            string memory,
            bool
        )
    {
        return (
            tokenKids[_tokenId].tokenId,
            tokenKids[_tokenId].tokenName,
            tokenKids[_tokenId].owner,
            tokenKids[_tokenId].previousOwner,
            tokenKids[_tokenId].price,
            tokenKids[_tokenId].tokenURI,
            tokenKids[_tokenId].isOnSale
        );
    }

    function toggleOnSale(uint256 _tokenId) public {
        TokenKid memory tokenkid = tokenKids[_tokenId];
        if (tokenkid.isOnSale) {
            tokenkid.isOnSale = false;
        } else {
            tokenkid.isOnSale = true;
        }
        tokenKids[_tokenId] = tokenkid;
    }
}
