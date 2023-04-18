import Header from "../layoutComponents/Header/Header";
function HeaderOnly({ children }) {
  return (
    <div>
      <div>
        <Header />
      </div>
      {children}
    </div>
  );
}

export default HeaderOnly;
