// contracts/FruitSalad.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract FruitSalad is ERC1155 {
    address payable public Owner;
    uint256 price = 500000000000000;
    string public name = "FruitSalad";
    string public symbol = "FRTSLD";

    uint256 public constant MANGO = 0;
    uint256 public constant ORANGE = 1;
    uint256 public constant BANANA = 2;
    uint256 public constant PEACH = 3;
    uint256 public constant GRAPE = 4;
    uint256 public constant FRUIT_SALAD = 5;

    constructor() ERC1155("https://github.com/Cha-M/FruitSaladFrontend/tree/main/src/app/token/{id}.json") {
        Owner = payable(msg.sender);
        _mint(msg.sender, MANGO, 1, "");
        _mint(msg.sender, ORANGE, 2, "");
        _mint(msg.sender, BANANA, 1, "");
        _mint(msg.sender, PEACH, 1, "");
        _mint(msg.sender, GRAPE, 10, "");
    }

    function withdraw() public {
        Owner.transfer(address(this).balance);
    }

    function buyFruit(uint256 numberOfFruit) public payable {
        require(msg.value == (numberOfFruit * price));
        uint256 pseudoRand = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 4 + 1;

        _mint(msg.sender, MANGO, numberOfFruit * pseudoRand, "");
        _mint(msg.sender, ORANGE, numberOfFruit * pseudoRand, "");
        _mint(msg.sender, BANANA, numberOfFruit * pseudoRand, "");
        _mint(msg.sender, PEACH, numberOfFruit * pseudoRand, "");
        _mint(msg.sender, GRAPE, numberOfFruit * pseudoRand * 10, "");
    }

    function makeFruitSalad(uint256 numberOfFruitSalads) public {
        uint256 NumberOfFruitSaladsX2 = numberOfFruitSalads * 2;

        _burn(msg.sender, MANGO, numberOfFruitSalads);
        _burn(msg.sender, ORANGE, NumberOfFruitSaladsX2);
        _burn(msg.sender, BANANA, numberOfFruitSalads);
        _burn(msg.sender, PEACH, NumberOfFruitSaladsX2);
        _burn(msg.sender, GRAPE, numberOfFruitSalads * 10);

        _mint(msg.sender, FRUIT_SALAD, numberOfFruitSalads, "");
    }
}