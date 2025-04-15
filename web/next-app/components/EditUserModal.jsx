import React from 'react';
import { Button } from "@/components/ui/button";

const EditUserModal = ({ setShowEditModal }) => {

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-96 text-left">
      <h2 className="text-md font-semibold mb-1">Edit Role</h2>
      <div className="flex justify-between items-center my-4">
        <label htmlFor="organization" className="py-3 text-black font-medium">Role</label>
        <select
          name="roles"
          id="roles"
          className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black w-full ml-10"
          defaultValue={"placeholder"}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="placeholder" disabled>
            Client
          </option>
          <option value="WarehouseMan">WarehouseMan</option>
          <option value="Supervisor">Supervisor</option>
          <option value="PlantOfficer">PlantOfficer</option>
          <option value="Guard">Guard</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="space-x-2 flex justify-end">
        <Button
          onClick={() => setShowEditModal(false)}
          className="bg-white border border-borderLine px-4 py-2 rounded-md hover:bg-gray-200 active:bg-gray-300 text-black"
        >
          Cancel
        </Button>
        <Button
          // onClick={confirmEdit}
          className="bg-brand-secondary text-white px-4 py-2 rounded-md hover:bg-orange-600 active:bg-orange-700"
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default EditUserModal