import "./App.css";
import data from "./data/th_addr.json";
import { useEffect, useState } from "react";

function App() {
  const [dataAdd, setDataAdd] = useState([]);
  const [subDistrict, setSubDistrict] = useState("");
  const [district, setDistrict] = useState("");
  const [provide, setProvide] = useState("");
  const [postCode, setPostCode] = useState("");
  const [item, setItem] = useState([]);

  useEffect(() => {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push(data[i][0].split(","));
    }
    setDataAdd(newData);
  }, []);

  useEffect(() => {
    if (subDistrict) {
      const filSubDistrict = dataAdd.filter(item => item[0].includes(subDistrict));
      setItem(filSubDistrict);
    } else {
      setItem([]);
    }
  }, [subDistrict]);

  const handleChange = e => {
    e.preventDefault();
    if (e.target.name === "sub-district") {
      setSubDistrict(e.target.value);
    } else if (e.target.name === "district") {
      setDistrict(e.target.value);
    } else if (e.target.name === "provide") {
      setProvide(e.target.value);
    } else if (e.target.name === "post-code") {
      setPostCode(e.target.value);
    }
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    const t = item.filter((item, index) => index === id);
    setSubDistrict(t[0][0]);
    setDistrict(t[0][1]);
    setProvide(t[0][2]);
    setPostCode(t[0][3]);
    setItem([]);
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
            value={subDistrict}
          />
          <div className="container-drop-down">
            {item[0] &&
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
            value={district}
          />
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
            value={provide}
          />
        </div>
        <div className="input">
          <label htmlFor="post-code">รหัสไปรษณีย์</label>
          <input
            className="input-tag"
            name="post-code"
            id="post-code"
            type="text"
            onChange={handleChange}
            value={postCode}
          />
        </div>
      </div>
    </>
  );
}

export default App;
