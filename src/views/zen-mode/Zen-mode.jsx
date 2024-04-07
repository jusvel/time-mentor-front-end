import { useEffect, useState } from "react";

function ZenMode() {
  const [mainHeight, setMainHeight] = useState("100vh");
  useEffect(() => {
    const navHeight = document.querySelector(".navbar").offsetHeight;
    setMainHeight(`calc(100vh - ${navHeight}px)`);
  }, []);

  return <div style={{ height: mainHeight }}>zen</div>;
}

export default ZenMode;
