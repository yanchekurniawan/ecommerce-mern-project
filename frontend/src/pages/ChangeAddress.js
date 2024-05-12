import React, { useEffect, useState } from "react";
import "./css/ChangeAddress.css";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const ChangeAddress = () => {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [urbanVillage, setUrbanVillage] = useState([]);

  const getProvinceData = async () => {
    try {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      setProvinces(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRegency = async (id) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`
      );
      setRegencies(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDistrictData = async (id) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`
      );
      setDistricts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const gerUrbanVillageData = async (id) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`
      );
      setUrbanVillage(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProvinceData();
  }, []);

  return (
    <section className="change-address">
      <Container>
        <h3 className="mb-4">Change Address</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Your Address</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Province</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                getRegency(e.target.value);
              }}
            >
              <option>Select Province</option>
              {provinces.map((province) => {
                return <option value={province.id}>{province.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Regency</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => getDistrictData(e.target.value)}
            >
              <option>Select Regency</option>
              {regencies.map((regency) => {
                return <option value={regency.id}>{regency.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>District</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => gerUrbanVillageData(e.target.value)}
            >
              <option>Select District</option>
              {districts.map((district) => {
                return <option value={district.id}>{district.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Village</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => gerUrbanVillageData(e.target.value)}
            >
              <option>Select Village</option>
              {urbanVillage.map((village) => {
                return <option value={village.id}>{village.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pos Code</Form.Label>
            <Form.Control type="number" min={0} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <PhoneInput country={"us"} />
          </Form.Group>
          <div className="save-change-btn">
            <button>Save Changes</button>
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default ChangeAddress;
