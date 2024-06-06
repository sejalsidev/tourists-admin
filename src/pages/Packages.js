import axios from "axios";
import React, { useState, useEffect } from "react";
import { packageDetail } from "../servicer/package";
import Button from "react-bootstrap/Button";
import AddPackage from "../components/AddPackage";
import { toast } from "react-toastify";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [updatedata, setupdatedata] = useState();
  const [uId, setUid] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (packageId, packageItem) => {
    console.log(packageId);
    setupdatedata(packageItem);
    setEditingPackage(true);
    setUid(packageId);
    console.log("dataup", packageItem);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      alert(id);
      const response = await axios.delete(
        `http://localhost:2000/api/package/deletePackage/${id}`
      );

      console.log("Record Deleted:", id);
      console.log(response);

      toast.success("Delete Record Successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Error deleting record");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await packageDetail();
        console.log("Received data:", data);
        setPackages(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ display: "flex", margin: "20px" }}
      >
        <i className="bi bi-plus-circle-dotted"></i>
        Add Record
      </Button>

      <AddPackage
        show={show}
        handleClose={handleClose}
        editingPackage={editingPackage}
        handleEdit={handleEdit}
        updatedata={updatedata}
        id={uId}
        /*   refreshTable={fetchData} */
      />

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="table-info">
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Destination</th>
              <th scope="col">Duration</th>
              <th scope="col">Description</th>
              <th scope="col">Day</th>
              <th scope="col">Max People</th>
              <th scope="col">Long Description</th>
              <th scope="col">Min Age</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.data?.map((packageItem) => (
              <tr key={packageItem._id}>
                <td>
                  <img
                    src={packageItem.imageUrl}
                    alt="Package"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{packageItem.name}</td>
                <td>{packageItem.destination}</td>
                <td>{packageItem.duration}</td>
                <td
                  className="ellipsis"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100px",
                    display: "inline-block",
                    border: "0.1rem solid #000000",
                  }}
                >
                  {packageItem.description}
                </td>
                <td>{packageItem.day}</td>
                <td>{packageItem.maxPeople}</td>
                <td
                  className="ellipsis"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    width: "200px",
                    border: "1px solid #000000",
                  }}
                >
                  {packageItem.longDescription}
                </td>
                <td>{packageItem.minAge}</td>
                <td>{packageItem.price}</td>
                <td>{packageItem.date}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(packageItem._id, packageItem)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(packageItem._id)}
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
