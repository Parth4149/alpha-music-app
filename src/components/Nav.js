import React from "react";
import { ReactComponent as LibraryLogo } from "../img/Library.svg";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h2>Alpha</h2>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library <LibraryLogo />
      </button>
    </nav>
  );
};

export default Nav;
