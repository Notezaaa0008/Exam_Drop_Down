import "./App.css";
import data from "./data/th_addr.json";
import { useEffect, useState } from "react";

function App() {
  const [dataAdd, setDataAdd] = useState([]);
  const [subDistrict, setSubDistrict] = useState({ toggle: false, name: "", value: "" });
  const [district, setDistrict] = useState({ toggle: false, name: "", value: "" });
  const [provide, setProvide] = useState({ toggle: false, name: "", value: "" });
  const [postCode, setPostCode] = useState({ toggle: false, name: "", value: "" });
  const [item, setItem] = useState([]);

  useEffect(() => {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push(data[i][0].split(","));
    }
    setDataAdd(newData);
  }, []);

  useEffect(() => {
    if (subDistrict.value && subDistrict.toggle) {
      const filSubDistrict = dataAdd.filter(item => item[0].includes(subDistrict.value));
      setItem(filSubDistrict);
    } else if (district.value && district.toggle) {
      const filDistrict = dataAdd.filter(item => item[1].includes(district.value));
      setItem(filDistrict);
    } else if (provide.value && provide.toggle) {
      const filProvide = dataAdd.filter(item => item[2].includes(provide.value));
      setItem(filProvide);
    } else if (postCode.value && postCode.toggle) {
      const filPostCode = dataAdd.filter(item => item[3].includes(postCode.value));
      setItem(filPostCode);
    } else {
      setItem([]);
    }
  }, [subDistrict, district, provide, postCode]);

  const changeValue = (name, value) => {
    if (name === "sub-district") {
      setSubDistrict({ toggle: true, name, value });
      setPostCode({ ...postCode, toggle: false });
      setDistrict({ ...district, toggle: false });
      setProvide({ ...provide, toggle: false });
    } else if (name === "district") {
      setDistrict({ toggle: true, name, value });
      setSubDistrict({ ...subDistrict, toggle: false });
      setProvide({ ...provide, toggle: false });
      setPostCode({ ...postCode, toggle: false });
    } else if (name === "provide") {
      setProvide({ toggle: true, name, value });
      setSubDistrict({ ...subDistrict, toggle: false });
      setPostCode({ ...postCode, toggle: false });
      setDistrict({ ...district, toggle: false });
    } else if (name === "post-code") {
      setPostCode({ toggle: true, name, value });
      setSubDistrict({ ...subDistrict, toggle: false });
      setDistrict({ ...district, toggle: false });
      setProvide({ ...provide, toggle: false });
    }
  };

  const handleChange = e => {
    e.preventDefault();
    changeValue(e.target.name, e.target.value);
  };

  const handleFocus = e => {
    e.preventDefault();
    changeValue(e.target.name, e.target.value);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    const filSelectData = item.filter((item, index) => index === id);
    setSubDistrict({ ...subDistrict, toggle: false, value: filSelectData[0][0] });
    setDistrict({ ...district, toggle: false, value: filSelectData[0][1] });
    setProvide({ ...provide, toggle: false, value: filSelectData[0][2] });
    setPostCode({ ...postCode, toggle: false, value: filSelectData[0][3] });
  };

  return (
    <>
      <div className="header">
        <h1>แบบทดสอบ</h1>
      </div>
      <div className="container-input">
        <div className="input">
          <label htmlFor="sub-district">ตำบล / แขวง</label>
          <input
            className="input-tag"
            name="sub-district"
            id="sub-district"
            type="text"
            onChange={handleChange}
            onFocus={handleFocus}
            value={subDistrict.value}
          />
          <div className="container-drop-down">
            {subDistrict.toggle &&
              item.map((item, index) => (
                <div key={index} className="drop-down" onClick={e => handleClick(e, index)}>
                  {`${item[0]} , ${item[1]} , ${item[2]} , ${item[3]}`}
                </div>
              ))}
          </div>
        </div>
        <div className="input">
          <label htmlFor="district">อำเภอ / เขต</label>
          <input
            className="input-tag"
            name="district"
            id="district"
            type="text"
            onChange={handleChange}
            onFocus={handleFocus}
            value={district.value}
          />
          <div className="container-drop-down">
            {district.toggle &&
              item.map((item, index) => (
                <div key={index} className="drop-down" onClick={e => handleClick(e, index)}>
                  {`${item[0]} , ${item[1]} , ${item[2]} , ${item[3]}`}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="container-input">
        <div className="input">
          <label htmlFor="provide">จังหวัด</label>
          <input
            className="input-tag"
            name="provide"
            id="provide"
            type="text"
            onChange={handleChange}
            onFocus={handleFocus}
            value={provide.value}
          />
          <div className="container-drop-down">
            {provide.toggle &&
              item.map((item, index) => (
                <div key={index} className="drop-down" onClick={e => handleClick(e, index)}>
                  {`${item[0]} , ${item[1]} , ${item[2]} , ${item[3]}`}
                </div>
              ))}
          </div>
        </div>
        <div className="input">
          <label htmlFor="post-code">รหัสไปรษณีย์</label>
          <input
            className="input-tag"
            name="post-code"
            id="post-code"
            type="text"
            onChange={handleChange}
            onFocus={handleFocus}
            value={postCode.value}
          />
          <div className="container-drop-down">
            {postCode.toggle &&
              item.map((item, index) => (
                <div key={index} className="drop-down" onClick={e => handleClick(e, index)}>
                  {`${item[0]} , ${item[1]} , ${item[2]} , ${item[3]}`}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
