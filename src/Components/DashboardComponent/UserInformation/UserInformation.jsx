import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAddFileMutation } from "../../../features/api/admin/adminFileUploadApi";
import { useUpdateUserMutation } from "../../../features/api/admin/adminUserApi";
import { toast } from "react-toastify";

const UserInformation = () => {
  const { user } = useSelector((state) => state.auth);
  const [userFileName, setUserFileName] = useState("No image found");
  const [userImageSrc, setUserImageSrc] = useState("");
  const [nidFileName, setNidFileName] = useState("No image found");
  const [nidImageSrc, setNidImageSrc] = useState("");
  const [loading, setLoading] = useState("");

  const [updateUser] = useUpdateUserMutation();
  const [addFile] = useAddFileMutation();
  // console.log("User data", user);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("full-name", user?.shop_owner_name);
      setValue("email", user?.email);
      setValue("phone_number", user?.phone_number);
      setValue("image", user?.UserImage);
      setValue("nidImage", user?.nidImage);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    // setLoading("submit");
    console.log(data);
    // try {
    //   const res = await updateUser({ id: user.id, ...data }).unwrap();
    //   if (res.status) {
    //     toast.success("Store updated successfully");
    //     setLoading("");
    //   }
    // } catch (error) {
    //   toast.error("Failed to update the store");
    //   setLoading("");
    // }
  };

  // upload image or file
  const handleFileUpload = async (e, setFileName, fieldName, setImageSrc) => {
    setLoading(fieldName);
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await addFile(formData).unwrap();
      setValue(fieldName, res?.file?.url);
      setImageSrc(res?.file?.url);
      toast.success("File uploaded successfully");
      setLoading("");
    } catch (error) {
      toast.error("something went wrong");
      setLoading("");
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6">
        {/* user image  */}
        <div className="col-span-1 mx-auto">
          <div>
            {userImageSrc ? <img
                src={userImageSrc}
                alt="Uploaded"
                className="mt-4 w-24 h-24 rounded-full"
              /> : <div className="mt-4 w-24 h-24 border rounded-full text-xs text-center flex items-center">no image found</div> }
          </div>
          {/* image button  */}
          <div className="mt-4 flex items-center">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) =>
                handleFileUpload(e, setUserFileName, "image", setUserImageSrc)
              }
              className="hidden"
              id="user-image-upload"
            />
            <label
              htmlFor="user-image-upload"
              className={`${
                loading === "image"
                  ? "cursor-wait bg-[#c1c0c0] text-black"
                  : "cursor-pointer bg-[#006E9E] text-white"
              } p-[10px] text-xs`}
            >
              {loading === "image" ? "Uploading..." : "Upload Image"}
            </label>
          </div>
        </div>
        <div className="col-span-5 border-l px-11 my-5 space-y-11">
          {/* Personal Information  */}
          <div>
            <p className="border-b pb-2">Personal Information</p>
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {/* full name  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  {...register("full-name", { required: true })}
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* email  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="E-mail"
                  {...register("email", { required: true })}
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* phone number  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  {...register("phone_number", { required: true })}
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* NID No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  NID No.
                </label>
                <input
                  type="number"
                  placeholder="National Id No."
                  {...register("nid-no", { required: true })}
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* Upload NID Photo  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload NID
                </label>
                <div className="mt-1 flex items-center border px-2 py-1 rounded-md">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("nidImage")}
                    className="hidden"
                    id="nid-image-upload"
                    onChange={(e) =>
                      handleFileUpload(
                        e,
                        setNidFileName,
                        "nidImage",
                        setNidImageSrc
                      )
                    }
                  />
                  <label
                    htmlFor="nid-image-upload"
                    className={`${
                      loading === "nidImage"
                        ? "cursor-wait bg-[#c1c0c0] text-black"
                        : "cursor-pointer bg-[#006E9E] text-white"
                    } p-2.5 text-xs`}
                  >
                    {loading === "nidImage" ? "Uploading..." : "Upload"}
                  </label>
                  <span className="text-xs text-gray-700 ml-2">
                    {nidFileName
                      ? nidFileName?.slice(0, 25)
                      : "No file selected"}
                  </span>
                </div>

                {nidImageSrc ? (
                  <div>
                    <img
                      src={nidImageSrc}
                      alt="NID"
                      className="mt-2 w-28 h-20 border"
                    />
                  </div>
                ) : (
                  <div className="mt-2 w-28 h-20 border text-xs flex justify-center items-center">
                    no image found
                  </div>
                )}
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
            disabled={loading}
            className={`${
              loading
                ? "cursor-wait bg-[#c1c0c0] text-black"
                : "cursor-pointer bg-[#006E9E] text-white"
            } px-7 py-[10px] text-sm`}
          >
            {loading ? "Wait" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInformation;
