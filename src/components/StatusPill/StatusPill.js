import React, { useEffect, useState } from "react";
import { calculateStatus } from "../../utils";

function StatusPill({ startTime, endTime }) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    const status = calculateStatus(startTime, endTime);
    setStatus(status);
  }, []);
  return (
    <div>
      {status && (
        <div className="text-sm p-1 bg-slate-500 text-slate-200 rounded max-w-fit ">
          {status}
        </div>
      )}
    </div>
  );
}

export default StatusPill;
