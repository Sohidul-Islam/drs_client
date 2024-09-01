import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllCustomerQuery } from "../../../../features/api/admin/adminCustomerApi";
import SearchableDropdown from "../../Common/SearchableDropdown/SearchableDropdown";
import { useGetAllProductQuery } from "../../../../features/api/admin/adminProductApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddSaleProductMutation } from "../../../../features/api/seller/saleProductApi";

const CreateSalesProductForm = () => {
  const { user } = useSelector((state) => state.auth);
  const { register, control, reset, handleSubmit } = useForm();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: customers, isLoading } = useGetAllCustomerQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const { data: products } = useGetAllProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const [addSaleProduct] = useAddSaleProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    data.customerId = data.customerId.value;
    data.productId = data.productId.value;
    data.status = "inactive";
    data.sellerId = user?.id;

    setLoading(true);
    try {
      const { data: res } = await addSaleProduct(data);
      if (res?.status) {
        reset();
        toast.success(res?.message);
        setLoading(false);
      } else {
        toast.error(res?.message);
        setLoading(false);
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-5 bg-white px-5 py-3">
        {/* Customer */}
        <SearchableDropdown
          labelText="Customer"
          name="customerId"
          control={control}
          data={customers}
          placeholder="search a customer"
          required="false"
          propertyValue="id"
          propertyName="customer_name"
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
      <div className=" bg-white px-5 py-3 mt-4">
        <p className="mb-4">Product Information:</p>
        <div className="grid grid-cols-4 gap-x-4 gap-y-5">
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
          {/* Unit Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit Price <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="number"
              {...register("unitPrice", { required: true })}
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

        {/* Button  */}
        {/* <button className="my-4 px-3 py-2 border text-white bg-[#0085FF]">
          Add Product
        </button> */}
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "text-gray-400 bg-slate-600 cursor-no-drop"
              : "text-white bg-[#0085FF]"
          } my-4 px-3 py-2 border`}
        >
          {" "}
          Add Product
          {loading && (
            <span className="ml-2 w-4 h-4 border-2 items-center justify-center border-gray-400 border-b-transparent rounded-full inline-block animate-spin"></span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateSalesProductForm;
