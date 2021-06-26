import React, { useState } from "react";
import Image from 'react-bootstrap/Image';

const Home = ({ accountAddress, accountBalance, jasTalentsContract }) => {
  const [tokenIdForOwner, setTokenIdForOwner] = useState("");
  const [tokenOwner, setTokenOwner] = useState("");
  const [tokenIdForOwnerNotFound, setTokenIdForOwnerNotFound] = useState(false);

  const [tokenIdForMetadata, setTokenIdForMetadata] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState("");
  const [tokenMetadataLink, setTokenMetadataLink] = useState("");
  const [tokenIdForMetadataNotFound, setTokenIdForMetadataNotFound] = useState(
    false
  );

  const getTokenOwner = async (e) => {
    e.preventDefault();
    try {
      const owner = await jasTalentsContract.methods
        .getTokenOwner(tokenIdForOwner)
        .call();
      setTokenOwner(owner);
      setTimeout(() => {
        setTokenOwner("");
        setTokenIdForOwner("");
      }, 5000);
    } catch (e) {
      setTokenIdForOwnerNotFound(true);
      setTokenIdForOwner("");
    }
  };

  const getTokenMetadata = async (e) => {
    e.preventDefault();
    try {
      const metadata = await jasTalentsContract.methods
        .getTokenMetaData(tokenIdForMetadata)
        .call();
      setTokenMetadata(
        metadata.substr(0, 60) + "..." + metadata.slice(metadata.length - 5)
      );
      setTokenMetadataLink(metadata);
      setTimeout(() => {
        setTokenMetadata("");
        setTokenIdForMetadata("");
      }, 5000);
    } catch (e) {
      setTokenIdForMetadataNotFound(true);
      setTokenIdForMetadata("");
    }
  };

  return (
    <div className="">
      <div className="jumbotron">
        <Image src="main1.png" fluid rounded className="mb-4" />
        <div className="d-flex mt-2">
          <div className="w-50">
            <h5 class="mb-3">Account</h5>
            <p>Your address: {accountAddress}</p>
            <p>Your balance: {accountBalance} ETH</p>
          </div>
          <div className="w-50">
            <div>
              <div className="">
                <div className="col">
                  <div className="col w-100">
                    <h5 class="mb-3">Token Owner</h5>
                    <form onSubmit={getTokenOwner}>
                      <div className="form-group d-flex justify-content-between">
                        <input
                          required
                          type="text"
                          className="form-control mr-3"
                          value={tokenIdForOwner}
                          placeholder="Token"
                          onChange={(e) => setTokenIdForOwner(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" type="submit">
                          Get
                        </button>
                      </div>

                      {tokenIdForOwnerNotFound ? (
                        <div className="alert alert-danger alert-dissmissible mt-2">
                          <button type="button" className="close" data-dismiss="alert">
                            <span>&times;</span>
                          </button>
                          <strong>Non-Existent Token Id</strong>
                        </div>
                      ) : null}
                    </form>
                    <p className="mt-2">{tokenOwner}</p>
                  </div>
                  <div className="col w-100">
                    <h5 class="mb-3">Token Metadata</h5>
                    <form onSubmit={getTokenMetadata}>
                      <div className="form-group d-flex justify-content-between">
                        <input
                          required
                          type="text"
                          className="form-control mr-3"
                          value={tokenIdForMetadata}
                          placeholder="Token"
                          onChange={(e) => setTokenIdForMetadata(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" type="submit">
                          Get
                        </button>
                      </div>
                      {tokenIdForMetadataNotFound ? (
                        <div className="alert alert-danger alert-dissmissible mt-2">
                          <button type="button" className="close" data-dismiss="alert">
                            <span>&times;</span>
                          </button>
                          <strong>Non-Existent Token Id</strong>
                        </div>
                      ) : null}
                    </form>
                    <p className="mt-2">
                      <a
                        href={`${tokenMetadataLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {tokenMetadata}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
