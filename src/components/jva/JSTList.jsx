import React, { useState, useEffect } from "react";
import JSTImage from "./JSTImage";
import JSTDetail from "./JSTDetail";
import Loading from "./Loading";

const JSTList = ({
  jasTalents,
  accountAddress,
  totalTokensMinted,
  changeTokenPrice,
  toggleForSale,
  buyJasTalent,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jasTalents.length !== 0) {
      if (jasTalents[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }
  }, [jasTalents]);

  return (
    <div className="jumbotron">
      <h1 className="title mb-4">Explore ({totalTokensMinted})</h1>
      <div className="col-12">
      {jasTalents.map((jastalent) => {
        return (
          <div
            key={jastalent.tokenId.toNumber()}
            className="row w-100 mt-5"
          >
            {!loading ? (
              <div className="imgdiv">
                <JSTImage
                  colors={
                    jastalent.metaData !== undefined
                      ? jastalent.metaData.metaData.colors
                      : ""
                  }
                />
              </div>
            ) : (
              <Loading />
            )}
            <div className="w-50"><JSTDetail
              jastalent={jastalent}
              accountAddress={accountAddress}
              changeTokenPrice={changeTokenPrice}
              toggleForSale={toggleForSale}
              buyJasTalent={buyJasTalent}
            /></div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default JSTList;
