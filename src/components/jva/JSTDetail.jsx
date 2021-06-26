import React, { Component } from "react";

class JSTDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newJasTalentPrice: "",
    };
  }

  callChangeTokenPriceFromApp = (tokenId, newPrice) => {
    this.props.changeTokenPrice(tokenId, newPrice);
  };

  render() {
    return (
      <div key={this.props.jastalent.tokenId.toNumber()} className="">
        <p>
          <span className="font-weight-bold">Token Id</span> :{" "}
          {this.props.jastalent.tokenId.toNumber()}
        </p>
        <p>
          <span className="font-weight-bold">Name</span> :{" "}
          {this.props.jastalent.tokenName}
        </p>
        <p>
          <span className="font-weight-bold">Minted By</span> :{" "}
          {this.props.jastalent.mintedBy.substr(0, 5) +
            "..." +
            this.props.jastalent.mintedBy.slice(
              this.props.jastalent.mintedBy.length - 5
            )}
        </p>
        <p>
          <span className="font-weight-bold">Owned By</span> :{" "}
          {this.props.jastalent.currentOwner.substr(0, 5) +
            "..." +
            this.props.jastalent.currentOwner.slice(
              this.props.jastalent.currentOwner.length - 5
            )}
        </p>
        <p>
          <span className="font-weight-bold">Previous Owner</span> :{" "}
          {this.props.jastalent.previousOwner.substr(0, 5) +
            "..." +
            this.props.jastalent.previousOwner.slice(
              this.props.jastalent.previousOwner.length - 5
            )}
        </p>
        <p>
          <span className="font-weight-bold">Price</span> :{" "}
          {window.web3.utils.fromWei(
            this.props.jastalent.price.toString(),
            "Ether"
          )}{" "}
          Ξ
        </p>
        <p>
          <span className="font-weight-bold">No. of Transfers</span> :{" "}
          {this.props.jastalent.numberOfTransfers.toNumber()}
        </p>
        <div>
          {this.props.accountAddress === this.props.jastalent.currentOwner ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.callChangeTokenPriceFromApp(
                  this.props.jastalent.tokenId.toNumber(),
                  this.state.newJasTalentPrice
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="newJasTalentPrice">
                  <span className="font-weight-bold">Change Token Price</span> :
                </label>{" "}
                <input
                  required
                  type="number"
                  name="newJasTalentPrice"
                  id="newJasTalentPrice"
                  value={this.state.newJasTalentPrice}
                  className="form-control w-50"
                  placeholder="Enter new price"
                  onChange={(e) =>
                    this.setState({
                      newJasTalentPrice: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn btn-outline-info mt-0 w-50"
              >
                change price
              </button>
            </form>
          ) : null}
        </div>
        <div>
          {this.props.accountAddress === this.props.jastalent.currentOwner ? (
            this.props.jastalent.forSale ? (
              <button
                className="btn btn-outline-danger mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  this.props.toggleForSale(
                    this.props.jastalent.tokenId.toNumber()
                  )
                }
              >
                Remove from sale
              </button>
            ) : (
              <button
                className="btn btn-outline-success mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  this.props.toggleForSale(
                    this.props.jastalent.tokenId.toNumber()
                  )
                }
              >
                Keep for sale
              </button>
            )
          ) : null}
        </div>
        <div>
          {this.props.accountAddress !== this.props.jastalent.currentOwner ? (
            this.props.jastalent.forSale ? (
              <button
                className="btn btn-outline-primary mt-3 w-50"
                value={this.props.jastalent.price}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={(e) =>
                  this.props.buyJasTalent(
                    this.props.jastalent.tokenId.toNumber(),
                    e.target.value
                  )
                }
              >
                Buy For{" "}
                {window.web3.utils.fromWei(
                  this.props.jastalent.price.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </button>
            ) : (
              <>
                <button
                  disabled
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  className="btn btn-outline-primary mt-3 w-50"
                >
                  Buy For{" "}
                  {window.web3.utils.fromWei(
                    this.props.jastalent.price.toString(),
                    "Ether"
                  )}{" "}
                  Ξ
                </button>
                <p className="mt-2">Currently not for sale!</p>
              </>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

export default JSTDetail;
