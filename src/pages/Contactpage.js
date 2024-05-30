import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import AddContact from "../components/AddContact";
import { contactDetail } from "../servicer/contact";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [contact, setContact] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = async (id) => {
    try {
      alert(id);
      const response = await axios.delete(
        `http://localhost:2000/api/contact/deleteDetail/${id}`
      );

      console.log("Record Deleted:", id);
      console.log(response);

      toast.success("Delete soft Record Successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Error deleting record");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await contactDetail();
        console.log("Received data:", data);
        setContact(data);
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
      <AddContact show={show} handleClose={handleClose} />
      <div className="table-responsive container">
        <table className="table">
          <thead>
            <tr className="table-info">
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Message</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {contact.data?.map((contactItem) => (
              <tr key={contactItem._id}>
                <td>{contactItem.firstname}</td>
                <td>{contactItem.lastname}</td>
                <td>{contactItem.email}</td>
                <td>{contactItem.phone}</td>
                <td>{contactItem.message}</td>
                <td>
                  <Button
                    type="submit"
                    variant="danger"
                    onClick={() => handleDelete(contactItem._id)}
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

export default ContactPage;
