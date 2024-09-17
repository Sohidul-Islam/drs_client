import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateSupplierMutation } from "../../../../features/api/admin/adminSupplierApi";
import { useSelector } from "react-redux";

const UpdateSupplierModal = ({ isOpen, onClose, supplier }) => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: supplier?.supplier_name || "",
      contactPersonName: supplier?.contactPerson || "",
      phone: supplier?.phone || "",
    },
  });

  const [updateSupplier] = useUpdateSupplierMutation();

  const onSubmit = async (data) => {
    try {
      const updatedSupplierData = {
        id: supplier.id,
        name: data.name,
        sellerId: user?.id,
        contactPerson: data.contactPersonName,
        phone: data.phone,
      };
      const res = await updateSupplier(updatedSupplierData).unwrap();
      if (res.status) {
        toast.success("Supplier updated successfully");
        onClose(); // Close the modal on success
      } else {
        toast.error("Failed to update supplier");
      }
    } catch (error) {
      toast.error("Error updating supplier");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Update Supplier</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Supplier Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Supplier Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="border w-full px-2 py-1 rounded-md"
            />
          </div>

          {/* Contact Person */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Contact Person</label>
            <input
              type="text"
              {...register("contactPersonName", { required: true })}
              className="border w-full px-2 py-1 rounded-md"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              {...register("phone", { required: true })}
              className="border w-full px-2 py-1 rounded-md"
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-3 py-1 rounded-md"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSupplierModal;
