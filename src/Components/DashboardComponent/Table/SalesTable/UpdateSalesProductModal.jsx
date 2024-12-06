import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SearchableDropdown from "../../Common/SearchableDropdown/SearchableDropdown";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillProduct } from "react-icons/ai";
import { FaFileMedical } from "react-icons/fa6";
import { useGetAllCustomerQuery } from "../../../../features/api/admin/adminCustomerApi";
import { useGetAllProductQuery } from "../../../../features/api/admin/adminProductApi";
import { useUpdateSaleProductMutation } from "../../../../features/api/seller/saleProductApi";

const UpdateSalesProductModal = ({ isOpen, onClose, productData }) => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, control, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const { data: customers } = useGetAllCustomerQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const { data: products } = useGetAllProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  console.log("Product data:35 ", productData);

  const [updateSaleProduct] = useUpdateSaleProductMutation();

  useEffect(() => {
    if (productData) {
      // Set primitive fields
      Object.keys(productData).forEach((key) => {
        if (typeof productData[key] !== "object") {
          setValue(key, productData[key]);
        }
      });

      // Handle customer, product and manufacturer separately
      if (productData.customer) {
        setValue("customerId", {
          value: productData.customer.id,
          label: productData.customer.name,
        });
      }

      if (productData.product) {
        setValue("productId", {
          value: productData.product.id,
          label: productData.product.productName,
        });
      }
    }
  }, [productData, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    data.customerId = data.customerId.value || productData.customerId;
    data.productId = data.productId.value || productData.productId;
    data.sellerId = user?.id || productData.sellerId;

    try {
      const { data: res } = await updateSaleProduct(data);
      if (res?.status) {
        toast.success(res?.message);
        onClose();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div
        className={`${
          isOpen ? "animate-slide-in" : "animate-slide-out"
        } relative top-14 mx-auto p-5 border w-[80%] h-[70%] shadow-lg rounded-md bg-white`}
      >
        <div className="flex items-center gap-x-[10px] mb-5">
          <AiFillProduct className="text-lg" />
          <p>Update Sale Product</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-x-4 items-center gap-y-5 bg-white px-5 py-3">
            {/* Customer */}
            <SearchableDropdown
              labelText="Customer"
              name="customerId"
              control={control}
              data={customers}
              placeholder="customer"
              required="false"
              propertyValue="id"
              propertyName="name"
              setSearchInputValue={setSearchInputValue}
            />
            {/* Doctor Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Doctor Name
              </label>
              <input
                type="text"
                {...register("doctorName", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
            {/*BMDC Registration No. */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                BMDC Registration No.
              </label>
              <input
                type="text"
                {...register("BMDCRegistrationNo", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="grid grid-cols-4 gap-x-4 items-center gap-y-5 bg-white px-5 py-3 mt-4">
            {/*Product */}
            <SearchableDropdown
              labelText="Product"
              name="productId"
              control={control}
              data={products}
              placeholder="search a product..."
              required="true"
              propertyValue="id"
              propertyName="productName"
              setSearchInputValue={setSearchInputValue}
            />
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                {...register("quantity", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Discount (%) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Discount (%)
              </label>
              <input
                type="number"
                {...register("discount", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "text-gray-400 border-gray-400 cursor-not-allowed"
                  : "text-[#139238] border-[#139238]"
              } border rounded-md px-3 py-1 flex items-center font-medium`}
            >
              <span className="mr-2">
                <FaFileMedical />
              </span>
              Update Product
              {loading && (
                <span className="ml-2 w-4 h-4 border-2 border-gray-400 border-b-transparent rounded-full inline-block animate-spin"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSalesProductModal;
