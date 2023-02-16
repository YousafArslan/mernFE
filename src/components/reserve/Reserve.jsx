import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { baseUrl } from "../../config";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`${baseUrl}/api/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAvailableDates.some((date) => {
      alldates.includes(new Date(date).getTime());
    });
    return !isFound;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          debugger;
          axios.put(`${baseUrl}/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your Rooms</span>
        {data.map((item) => {
          return (
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">
                  Price: <b>{item.price}</b>
                </div>
              </div>
              <div className="room">
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => {
                    return (
                      <div>
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={handleSelect}
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <button className="rButton" onClick={handleClick}>
          Reserve Now !!!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
