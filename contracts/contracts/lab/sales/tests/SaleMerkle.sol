// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Sale, SaleState, GBCLab} from "../Sale.sol";
import {Native} from "../payments/Native.sol";
import {Token} from "../payments/Token.sol";
import {Mintable, MintState, MintRule} from "../mint/Mintable.sol";
import {PrivateMerkle} from "../mint/private/Merkle.sol";

import {ERC20} from "@rari-capital/solmate/src/tokens/ERC20.sol";

contract SaleMerkleTest is Sale, Native, PrivateMerkle {
    constructor(
        uint256 item_,
        GBCLab lab_,
        SaleState memory state_,
        address payable owner_,
        uint64 end,
        bytes32 _root
    )
        Sale(item_, lab_, state_, owner_)
        Native(owner_)
        Mintable(MintState(200, end))
        PrivateMerkle(_root)
    {}
}
