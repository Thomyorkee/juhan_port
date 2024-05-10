import React, { useCallback, useEffect } from "react";
import _ from "lodash";

import { _dispatch } from "View/Common/reducer";
import { setLayoutSize } from "View/Common/reducer/layout";

function Side() {
  const handleResize = useCallback(() => {
    _dispatch(
      setLayoutSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <React.Fragment></React.Fragment>;
}

export default Side;