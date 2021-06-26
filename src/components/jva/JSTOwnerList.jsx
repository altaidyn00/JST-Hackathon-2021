import React, { useState, useEffect } from "react";
import JSTImage from "./JSTImage";
import JSTOwnerDetail from "./JSTOwnerDetail";
import Loading from "./Loading";

const JSTOwnerList = ({
  accountAddress,
  jasTalents,
  totalTokensOwnedByAccount,
}) => {
  const [loading, setLoading] = useState(false);
  const [myJasTalents, setMyJasTalents] = useState([]);

  useEffect(() => {
    if (jasTalents.length !== 0) {
      if (jasTalents[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }
    const my_jas_talents = jasTalents.filter(
      (jastalent) => jastalent.currentOwner === accountAddress
    );
    setMyJasTalents(my_jas_talents);
  }, [jasTalents]);

  return (
    <div className="jumbotron">
      <h5 className="title mb-4">
        JasTalents ({totalTokensOwnedByAccount})
      </h5>
      <div className="col-12">
      {myJasTalents.map((jastalent) => {
        return (
          <div key={jastalent.tokenId.toNumber()} className="row w-100 mt-4">
            
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
            <div className="w-50">
              <JSTOwnerDetail
                jastalent={jastalent}
                accountAddress={accountAddress}
              />
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default JSTOwnerList;
