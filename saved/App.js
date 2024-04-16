import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { ethers } from "hardhat";
import abi from "./abi/Fruit.json";

const contractAddress = "0x5231cCCE7958cF88071d5d2762f211445e5122DD";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect wallet");
  const [currentContractVal, setCurrentContractVal] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((result) => {
          accountChangedHandler(result[0]);
          setErrorMessage("Wallet connected");
        });
    } else {
      setErrorMessage("Need to install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const updateEthers = () => {
    let tempProvider = new ethers.provider.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, abi, tempSigner);
    setContract(tempContract);
  };

  const getName = async () => {
    let val = await contract.name;
    setCurrentContractVal(val);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectWalletHandler}>{connectButtonText}</button>
        <h3>Address: {defaultAccount}</h3>
        {currentContractVal}
        {errorMessage}
      </header>
    </div>
  );
}

export default App;
