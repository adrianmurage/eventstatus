import React from "react";

function FormInput({ label, handler, value, type, name }) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        required
        type={type}
        className="input input-bordered w-full max-w-xs"
        value={value}
        name={name}
        onChange={handler}
      />
    </div>
  );
}

export default FormInput;
