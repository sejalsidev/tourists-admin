import React, { useState, useEffect } from "react";
import { bookings } from "../servicer/Booking";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Booking = () => {
  const [book, setBook] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (booking) => {
    setSelectedBooking(booking);
    setShow(true);
  };

  const handleDelete = async (id) => {
    alert(id);
    try {
      const response = await axios.delete(
        `http://localhost:2000/api/booking/deleteBookDetail/${id}`
      );
      console.log("record deleted", id);
      console.log(response);
    } catch (error) {
      console.log("data record not deleted", error);
    }
  };
  const fetchData = async () => {
    try {
      const data = await bookings();
      setBook(data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>FullName</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Email</th>
            <th>BoardingPoint</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {book?.map((person, _id) => (
            <tr key={_id}>
              <td>{person._id}</td>
              <td>{person.fullname}</td>
              <td>{person.mobile}</td>
              <td>{person.gender}</td>
              <td>{person.age}</td>
              <td>{person.email}</td>
              <td>{person.bordingPoint}</td>
              <td style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={() => handleDelete(person._id)}
                >
                  Delete
                </Button>
                <Button variant="primary" onClick={() => handleShow(person)}>
                  Show
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBooking && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Booking Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>FullName:</strong> {selectedBooking.fullname}
            </p>
            <p>
              <strong>Mobile:</strong> {selectedBooking.mobile}
            </p>
            <p>
              <strong>Gender:</strong> {selectedBooking.gender}
            </p>
            <p>
              <strong>Age:</strong> {selectedBooking.age}
            </p>
            <p>
              <strong>Email:</strong> {selectedBooking.email}
            </p>
            <p>
              <strong>Boarding Point:</strong> {selectedBooking.bordingPoint}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Booking;
