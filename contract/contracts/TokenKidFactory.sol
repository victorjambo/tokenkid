// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @author @victorjambo
/// @notice Factory to create/mint ERC721 Tokens
contract TokenKidFactory is ERC721URIStorage {

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

    /// @notice Used to initialize the TokenKid contract
    constructor() ERC721("TokenKid", "KID") {}

    /// @notice Mint a new ERC721 token
    /// @param _tokenName Token Name
    /// @param _price Token Price in wei. Value of NFT.
    /// @param _tokenURI BaseURI
    function safeMint(
        string memory _tokenName,
        uint256 _price,
        string memory _tokenURI
    ) public {
        // Mint
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        // update tokenKids mapping with newly minted token
        tokenKids[tokenId] = TokenKid(
            tokenId,
            _tokenName,
            payable(msg.sender), // owner
            payable(msg.sender), // previousOwner
            _price,
            _tokenURI,
            true
        );
    }

    /// @notice Transfer ownership of ERC721 token and Transfer ERC20 tokens to owner.
    /// @param _tokenId NFT Token Id.
    /// @param token ERC20 Token contract address.
    /// @dev We Transfer ERC20 Tokens to owner of the NFT Hence The ERC20 Token address.
    function buyToken(
        uint256 _tokenId,
        address token
    ) public payable onlyExisting(_tokenId) {
        // Get owner of the token
        address tokenOwner = ownerOf(_tokenId);

        // Check: owner cannot buy their own token
        require(tokenOwner != msg.sender, "OWNER CANNOT BUY OWN TOKEN");

        // Get the Token from tokenKids mapping
        TokenKid memory tokenkid = tokenKids[_tokenId];

        // Check: price should be greater than or equal to token price
        uint _price = msg.value;
        require(_price >= tokenkid.price, "TOKEN PRICE IS NOT ENOUGH");

        // Check: Token should be available for sale
        require(tokenkid.isOnSale, "TOKEN IS NOT ONSALE");

        // Transfer Token ownership
        _transfer(tokenkid.owner, msg.sender, _tokenId);

        // Transfer Coin worth Price of Token bought
        require(
            IERC20(token).transferFrom(msg.sender, tokenkid.owner, _price),
            "COIN TRANFER FAILED"
        );

        // update tokenKids mapping
        tokenkid.previousOwner = tokenkid.owner;
        tokenkid.owner = payable(msg.sender);
        tokenKids[_tokenId] = tokenkid;
    }

    /// @notice Get a Minted Token given the _tokenId
    /// @param _tokenId NFT Token Id.
    /// @return The `TokenKid`
    function getMintedToken(uint256 _tokenId)
        public
        view
        onlyExisting(_tokenId)
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
        // Check: if tokenId exists
        require(_exists(_tokenId));

        TokenKid memory tokenkid = tokenKids[_tokenId];

        return (
            tokenkid.tokenId,
            tokenkid.tokenName,
            tokenkid.owner,
            tokenkid.previousOwner,
            tokenkid.price,
            tokenkid.tokenURI,
            tokenkid.isOnSale
        );
    }

    /// @notice Update NFT Price
    /// @param _tokenId NFT Token Id.
    /// @param _price Price in wei.
    function changeTokenPrice(uint256 _tokenId, uint256 _price)
        public
        onlyOwner(_tokenId)
    {
        tokenKids[_tokenId].price = _price;
    }

    /// @notice Update NFT On sale Availability
    /// @param _tokenId NFT Token Id.
    function toggleOnSale(uint256 _tokenId)
        public
        onlyExisting(_tokenId)
        onlyOwner(_tokenId)
    {
        TokenKid memory tokenkid = tokenKids[_tokenId];
        if (tokenkid.isOnSale) {
            tokenkid.isOnSale = false;
        } else {
            tokenkid.isOnSale = true;
        }
        tokenKids[_tokenId] = tokenkid;
    }

    /// @notice Modifier to check if token exists
    /// @param _tokenId NFT Token Id.
    modifier onlyExisting(uint256 _tokenId) {
        require(_exists(_tokenId), "TOKEN DOES NOT EXIST");
        _;
    }

    /// @notice Modifier to check if msg.sender is owner of token
    /// @param _tokenId NFT Token Id.
    modifier onlyOwner(uint256 _tokenId) {
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender, "NOT OWNER");
        _;
    }
}
