import { AbiItem } from 'web3-utils';
import TodoList from '../contracts/TodoList.json';

export const TODO_LIST_ADDRESS = '0x74970Eb7B61237b4bD9F9bb20880B8C94FefB62B';

export const TODO_LIST_ABI = TodoList ? TodoList.abi as AbiItem[] : [];
