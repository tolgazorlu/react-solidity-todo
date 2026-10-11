# react-solidity-todo

A decentralized todo list dApp built with React and a Solidity smart contract.

## About

Demo project showing how to connect a React frontend to an Ethereum smart
contract: add, update and remove todo items stored on-chain. Built
February-March 2023.

![demo](https://github.com/tolgazorlu/react-solidity-todo/blob/main/todo.gif)

## Features

- Add, edit, complete and remove tasks stored in a `Todo` smart contract
- Wallet connection hook (`useConnection`)
- Contract read/write hook (`useContract`)

## Tech stack

- React 18, Tailwind CSS (client)
- Solidity 0.8.17, Hardhat (contracts)

## Project structure

```
client/      React frontend (Create React App)
  src/
    components/   Header, Todo
    hooks/        useConnection, useContract
    contracts/    ABI/address for the deployed Todo contract
contracts/   Hardhat project
  contracts/Todo.sol
  scripts/deploy.js
  test/Lock.js
```

## Getting started

```bash
# smart contract
cd contracts
npm install
npx hardhat compile
npx hardhat node          # local chain
npx hardhat run scripts/deploy.js --network localhost

# frontend
cd client
npm install
npm start
```

## Status

Learning project demonstrating a React + Solidity integration, not
maintained.

## Related projects

- https://github.com/tolgazorlu/solidity-introduction
- https://github.com/tolgazorlu/solidity-todo
