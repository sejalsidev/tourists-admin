import React, { useState, useEffect } from "react";
import { packageDetail } from "../servicer/package";
import Button from "react-bootstrap/Button";
import AddPackage from "../components/AddPackage";
const Packages = () => {
  const [packages, setPackage] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await packageDetail();
        console.log("Received data:", data);
        setPackage(data);
        // setPackage(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/* <h1>Packges</h1> */}
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ display: "flex", margin: "20px" }}
      >
        <i class="bi bi-plus-circle-dotted"></i>
        Add Record
      </Button>
      <AddPackage show={show} handleClose={handleClose} />
      <div class="table-responsive container">
        <table class="table">
          <thead>
            <tr class="table-info">
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Destination</th>
              <th scope="col">Duration</th>
              <th scope="col">Description</th>
              <th scope="col">Long Description</th>
              <th scope="col">Day</th>
              <th scope="col">Max People</th>
              <th scope="col">Min Age</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.data?.map((packageItem, index) => (
              <tr key={packageItem._id}>
                <td>
                  <img
                    src={packageItem.imageUrl}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{packageItem.name}</td>
                <td>{packageItem.destination}</td>
                <td>{packageItem.duration}</td>
                <td>{packageItem.description}</td>
                <td>{packageItem.longDescription}</td>
                <td>{packageItem.day}</td>
                <td>{packageItem.maxPeople}</td>
                <td>{packageItem.minAge}</td>
                <td>{packageItem.price}</td>
                <td>{packageItem.date}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => handleEdit(packageItem._id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={() => handleDelete}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Packages;
