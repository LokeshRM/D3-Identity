import { useRef, useState } from "react";
import { ImageConfig } from "./config/ImageConfig";
import { HomeUploadFile, UploadFile } from "../feat/upload";
import { useRouter } from "next/router";
import { useModalUploadFileStore } from "@/store/modal_store";

const DropFileInput = ({ getProviderOrSigner }) => {
  const wrapperRef = useRef(null);
  const router = useRouter();

  const {closeUploadModal } = useModalUploadFileStore((state) => ({
    closeUploadModal: state.closeUploadModal,
  }));

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [newFile];
      setFileList(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  const uploadFile = () => {
    const { cid } = router.query;
    if (cid === undefined) {
      HomeUploadFile(fileList, getProviderOrSigner).then(res=>{console.log(res);
        setFileList([]);
        closeUploadModal();
      })
      
      
    } else {
      // UploadFile()
    }
  };

  return (
    <>
      <div className="bg-[#F4F8FD]">
        <div
          ref={wrapperRef}
          className="flex items-center relative justify-center w-full"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer   ">
            <img src={"cloud-upload-regular-240.png"} alt="" />
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <input
              type="file"
              multiple
              className="opacity-0 absolute w-full h-full cursor-pointer"
              value=""
              onChange={onFileDrop}
            />
          </div>
        </div>

        {fileList.length > 0 ? (
          <div>
            <div>
              <button
                className="p-4 bg-blue-600 text-white rounded-md text-md"
                onClick={uploadFile}
              >
                Upload
              </button>
            </div>
            <div className="mt-10">
              <div className="grid grid-cols-3">
                {fileList.map((item, index) => (
                  <div key={index} className="drop-file-preview__item ml-10">
                    <img
                      className="w-[100px]"
                      src={
                        ImageConfig[item.type.split("/")[1]] ||
                        ImageConfig["default"]
                      }
                      alt=""
                    />
                    <div className="drop-file-preview__item__info">
                      <p className="font-medium">{item.name}</p>
                      <p className="font-medium">{item.size}B</p>
                    </div>
                    <span
                      className="drop-file-preview__item__del"
                      onClick={() => fileRemove(item)}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DropFileInput;
