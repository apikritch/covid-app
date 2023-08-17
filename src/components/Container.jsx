import React from "react";

const Container = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-7">
      {children}
    </div>
  );
};

export default Container;
