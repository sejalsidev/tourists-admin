import axios from "axios";
import React, { useState, useEffect } from "react";
import { sliderDetail } from "../servicer/slider";
import Button from "react-bootstrap/Button";
import AddSlider from "../components/AddSlider";
import { toast } from "react-toastify";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/api/slider/deleteDetail/${id}`
      );

      console.log("Record Deleted:", id);
      console.log(response);

      toast.success("Delete Record Successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Error deleting record");
    }
  };

  const fetchData = async () => {
    try {
      const data = await sliderDetail();
      console.log("Received data:", data);
      setSliders(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
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
      <AddSlider show={show} handleClose={handleClose} />
      <div className="table-responsive container">
        <table className="table">
          <thead>
            <tr className="table-info">
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Heading</th>
              <th scope="col">Blog</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sliders.data?.map((sliderItem) => (
              <tr key={sliderItem._id}>
                <td>
                  <img
                    src={sliderItem.imageUrl}
                    alt="Slider"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{sliderItem.title}</td>
                <td>{sliderItem.heading}</td>
                <td>{sliderItem.blog}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(sliderItem._id)}
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

export default Slider;
