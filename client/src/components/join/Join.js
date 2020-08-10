import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

import "./Join.css";

function Join() {
  const [roomData, setRoomData] = useState({ name: "", room: "" });
  const history = useHistory();

  const onClick = (e) => {
    e.preventDefault();
    let valid = true;
    if (roomData.name.length <= 2 || roomData.room.length === 0) {
      valid = false;
    }
    if (valid) {
      history.push("/chat", roomData);
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            value={roomData.name}
            onChange={(e) => setRoomData({ ...roomData, name: e.target.value })}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            value={roomData.room}
            onChange={(e) => setRoomData({ ...roomData, room: e.target.value })}
          />
        </div>
        <button className="button mt-20" type="submit" onClick={onClick}>
          Join room
        </button>
      </div>
    </div>
  );
}

export default withRouter(Join);
