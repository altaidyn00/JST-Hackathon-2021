// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

// import ERC721 iterface
import "./ERC721.sol";

contract JasTalents is ERC721 {

  string public collectionName;
  string public collectionNameSymbol;
  uint256 public jasTalentsCounter;


   struct JasTalent {
    uint256 tokenId;
    string tokenName;
    string tokenURI;
    address payable mintedBy;
    address payable currentOwner;
    address payable previousOwner;
    uint256 price;
    uint256 numberOfTransfers;
    bool forSale;
  }


  mapping(uint256 => JasTalent) public allJasTalents;
  mapping(string => bool) public tokenNameExists;
  mapping(string => bool) public colorExists;
  mapping(string => bool) public tokenURIExists;

  constructor() ERC721("Jas Talents Collections", "JST") {
    collectionName = name();
    collectionNameSymbol = symbol();
  }

  function mintJasTalent(string memory _name, string memory _tokenURI, uint256 _price, string[] calldata _colors) external {
    require(msg.sender != address(0));
    jasTalentsCounter ++;
    require(!_exists(jasTalentsCounter));

    for(uint i=0; i<_colors.length; i++) {
      require(!colorExists[_colors[i]]);
    }
    require(!tokenURIExists[_tokenURI]);
    require(!tokenNameExists[_name]);

    _mint(msg.sender, jasTalentsCounter);
    _setTokenURI(jasTalentsCounter, _tokenURI);

    for (uint i=0; i<_colors.length; i++) {
      colorExists[_colors[i]] = true;
    }

    tokenURIExists[_tokenURI] = true;
    tokenNameExists[_name] = true;

    JasTalent memory newJasTalent = JasTalent(
    jasTalentsCounter,
    _name,
    _tokenURI,
    msg.sender,
    msg.sender,
    address(0),
    _price,
    0,
    true);

    allJasTalents[jasTalentsCounter] = newJasTalent;
  }

  function getTokenOwner(uint256 _tokenId) public view returns(address) {
    address _tokenOwner = ownerOf(_tokenId);
    return _tokenOwner;
  }

  function getTokenMetaData(uint _tokenId) public view returns(string memory) {
    string memory tokenMetaData = tokenURI(_tokenId);
    return tokenMetaData;
  }

  function getNumberOfTokensMinted() public view returns(uint256) {
    uint256 totalNumberOfTokensMinted = totalSupply();
    return totalNumberOfTokensMinted;
  }

  function getTotalNumberOfTokensOwnedByAnAddress(address _owner) public view returns(uint256) {
    uint256 totalNumberOfTokensOwned = balanceOf(_owner);
    return totalNumberOfTokensOwned;
  }

  function getTokenExists(uint256 _tokenId) public view returns(bool) {
    bool tokenExists = _exists(_tokenId);
    return tokenExists;
  }

  function buyToken(uint256 _tokenId) public payable {
    require(msg.sender != address(0));
    require(_exists(_tokenId));
    address tokenOwner = ownerOf(_tokenId);
    require(tokenOwner != address(0));
    require(tokenOwner != msg.sender);


    JasTalent memory jastalent = allJasTalents[_tokenId];
    require(msg.value >= jastalent.price);
    require(jastalent.forSale);
    _transfer(tokenOwner, msg.sender, _tokenId);
    address payable sendTo = jastalent.currentOwner;
    sendTo.transfer(msg.value);
    jastalent.previousOwner = jastalent.currentOwner;
    jastalent.currentOwner = msg.sender;
    jastalent.numberOfTransfers += 1;
    allJasTalents[_tokenId] = jastalent;
  }

  function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
    require(msg.sender != address(0));
    require(_exists(_tokenId));
    address tokenOwner = ownerOf(_tokenId);
    require(tokenOwner == msg.sender);


    JasTalent memory jastalent = allJasTalents[_tokenId];
    jastalent.price = _newPrice;
    allJasTalents[_tokenId] = jastalent;
  }

  function toggleForSale(uint256 _tokenId) public {
    require(msg.sender != address(0));
    require(_exists(_tokenId));
    address tokenOwner = ownerOf(_tokenId);
    require(tokenOwner == msg.sender);
    JasTalent memory jastalent = allJasTalents[_tokenId];
    if(jastalent.forSale) {
      jastalent.forSale = false;
    } else {
      jastalent.forSale = true;
    }
    allJasTalents[_tokenId] = jastalent;
  }
}