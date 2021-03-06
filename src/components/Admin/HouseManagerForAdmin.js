import React, { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import House from "../HostManage/House";
import { NotificationManager } from "react-notifications";
import TextHolder from "../PlaceHolder/TextHolder";
import ImageCard from "../PlaceHolder/ImageCard";
import HouseService from "../../services/HouseService";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";

function HostManager() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paramsString, setParams] = useState({
    size: 20,
    page: 0,
    status: "",
  });

  useEffect(() => {
    setHouses([]);
    setLoading(true);
    if (paramsString.status === "blocked") {
      setParams({
        size: 20,
        page: 0,
        blocked: "true",
      });
    }
    new HouseService()
      .getHouseForHost(paramsString)
      .then((response) => {
        if (response.status < 300) {
          NotificationManager.success(response.message);
          setHouses(response.data.listObject);
          setLoading(false);
        } else {
          NotificationManager.error(response.message);
        }
      })
      .catch((error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
        setLoading(false);
      });
  }, [paramsString]);

  const blockHouse = (houseId,index) => {
    new HouseService().blockHouse(houseId).then(
      (responese) => {
        if (responese) {
          NotificationManager.success(responese.message);
          const newHouses = [...houses];
          newHouses[index].block = !newHouses[index].block;
          setHouses(newHouses);
        }
      },
      (error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      }
    );
  };
  
  return (
    <div>
      <Form.Control
        as="select"
        className="filter-status"
        onChange={(e) => {
          setParams({ ...paramsString, status: e.target.value });
        }}
      >
        <option value="">All</option>
        <option value="listed">Listed</option>
        <option value="unlisted">UnListed</option>
        <option value="blocked">Blocked</option>
        <option value="deactived">Deactived</option>
      </Form.Control>
      <Table id="table-house">
        <thead>
          <tr>
            <th className="text-center text500">ID</th>

            <th className="text500">Name</th>
            <th></th>
            <th className="Address text500">Addresss</th>
            <th className="text500">City</th>
            <th className="text500">Status</th>
            <th className="text500">Last Edit</th>
            <th className="text-center text500">Block </th>
          </tr>
        </thead>
        {loading ? (
          <tbody className="holder">
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <ImageCard></ImageCard>
            </th>
            <th className="Name-content">
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th>
              <TextHolder></TextHolder>
            </th>
            <th className="text-center">
              <ImageCard></ImageCard>
            </th>
          </tbody>
        ) : (
          <div></div>
        )}
        {houses.map((houses, index) => {
          return (
            <tbody key={index}>
              <House
                houses={houses}
                index={index}
                blockHouse={blockHouse}
              ></House>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default HostManager;
