import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ShopInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      shop_name: "MAA Pharmacy",
      shop_email: "sabariyamuzumder9921@gmail.com",
      shop_phone_number: "+8801994779217",
      image: "https://i.ibb.co/J7RfLqK/shope-photo.png",
    },
  });
  const [imageSrc, setImageSrc] = useState(
    "https://i.ibb.co/J7RfLqK/shope-photo.png"
  );
  const [drugLicense, setDrugLicense] = useState("Choose file");

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageUpload = (e, setImageSrcCallback, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setValue(fieldName, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrcCallback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6">
        {/* Shop image  */}
        <div className="col-span-1 mx-auto">
          <div>
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Uploaded"
                className="mt-4 w-24 h-24 rounded-full"
              />
            )}
          </div>
          {/* image button  */}
          <div className="mt-4 flex items-center">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) => handleImageUpload(e, setImageSrc, "image")}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-[#006E9E] text-white p-[10px] text-xs"
            >
              Upload Image
            </label>
          </div>
        </div>
        <div className="col-span-5 border-l px-11 my-5 space-y-11">
          {/* Shop Information  */}
          <div>
            <p className="border-b pb-2">Shop Information</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* shop name  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shop name
                </label>
                <input
                  type="text"
                  {...register("shop_name", { required: true })}
                  placeholder="Shop name"
                  defaultValue="Larg Pharma"
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/*shop email  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("shop_email", { required: true })}
                  placeholder="Email"
                  defaultValue="largpharma1200@gmail.com"
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/*shop phone number  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="number"
                  {...register("shop_phone_number", { required: true })}
                  placeholder="Phone number"
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* has drag license  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Has Drug license
                </label>
                <select
                  {...register("drag-license", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {/* drag license no  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Drug license No
                </label>
                <input
                  type="text"
                  {...register("license-no", { required: true })}
                  // defaultValue="Larg Pharma"
                  placeholder="License no."
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* Establishment Date  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Establishment Date
                </label>
                <input
                  type="date"
                  {...register("establishment-date", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* Store/Pharmacy Category  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Store/Pharmacy Category
                </label>
                <select
                  {...register("store-category", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="category-1">Category-1</option>
                  <option value="category-2">Category-2</option>
                  <option value="category-3">Category-3</option>
                </select>
              </div>
              {/* Store/Pharmacy Type  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Store/Pharmacy Type
                </label>
                <select
                  {...register("store-type", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="type-1">Type-1</option>
                  <option value="type-2">Type-2</option>
                  <option value="type-3">Type-3</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="border-b pb-2">Address</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* Division */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Division
                </label>
                <select
                  {...register("division", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="khulna">Khulna</option>
                </select>
              </div>
              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  District
                </label>
                <select
                  {...register("district", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="cumilla">Cumilla</option>
                  <option value="feni">Feni</option>
                </select>
              </div>
              {/* Upazilla/Thana */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upazilla/Thana
                </label>
                <select
                  {...register("upazila", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="burichang">Burichang</option>
                  <option value="goripur">Goripur</option>
                </select>
              </div>
              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="number"
                  {...register("postal-code", { required: true })}
                  placeholder="Postal code"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[5px] px-3 rounded-md"
                />
              </div>
              {/* Address Line */}
              <div className="md:col-span-">
                <label className="block text-sm font-medium text-gray-700">
                  Address Line
                </label>
                <textarea
                  {...register("address-line", { required: true })}
                  placeholder="Address line"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md resize-none"
                />
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div>
            <p className="border-b pb-2">Owner Information</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* Owner Name  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Owner Name
                </label>
                <input
                  type="text"
                  {...register("owner-name", { required: true })}
                  placeholder="Name"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/*Owner's Email  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Owner's Email
                </label>
                <input
                  type="email"
                  {...register("owner-email", { required: true })}
                  placeholder="Email address"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* Owner's Phone Number  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Owner's Phone Number
                </label>
                <input
                  type="number"
                  {...register("owner-phone-number", { required: true })}
                  placeholder="Phone number"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* Pharmacist Name  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pharmacist Name
                </label>
                <input
                  type="text"
                  {...register("pharmacist-name", { required: true })}
                  placeholder="Pharmacist name"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* Pharmacist Registration No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pharmacist Registration No
                </label>
                <input
                  type="number"
                  {...register("pharmacist-reg-no", { required: true })}
                  placeholder="Registration No"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              <br />
              {/* Upload Drug License  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Drug License
                </label>
                <div className="mt-1 flex items-center border p-2 rounded-md">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("drug_license")}
                    onChange={(e) => {
                      setDrugLicense(e.target.files[0]?.name);
                      setValue("drug_license", e.target.files[0]);
                    }}
                    className="hidden"
                    id="drag-license-upload"
                  />
                  <label
                    htmlFor="drag-license-upload"
                    className="cursor-pointer bg-[#006E9E] text-white p-[6px] text-xs"
                  >
                    Upload
                  </label>
                  <span className="text-xs text-gray-700 ml-2">
                    {drugLicense}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* submit button  */}
          <button
            type="submit"
            className="cursor-pointer bg-[#006E9E] text-white px-7 py-[10px] text-sm"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopInformation;
