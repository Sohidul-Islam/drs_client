import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SearchableDropdown from "../../Common/SearchableDropdown/SearchableDropdown";
import { useGetAllManufactureQuery } from "../../../../features/api/admin/adminManufactureApi";
import { useGetAllSupplierQuery } from "../../../../features/api/admin/adminSupplierApi";
import { useGetAllProductQuery } from "../../../../features/api/admin/adminProductApi";
import { useSelector } from "react-redux";
import { useAddPurchaseProductMutation } from "../../../../features/api/seller/purchaseProductApi";
import { toast } from "react-toastify";
import { FaFileMedical } from "react-icons/fa6";

const CreatePurchaseProductForm = () => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, control, reset } = useForm();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: manufactures, isLoading } = useGetAllManufactureQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const { data: suppliers } = useGetAllSupplierQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const { data: products } = useGetAllProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const [addPurchaseProduct] = useAddPurchaseProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    data.manufacturerId = data.manufacturerId.value;
    data.productId = data.productId.value;
    data.supplierId = data.supplierId.value;
    data.status = "inactive";
    data.sellerId = user.id;

    // console.log("Purchase Overview: ", data);
    setLoading(true);

    try {
      const { data: res } = await addPurchaseProduct(data);
      console.log("Purchase Overview: ", res);
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
      <div className="grid grid-cols-4 gap-x-4 items-center gap-y-5 bg-white px-5 py-3">
        {/* Manufacturer */}
        <SearchableDropdown
          labelText="Manufacturer"
          name="manufacturerId"
          control={control}
          data={manufactures}
          placeholder="search a manufacture"
          required="false"
          propertyValue="id"
          propertyName="manufacture_name"
          setSearchInputValue={setSearchInputValue}
        />
        {/* Supplier */}
        <SearchableDropdown
          labelText="Supplier"
          name="supplierId"
          control={control}
          data={suppliers}
          placeholder="search a supplier"
          required="false"
          propertyValue="id"
          propertyName="supplier_name"
          setSearchInputValue={setSearchInputValue}
        />
        {/* Invoice Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Invoice Date
          </label>
          <input
            type="date"
            {...register("invoiceDate", { required: true })}
            className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
          />
        </div>

        {/* Invoice Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Invoice Number
          </label>
          <input
            type="text"
            {...register("invoiceNumber", { required: true })}
            className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
          />
        </div>
      </div>
      {/* Product Information */}
      <div className=" bg-white px-5 py-3 mt-4">
        <p className="mb-4">Product Information:</p>
        <div className="grid grid-cols-4 gap-x-4 gap-y-5 items-center">
          {/*Product Name */}
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
          {/* Manufactured Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Manufactured Date <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="date"
              {...register("manufacturedDate", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="date"
              {...register("expiryDate", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* Batch/LOT No */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Batch/LOT No.
            </label>
            <input
              type="text"
              {...register("batchNo", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* Quantity (Pieces) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity (Pieces) <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="text"
              {...register("unit", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* Trade Price*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trade Price <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="number"
              {...register("tradePrice", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* VAT*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              VAT <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="number"
              {...register("VAT", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* Total Trade Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Trade Price <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="text"
              {...register("totalTradePrice", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* MRP (Per unit) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              MRP (Per unit) <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="number"
              {...register("MRP", { required: true })}
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
        > Add Product
          {loading && (
            <span className="ml-2 w-4 h-4 border-2 items-center justify-center border-gray-400 border-b-transparent rounded-full inline-block animate-spin"></span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePurchaseProductForm;
