export const ERC165_ABI = ['function supportsInterface(bytes4) view returns (bool)'];

export const ERC721_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function ownerOf(uint256) view returns (address)',
  'function tokenURI(uint256) view returns (string)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function tokenURI(uint256 tokenId) view returns (string)',
];

export const OWNABLE_ABI = ['function owner() view returns (address)'];

export const ERC2981_ABI = ['function royaltyInfo(uint256,uint256) view returns (address,uint256)'];
