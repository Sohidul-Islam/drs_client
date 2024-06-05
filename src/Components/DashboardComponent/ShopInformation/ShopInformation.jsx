import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ShopInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: "01828632233",
      image: "https://i.ibb.co/J7RfLqK/shope-photo.png",
    },
  });
  const [imageSrc, setImageSrc] = useState(
    "https://i.ibb.co/J7RfLqK/shope-photo.png"
  );
  const [nidSrc, setNidSrc] = useState("https://i.ibb.co/KrT7qK8/nid.png");
  const [signatureSrc, setSignatureSrc] = useState(
    "https://i.ibb.co/zFt3338/signature.png"
  );
  const [nidFileName, setNidFileName] = useState("Sabariya NID.jpg");
  const [signatureFileName, setSignatureFileName] =
    useState("Sabariya Sign.PNG");

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageUpload = (
    e,
    setImageSrcCallback,
    fieldName,
    setFileNameCallback
  ) => {
    const file = e.target.files[0];
    if (file) {
      setValue(fieldName, file);
      setFileNameCallback(file.name);
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
              onChange={(e) =>
                handleImageUpload(e, setImageSrc, "image", setNidFileName)
              }
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
                  {...register("shop-name", { required: true })}
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
                  {...register("email", { required: true })}
                  defaultValue="largpharma1200@gmail.com"
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* phone number  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="number"
                  {...register("phone_number", { required: true })}
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
                  <option value="bangladeshi">Dhaka</option>
                  <option value="indian">Chittagong</option>
                  <option value="other">Khulna</option>
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
                  <option value="bangladeshi">Dhaka</option>
                  <option value="indian">Cumilla</option>
                  <option value="other">Feni</option>
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
                  <option value="bangladeshi">Dhaka</option>
                  <option value="indian">Burichang</option>
                  <option value="other">Goripur</option>
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
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[5px] px-3 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div>
            <p className="border-b pb-2">Privacy Settings</p>
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {/* New password  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message:
                        "Password must be at least 6 characters long and contain both letters and numbers",
                    },
                  })}
                  className="my-1 block w-full border outline-gray-300 text-gray-700 py-[5px] px-3 rounded-md"
                />
                {errors.password ? (
                  <p className="text-red-500 text-[10px]">
                    {errors.password.message}
                  </p>
                ) : (
                  <p className="text-[10px] text-[#989898]">
                    Password (Minimum 6 characters with combination of letter &
                    number)
                  </p>
                )}
              </div>
              {/* Confirm new password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm new password
                </label>
                <input
                  type="password"
                  {...register("confirm_password", {
                    required: true,
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  className="my-1 block w-full border outline-gray-300 text-gray-700 py-[5px] px-3 rounded-md"
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-[10px]">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* submit button  */}
          <button
            type="submit"
            className="cursor-pointer bg-[#006E9E] text-white px-7 py-[10px] text-sm"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopInformation;
