import React from "react";
import PhotoIcon from "@mui/icons-material/Photo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useModalStore from "@/store/modal_store";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Share_Remove from "../Share_Remove";
import { SharedWithModal } from "../Modal";

const ImageType = ({ item,getProviderOrSigner }) => {
  const type = "file"
  const [open, setOpen] = useState(false);
  const { openModalvariable, setOpenModal, setLink, setType } = useModalStore(
    (state) => ({
      openModalvariable: state.openModalvariable,
      setOpenModal: state.setOpenModal,
      setLink: state.setLink,
      setType: state.setType,
    })
  );
  const seeFullImage = () => {
    // pass type and link to modal function
    // for modal make a global state which contain states to open and close modal, link of image, pdf or vedio will
    // use iframe
    setOpenModal();
    setLink(item.link);
    setType("image");
  };
  const changeDivider = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="card-component  hover:bg-[#def9fb]   ">
      <div className="lower-container flex justify-between">
      {/* <SharedWithModal getProviderOrSigner={getProviderOrSigner} cid={item.cid} type={type} /> */}
        <div className="flex justify-start">
          <PhotoIcon sx={{ marginRight: "5px" }} />
          <p className="text-sm m-[1px] ">{item.name.slice(0, 30)}</p>
        </div>
        <div className="hover:bg-blue-50 rounded-lg cursor-pointer relative">
          {open ? (
            <div>
              <div className="absolute top-0 left-10 ">
                <div className="flex justify-end mr-2 " onClick={changeDivider}>
                  <CancelIcon />
                </div>
                <Share_Remove getProviderOrSigner={getProviderOrSigner} changeDivider={changeDivider} cid={item.cid} type={type} />
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <MoreVertIcon onClick={changeDivider} />
        </div>
      </div>
      <div className="upper-container" onClick={seeFullImage}>
        <div className="image-container cursor-pointer ">
          <img src={item.link} className="communities-logo" />
        </div>
      </div>
    </div>
  );
};

export default ImageType;
