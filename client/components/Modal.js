import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";

import useModalStore from '@/store/modal_store';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "700px",
  overflowY: "scroll",
  border: "none",
//   backgroundColor:"blue"
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  
  border: "none",
  //   backgroundColor:"blue"
};
const ModalPopUp = () => {
    const { openModalvariable, setCloseModal, link , type} = useModalStore(
      (state) => ({
        openModalvariable: state.openModalvariable,
        setOpenModal: state.setOpenModal,
        setCloseModal: state.setCloseModal,
        link: state.link,
        type: state.type,
      })
    );
     
    const handleClose = () => setCloseModal();

  return (
    <div>
      <Modal
        open={openModalvariable}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ border: "none" }}
      >
        <div>
          {type == "image" ? (
            <div>
              <Box sx={style} className="no-scroll">
                <img src={link} className="show-image" />
              </Box>
            </div>
          ) : (
            <div></div>
          )}

          {type === "pdf" ? (
            <Box sx={style1} className="no-scroll">
              <embed
                src={link}
                type="application/pdf"
                className="show-image"
                width="900px"
                height="900px"
                WMODE="transparent"
              />
            </Box>
          ) : (
            <div></div>
          )}
          {type === "vedio" ? (
            <Box sx={style} className="no-scroll">
              <vedio controls>
                <source src={link} type="video/mp4"></source>
              </vedio>
            </Box>
          ) : (
            <div></div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ModalPopUp;