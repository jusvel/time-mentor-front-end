import { useEffect, useState } from "react";

function Results() {
  const [mainHeight, setMainHeight] = useState("100vh");
  useEffect(() => {
    const navHeight = document.querySelector(".navbar").offsetHeight;
    setMainHeight(`calc(100vh - ${navHeight}px)`);
  }, []);

  return <div style={{ height: mainHeight }}>Results</div>;
}

export default Results;
