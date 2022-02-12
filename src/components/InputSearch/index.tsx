import react from "react";

const InputSearch = () => {
  const handleInputChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    const { value } = e.target;

    if (!value) return;

    const url = `http://wttr.in/${value}?format=j1`;
    fetch(url)
      .then((response) => response.json())
      .then(console.log);
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};

export default InputSearch;
