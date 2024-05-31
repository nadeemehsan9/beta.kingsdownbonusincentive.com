import { useState } from "react";
import InputMask from "react-input-mask";
function PhoneInput(props) {
  return (
    <InputMask
      mask="999-99 9999"
      value={props.value}
      onChange={props.onChange}
    ></InputMask>
  );
}
function App() {
  const handleInput = ({ target: { value } }) => setPhone(value);
  const [phone, setPhone] = useState("");
  return (
    <div>
      <PhoneInput value={phone} onChange={handleInput}></PhoneInput>
      <div style={{ paddingTop: "12px" }}>Phone: {phone}</div>
    </div>
  );
}
export default PhoneInput;
