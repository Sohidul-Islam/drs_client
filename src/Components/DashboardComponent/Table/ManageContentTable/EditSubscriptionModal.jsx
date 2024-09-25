import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";
import { useUpdateSubscriptionMutation } from "../../../../features/api/admin/adminSubscriptionApi";

const EditSubscriptionModal = ({ editItem, onClose }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([{ name: "" }]);

  useEffect(() => {
    if (editItem) {
      setValue("package", editItem.package);
      setValue("price", editItem.price);
      setValue("duration_in_days", editItem.duration_in_days / 30);
      setValue("description", editItem.description);
      setFeatures(editItem.offers?.map((offer) => ({ name: offer.name })) || [{ name: "" }]);
    }
  }, [editItem, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const durationInDays = parseInt(data.duration_in_days) * 30;
    const subscriptionData = {
      id: editItem.id,
      ...data,
      duration_in_days: durationInDays,
      offers: features,
    };

    try {
      const response = await updateSubscription(subscriptionData).unwrap();
      if (response?.status) {
        toast.success(response?.data?.message);
        onClose();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4">
        <h3 className="text-lg font-semibold mb-4">Edit Subscription</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-x-5">
            {/* Package name  */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Package Name
              </label>
              <input
                type="text"
                {...register("package", { required: true })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            {/* Price  */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Price (BDT)
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            {/* Duration  */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Duration (Months)
              </label>
              <input
                type="number"
                {...register("duration_in_days", { required: true })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
          {/* Description  */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Features  */}
          <label className="block text-sm font-medium mb-1">Features</label>
          <div className="mb-4 grid grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="flex">
                 <input
                  type="text"
                  value={feature.name}
                  onChange={(e) => {
                    const newFeatures = [...features];
                    newFeatures[index] = { name: e.target.value };
                    setFeatures(newFeatures);
                  }}
                  className="w-full px-3 py-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFeatures(features.filter((_, i) => i !== index));
                  }}
                  className="text-white border px-1 bg-red-600"
                >
                  <FaRegTrashCan />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setFeatures([...features, ""])}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Feature
          </button>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;
