import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import JasTalents from "../ABI/JasTalents.json";

import JSTCreate from "./jva/JSTCreate";
import JSTList from "./jva/JSTList";
import Home from "./jva/Home";
import ConnectionError from "./jva/ConnectionError";
import MetamaskConnection from "./jva/MetamaskConnection";
import Loading from "./jva/Loading";
import Menu from "./jva/Menu";
import JSTOwnerList from "./jva/JSTOwnerList";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      jasTalentsContract: null,
      jasTalentsCount: 0,
      jasTalents: [],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      totalTokensMinted: 0,
      totalTokensOwnedByAccount: 0,
      nameIsUsed: false,
      colorIsUsed: false,
      colorsUsed: [],
      lastMintTime: null,
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.setMetaData();
    await this.setMintBtnTimer();
  };

  setMintBtnTimer = () => {
    const mintBtn = document.getElementById("mintBtn");
    if (mintBtn !== undefined && mintBtn !== null) {
      this.setState({
        lastMintTime: localStorage.getItem(this.state.accountAddress),
      });
      this.state.lastMintTime === undefined || this.state.lastMintTime === null
        ? (mintBtn.innerHTML = "Mint")
        : this.checkIfCanMint(parseInt(this.state.lastMintTime));
    }
  };

  checkIfCanMint = (lastMintTime) => {
    const mintBtn = document.getElementById("mintBtn");
    const timeGap = 300000; //5min in milliseconds
    const countDownTime = lastMintTime + timeGap;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countDownTime - now;
      if (diff < 0) {
        mintBtn.removeAttribute("disabled");
        mintBtn.innerHTML = "Mint";
        localStorage.removeItem(this.state.accountAddress);
        clearInterval(interval);
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        mintBtn.setAttribute("disabled", true);
        mintBtn.innerHTML = `${minutes}m ${seconds}s`;
      }
    }, 1000);
  };

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      this.setState({ loading: false });
      const networkId = await web3.eth.net.getId();
      const networkData = JasTalents.networks[networkId];
      if (networkData) {
        this.setState({ loading: true });
        const jasTalentsContract = web3.eth.Contract(
          JasTalents.abi,
          networkData.address
        );
        this.setState({ jasTalentsContract });
        this.setState({ contractDetected: true });
        const jasTalentsCount = await jasTalentsContract.methods
          .jasTalentsCounter()
          .call();
        this.setState({ jasTalentsCount });
        for (var i = 1; i <= jasTalentsCount; i++) {
          const jasTalent = await jasTalentsContract.methods
            .allJasTalents(i)
            .call();
          this.setState({
            jasTalents: [...this.state.jasTalents, jasTalent],
          });
        }
        let totalTokensMinted = await jasTalentsContract.methods
          .getNumberOfTokensMinted()
          .call();
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
        let totalTokensOwnedByAccount = await jasTalentsContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          .call();
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
        this.setState({ totalTokensOwnedByAccount });
        this.setState({ loading: false });
      } else {
        this.setState({ contractDetected: false });
      }
    }
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };

  setMetaData = async () => {
    if (this.state.jasTalents.length !== 0) {
      this.state.jasTalents.map(async (jastalent) => {
        const result = await fetch(jastalent.tokenURI);
        const metaData = await result.json();
        this.setState({
          jasTalents: this.state.jasTalents.map((jastalent) =>
            jastalent.tokenId.toNumber() === Number(metaData.tokenId)
              ? {
                ...jastalent,
                metaData,
              }
              : jastalent
          ),
        });
      });
    }
  };

  mintMyNFT = async (colors, name, tokenPrice) => {
    this.setState({ loading: true });
    const colorsArray = Object.values(colors);
    let colorsUsed = [];
    for (let i = 0; i < colorsArray.length; i++) {
      if (colorsArray[i] !== "") {
        let colorIsUsed = await this.state.jasTalentsContract.methods
          .colorExists(colorsArray[i])
          .call();
        if (colorIsUsed) {
          colorsUsed = [...colorsUsed, colorsArray[i]];
        } else {
          continue;
        }
      }
    }
    const nameIsUsed = await this.state.jasTalentsContract.methods
      .tokenNameExists(name)
      .call();
    if (colorsUsed.length === 0 && !nameIsUsed) {
      const {
        cardBorderColor,
        circleColor,
        figureOneColor,
        figureTwoColor,
        figureThreeColor
      } = colors;
      let previousTokenId;
      previousTokenId = await this.state.jasTalentsContract.methods
        .jasTalentsCounter()
        .call();
      previousTokenId = previousTokenId.toNumber();
      const tokenId = previousTokenId + 1;
      const tokenObject = {
        tokenName: "Jas Talent",
        tokenSymbol: "JST",
        tokenId: `${tokenId}`,
        name: name,
        metaData: {
          type: "color",
          colors: {
            cardBorderColor,
            circleColor,
            figureOneColor,
            figureTwoColor,
            figureThreeColor
          },
        },
      };
      const cid = await ipfs.add(JSON.stringify(tokenObject));
      let tokenURI = `https://ipfs.infura.io/ipfs/${cid.path}`;
      const price = window.web3.utils.toWei(tokenPrice.toString(), "Ether");
      this.state.jasTalentsContract.methods
        .mintJasTalent(name, tokenURI, price, colorsArray)
        .send({ from: this.state.accountAddress })
        .on("confirmation", () => {
          localStorage.setItem(this.state.accountAddress, new Date().getTime());
          this.setState({ loading: false });
          window.location.reload();
        });
    } else {
      if (nameIsUsed) {
        this.setState({ nameIsUsed: true });
        this.setState({ loading: false });
      } else if (colorsUsed.length !== 0) {
        this.setState({ colorIsUsed: true });
        this.setState({ colorsUsed });
        this.setState({ loading: false });
      }
    }
  };

  toggleForSale = (tokenId) => {
    this.setState({ loading: true });
    this.state.jasTalentsContract.methods
      .toggleForSale(tokenId)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  changeTokenPrice = (tokenId, newPrice) => {
    this.setState({ loading: true });
    const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
    this.state.jasTalentsContract.methods
      .changeTokenPrice(tokenId, newTokenPrice)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  buyJasTalent = (tokenId, price) => {
    this.setState({ loading: true });
    this.state.jasTalentsContract.methods
      .buyToken(tokenId)
      .send({ from: this.state.accountAddress, value: price })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  render() {
    return (
      <div className="container">
        {!this.state.metamaskConnected ? (
          <MetamaskConnection connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ConnectionError />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <HashRouter basename="/">
              <Menu />
              <Route
                path="/"
                exact
                render={() => (
                  <Home
                    accountAddress={this.state.accountAddress}
                    accountBalance={this.state.accountBalance}
                    jasTalentsContract={this.state.jasTalentsContract}
                  />
                )}
              />
              <Route
                path="/create"
                render={() => (
                  <JSTCreate
                    mintMyNFT={this.mintMyNFT}
                    nameIsUsed={this.state.nameIsUsed}
                    colorIsUsed={this.state.colorIsUsed}
                    colorsUsed={this.state.colorsUsed}
                    setMintBtnTimer={this.setMintBtnTimer}
                  />
                )}
              />
              <Route
                path="/explore"
                render={() => (
                  <JSTList
                    accountAddress={this.state.accountAddress}
                    jasTalents={this.state.jasTalents}
                    totalTokensMinted={this.state.totalTokensMinted}
                    changeTokenPrice={this.changeTokenPrice}
                    toggleForSale={this.toggleForSale}
                    buyJasTalent={this.buyJasTalent}
                  />
                )}
              />
              <Route
                path="/jastalents"
                render={() => (
                  <JSTOwnerList
                    accountAddress={this.state.accountAddress}
                    jasTalents={this.state.jasTalents}
                    totalTokensOwnedByAccount={
                      this.state.totalTokensOwnedByAccount
                    }
                  />
                )}
              />
            </HashRouter>
          </>
        )}
      </div>
    );
  }
}

export default App;
