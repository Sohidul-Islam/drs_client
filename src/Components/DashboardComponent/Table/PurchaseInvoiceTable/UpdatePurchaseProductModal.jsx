import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SearchableDropdown from "../../Common/SearchableDropdown/SearchableDropdown";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetAllManufactureQuery } from "../../../../features/api/admin/adminManufactureApi";
import { useGetAllSupplierQuery } from "../../../../features/api/admin/adminSupplierApi";
import { useGetAllProductQuery } from "../../../../features/api/admin/adminProductApi";
import { AiFillProduct } from "react-icons/ai";
import { useUpdatePurchaseProductMutation } from "../../../../features/api/seller/purchaseProductApi";
import { FaFileMedical } from "react-icons/fa6";

const UpdatePurchaseProductModal = ({
  isOpen,
  onClose,
  productData,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, control, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  // Watch for specific fields and automatically calculate total trade price
  const productQuantity = watch("quantity", productData?.quantity || 0);
  const productTradePrice = watch("tradePrice", productData?.tradePrice || 0);
  const productVat = watch("VAT", productData?.VAT || 0);

  const { data: manufactures } = useGetAllManufactureQuery({
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

  const [updatePurchaseProduct] = useUpdatePurchaseProductMutation();

  useEffect(() => {
    if (productData) {
      // Set primitive fields
      Object.keys(productData).forEach((key) => {
        if (typeof productData[key] !== "object") {
          setValue(key, productData[key]);
        }
      });

      // Handle supplier, product and manufacturer separately
      if (productData.product) {
        setValue("productId", {
          value: productData.product.id,
          label: productData.product.productName,
        });
      }

      if (productData.supplier) {
        setValue("supplierId", {
          value: productData.supplier.id,
          label: productData.supplier.name,
        });
      }

      if (productData.manufacturer) {
        setValue("manufacturerId", {
          value: productData.manufacturer.id,
          label: productData.manufacturer.name,
        });
      }
    }
  }, [productData, setValue]);

  // Auto calculate total trade price
  useEffect(() => {
    const quantity = parseFloat(productQuantity) || 0;
    const tradePrice = parseFloat(productTradePrice) || 0;
    const vat = parseFloat(productVat) || 0;
    const total = quantity * tradePrice * (1 + vat / 100);
    setValue("totalTradePrice", total.toFixed(2));
  }, [productQuantity, productTradePrice, productVat, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    data.manufacturerId =
    data.manufacturerId.value || productData.manufacturerId;
    data.productId = data.productId.value || productData.productId;
    data.supplierId = data.supplierId.value || productData.supplierId;
    data.sellerId = user?.id || productData.sellerId;
    data.status = "inactive";
    // console.log("Sending data: ", data);
    try {
      const { data: res } = await updatePurchaseProduct(data);
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
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full">
        <div className="flex items-center gap-x-[10px] mb-5">
          <AiFillProduct className="text-lg" />
          <p>Update Purchase Product</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-x-4 items-center gap-y-5 bg-white px-5 py-3">
            {/* Manufacturer */}
            <SearchableDropdown
              labelText="Manufacturer"
              name="manufacturerId"
              control={control}
              data={manufactures}
              placeholder="search a manufacturer"
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
          <div className="grid grid-cols-4 gap-x-4 items-center gap-y-5 bg-white px-5 py-3 mt-4">
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
                readOnly
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

export default UpdatePurchaseProductModal;
