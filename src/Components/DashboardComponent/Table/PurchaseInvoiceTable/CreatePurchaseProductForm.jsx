import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SearchableDropdown from "../../Common/SearchableDropdown/SearchableDropdown";
import { useGetAllManufactureQuery } from "../../../../features/api/admin/adminManufactureApi";
import { useGetAllSupplierQuery } from "../../../../features/api/admin/adminSupplierApi";
import { useGetAllProductQuery } from "../../../../features/api/admin/adminProductApi";
import { useSelector } from "react-redux";
import { useAddPurchaseProductMutation } from "../../../../features/api/seller/purchaseProductApi";
import { toast } from "react-toastify";

const CreatePurchaseProductForm = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const productQuantity = watch("quantity", 0);
  const productTradePrice = watch("tradePrice", 0);
  const productVat = watch("VAT", 0);

  useEffect(() => {
    const quantity = parseFloat(productQuantity) || 0;
    const tradePrice = parseFloat(productTradePrice) || 0;
    const vat = parseFloat(productVat) || 0;
    const total = quantity * tradePrice * (1 + vat / 100);
    setValue("totalTradePrice", total.toFixed(2));
  }, [productQuantity, productTradePrice, productVat, setValue]);

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
    data.manufacturerId = data?.manufacturerId?.value || null;
    data.productId = data?.productId?.value || null;
    data.supplierId = data?.supplierId?.value || null;
    data.status = "inactive";
    data.sellerId = user?.id || null;

    setLoading(true);

    try {
      const { data: res } = await addPurchaseProduct(data);
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
            className={`mt-1 block w-full border border-gray-300 text-gray-700 py-[6px] px-3 rounded-md outline-none`}
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
            className={`mt-1 block w-full border border-gray-300 text-gray-700 py-[6px] px-3 rounded-md outline-none`}
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
            errors={errors.productId}
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
              className={`${
                errors.manufacturedDate ? "border-red-500" : "border-gray-300"
              } mt-1 block w-full border text-gray-700 py-[6px] px-3 rounded-md outline-none`}
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
              className={`${
                errors.expiryDate ? "border-red-500" : "border-gray-300"
              } mt-1 block w-full border text-gray-700 py-[6px] px-3 rounded-md outline-none`}
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
              className={`${
                errors.batchNo ? "border-red-500" : "border-gray-300"
              } mt-1 block w-full border text-gray-700 py-[6px] px-3 rounded-md outline-none`}
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
              className={`${
                errors.quantity ? "border-red-500" : "border-gray-300"
              } mt-1 block w-full border text-gray-700 py-[6px] px-3 rounded-md outline-none`}
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
              className={`${
                errors.unit ? "border-red-500" : "border-gray-300"
              } mt-1 block w-full border text-gray-700 py-[6px] px-3 rounded-md outline-none`}
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
              className={`${
                errors.tradePrice ? "border-red-500" : "border-gray-300"
              } mt-1 block w-full border text-gray-700 py-[6px] px-3 rounded-md outline-none`}
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
              className={`${
                errors.VAT ? "border-red-500" : "border-gray-300"
              } mt-1 block w-full border text-gray-700 py-[6px] px-3 rounded-md outline-none`}
            />
          </div>
          {/* Total Trade Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Trade Price <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="text"
              readOnly
              {...register("totalTradePrice", { required: true })}
              className={`${
                errors.totalTradePrice ? "border-red-500" : "border-gray-300"
              } mt-1 block w-full border text-gray-700 py-[6px] px-3 rounded-md outline-none`}
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
              className={`${
                errors.MRP ? "border-red-500" : "border-gray-300"
              } mt-1 block w-full border text-gray-700 py-[6px] px-3 rounded-md outline-none`}
            />
          </div>
        </div>

        {/* Button  */}
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

export default CreatePurchaseProductForm;
