import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignin }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: (location) => {
        const { pathname: currPathname } = history.location;
        const { pathname: nextPathname } = location;

        if (currPathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignin,
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
