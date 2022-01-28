import React from "react";
import Web3 from "web3";
import { useWeb3Context } from "../../shared/Web3Context";

export default function App() {
  const { web3, account } = useWeb3Context();
  return <div className="container"> 
    <h1> roboGOD </h1>
    <div className="alert alert-success"> Account: {account} </div>
  </div>;
}
