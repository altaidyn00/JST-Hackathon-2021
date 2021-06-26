import React from "react";

const JSTOwnerDetail = (props) => {
  const {
    tokenId,
    tokenName,
    price,
    mintedBy,
    previousOwner,
    numberOfTransfers,
  } = props.jastalent;
  return (
    <div key={tokenId.toNumber()}>
      <p>
        <span className="font-weight-bold">Token Id</span> :{" "}
        {tokenId.toNumber()}
      </p>
      <p>
        <span className="font-weight-bold">Name</span> : {tokenName}
      </p>
      <p>
        <span className="font-weight-bold">Price</span> :{" "}
        {window.web3.utils.fromWei(price.toString(), "Ether")} Ξ
      </p>
      <p>
        <span className="font-weight-bold">Number of Transfers</span> :{" "}
        {numberOfTransfers.toNumber()}
      </p>
      {props.accountAddress === mintedBy &&
      props.accountAddress !== previousOwner ? (
        <div className="alert alert-success w-50 text-center info">
          Minted
        </div>
      ) : (
        <div className="alert w-50 text-center info">Purchased</div>
      )}
    </div>
  );
};

export default JSTOwnerDetail;
