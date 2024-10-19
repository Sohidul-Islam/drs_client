import React, { useEffect, useState } from "react";
import {
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from "bd-geodata";

const ManageStoreFilter = ({ setDivision, setDistrict, setUpazila }) => {
  const [divisionId, setDivisionId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [upazilaId, setUpazilaId] = useState("");

  // Get divisions (constant)
  const divisions = getDivisions();

  // Get districts when a division is selected
  useEffect(() => {
    if (divisionId) {
      const districts = getDistrictsByDivision(divisionId);
      setDistricts(districts);
      setDistrictId("");
      setUpazilas([]);
    }
  }, [divisionId]);

  // Get upazilas when a district is selected
  useEffect(() => {
    if (districtId) {
      const upazilas = getUpazilasByDistrict(districtId);
      setUpazilas(upazilas);
      setUpazilaId("");
    }
  }, [districtId]);

  useEffect(() => {
    const divisionName = divisions.find((div) => div.id === divisionId)?.name;
    const districtName = districts.find((dis) => dis.id === districtId)?.name;
    const upazilaName = upazilas.find((upa) => upa.id === upazilaId)?.name;

    if (setDivision) setDivision(divisionName || "");
    if (setDistrict) setDistrict(districtName || "");
    if (setUpazila) setUpazila(upazilaName || "");
  }, [
    divisionId,
    districtId,
    upazilaId,
    divisions,
    districts,
    upazilas,
    setDivision,
    setDistrict,
    setUpazila,
  ]);

  return (
    <div className="flex items-center gap-x-1">
      {/* Division  */}
      <div>
        <select
          className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
          value={divisionId}
          onChange={(e) => setDivisionId(e.target.value)}
        >
          <option value="">Select Division</option>
          {divisions.map((division, index) => (
            <option key={index} value={division.id}>
              {division.name}
            </option>
          ))}
        </select>
      </div>

      {/* District  */}
      <div>
        <select
          className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
          disabled={!divisionId}
        >
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upazila/Thana  */}
      <div>
        <select
          className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
          value={upazilaId}
          onChange={(e) => setUpazilaId(e.target.value)}
          disabled={!districtId}
        >
          <option value="">Select Upazila</option>
          {upazilas.map((upazila, index) => (
            <option key={index} value={upazila.id}>
              {upazila.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ManageStoreFilter;
