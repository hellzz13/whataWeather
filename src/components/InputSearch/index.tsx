import react, { useState } from "react";

type WeatherProps =
  // {
  // current_condition:[
  {
    FeelsLikeC: string;

    nearest_area: [
      {
        region: [
          {
            value: string;
          }
        ];
      }
    ];
  };
// ]
// }

const InputSearch = () => {
  const [region, setRegion] = useState<WeatherProps[]>([]);
  const handleInputChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    const { value } = e.target;

    if (!value) return;

    const url = `http://wttr.in/${value}?format=j1`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => setRegion(res.current_condition));
  };

  console.log(region);
  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <ul>{ region?.map((item) => <li>{item.FeelsLikeC}</li>)}</ul>
    </div>
  );
};

export default InputSearch;
