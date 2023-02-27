// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Todo{

    struct Task{
        string text;
        bool status;
    }

    Task[] public tasks;

}