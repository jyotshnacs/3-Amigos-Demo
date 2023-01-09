const SearchBar = ({ keyword, handleChange }) => {
  const BarStyle = {
    display: "flex",
    justifyContent: "center",
    background: "#F0F0F0",
    borderRadius: "5px",
    padding: "0.5rem",
    width: "50%",
    border: "1px solid #00b4cc",
    height: "40px",
  };
  return (
    <div
      style={{
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <input
        style={BarStyle}
        key="search-bar"
        value={keyword}
        autoComplete="off"
        placeholder={"Search Interesting Places..."}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default SearchBar;
