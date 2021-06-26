import React, { Component } from "react";
import JSTImage from "./JSTImage";

class JSTCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelectedColors: [
        {
          cardBorderColor: "",
          circleColor: "#FFFFFF",
          figureOneColor: "#E84E20",
          figureTwoColor: "#4698A1",
          figureThreeColor: "#4697A0"
        },
      ],
      jasTalentName: "",
      jasTalentPrice: "",
    };
  }

  componentDidMount = async () => {
    await this.props.setMintBtnTimer();
  };

  callMintMyNFTFromApp = (e) => {
    e.preventDefault();
    this.props.mintMyNFT(
      this.state.userSelectedColors[0],
      this.state.jasTalentName,
      this.state.jasTalentPrice
    );
  };

  render() {
    return (
      <div className="jumbotron">
        <h1 className="title mb-4">Creat your own logo</h1>
        <form onSubmit={this.callMintMyNFTFromApp} className="pt-4">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="imgdiv">
              <JSTImage colors={this.state.userSelectedColors[0]} />
            </div>
            <div>
              <div className="form-group d-flex align-items-center">
                <input
                  required
                  type="color"
                  name="cardBorderColor"
                  id="cardBorderColor"
                  value={this.state.userSelectedColors[0].cardBorderColor}
                  className="form-control color-picker p-0 mr-3"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          cardBorderColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
                <label htmlFor="cardBorderColor" className="mb-0">Card Border Color</label>
              </div>
              <div className="form-group d-flex align-items-center">
                <input
                  required
                  type="color"
                  name="circleColor"
                  id="circleColor"
                  value={this.state.userSelectedColors[0].circleColor}
                  className="form-control color-picker p-0 mr-3"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          circleColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
                <label htmlFor="circleColor" className="mb-0">Circle Color</label>
              </div>
              <div className="form-group d-flex align-items-center">
                <input
                  required
                  type="color"
                  name="figureOneColor"
                  id="figureOneColor"
                  value={this.state.userSelectedColors[0].figureOneColor}
                  className="form-control color-picker p-0 mr-3"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          figureOneColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
                <label htmlFor="figureOneColor" className="mb-0">Figure One Color</label>
              </div>
              <div className="form-group d-flex align-items-center">
                <input
                  required
                  type="color"
                  name="figureTwoColor"
                  id="figureTwoColor"
                  value={this.state.userSelectedColors[0].figureTwoColor}
                  className="form-control color-picker p-0 mr-3"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          figureTwoColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
                <label htmlFor="figureTwoColor" className="mb-0">Figure Two Color</label>
              </div>
              <div className="form-group d-flex align-items-center">
                <input
                  required
                  type="color"
                  name="figureThreeColor"
                  id="figureThreeColor"
                  value={this.state.userSelectedColors[0].figureThreeColor}
                  className="form-control color-picker p-0 mr-3"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          figureThreeColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
                <label htmlFor="figureThreeColor" className="mb-0">Figure Trhee Color</label>
              </div>
            </div>
            <div className="col-5">
              <div className="form-group">
                <label htmlFor="jasTalentName">Name</label>
                <input
                  required
                  type="text"
                  value={this.state.jasTalentName}
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) =>
                    this.setState({ jasTalentName: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  required
                  type="number"
                  name="price"
                  id="jasTalentPrice"
                  value={this.state.jasTalentPrice}
                  className="form-control"
                  placeholder="Price ETH"
                  onChange={(e) =>
                    this.setState({ jasTalentPrice: e.target.value })
                  }
                />
              </div>
              <button
                id="mintBtn"
                style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
                type="submit"
                className="btn mt-4 btn-block btn-outline-primary"
              >
                Mint My Jas Talent
              </button>
              <div className="mt-4">
                {this.props.nameIsUsed ? (
                  <div className="alert alert-danger alert-dissmissible">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                    >
                      <span>&times;</span>
                    </button>
                    <strong>This name is taken!</strong>
                  </div>
                ) : this.props.colorIsUsed ? (
                  <>
                    <div className="alert alert-danger alert-dissmissible">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        <span>&times;</span>
                      </button>
                      {this.props.colorsUsed.length > 1 ? (
                        <strong>These colors are taken!</strong>
                      ) : (
                        <strong>This color is taken!</strong>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "1rem",
                        marginBottom: "3rem",
                      }}
                    >
                      {this.props.colorsUsed.map((color, index) => (
                        <div
                          key={index}
                          style={{
                            background: `${color}`,
                            width: "50%",
                            height: "50px",
                          }}
                        ></div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default JSTCreate;
