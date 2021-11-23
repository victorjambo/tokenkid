## `TokenKidFactory`

Factory to create/mint ERC721 Tokens




### `constructor(address owner)` (public)
Used to initialize the TokenKidFactory contract.


### `onlyExisting(uint256 _tokenId)` (internal)
Modifier to check if TokenId exists


### `onlyOwner(uint256 _tokenId)` (internal)
Modifier to check if Token is owned by msg.sender


### `safeMint(string _tokenName, uint256 _price, string _tokenURI)` (public)
Used to create/mint a token.


### `buyToken(uint256 _tokenId, uint256 _price, address token)` (public)
Transfer ownership of ERC721 token and Transfer ERC20 tokens to owner.


### `getMintedToken(uint256 _tokenId)` (public)
Get a Minted Token given the _tokenId

Setters-----------------------------------------------------------------

### `changeTokenPrice(uint256 _tokenId, uint256 _price)` (public)
Update NFT Price


### `toggleOnSale(uint256 _tokenId)` (public)
Update NFT On sale Availability
