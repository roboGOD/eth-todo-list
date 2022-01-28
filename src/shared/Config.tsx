import { AbiItem } from 'web3-utils';
import TodoList from '../contracts/TodoList.json';

export const TODO_LIST_ADDRESS = '0xa236dE00d8B832f56b14649ee10bD15f5485df71';

export const TODO_LIST_ABI = TodoList ? TodoList.abi as AbiItem[] : [];
