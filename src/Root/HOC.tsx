import React, { useEffect, useState } from "react";
import { useFetchUser } from "../globalHooks";
import GlobalHeader from "./GlobalHeader";
import CopyRightFooter from "./CopyRightFooter";

const AppWrapperHOC = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const HOCComponent: React.FC<P> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const userInfo = useFetchUser();

    useEffect(() => {
      setIsLoading(false);
    }, []);

    if (isLoading) {
      return <div className="text-center py-10 font-genz text-2xl">🚀 Loading the drip...</div>;
    }

    return (
      <>
        {/* Darker two-color gradient background */}
        <GlobalHeader />
        <main className="px-4 py-8 min-h-screen flex flex-col bg-gradient-to-br from-[#0F2027] to-[#203A43] text-gray-100">
          <WrappedComponent {...props} userInfo={userInfo} />
        </main>
        <CopyRightFooter />
      </>
    );
  };

  return HOCComponent;
};

export default AppWrapperHOC;
