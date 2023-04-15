import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { HomeUploadFolder,UploadFolder } from '@/feat/upload';
import { useRouter } from "next/router";


import {
  useModalUploadFileStore,
  useCreateFolderStore,
} from "../store/modal_store";
import useModalStore from '@/store/modal_store';
import DropFileInput from './draganddrop';
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

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius:5,
  p: 4,
};

const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  borderRadius: 2,
  p: 4,
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

const ModalPopUpUploadFile = (
  {getProviderOrSigner}
) => {
  const { openModal, closeUploadModal } = useModalUploadFileStore((state) => ({
    openModal: state.openModal,
    closeUploadModal: state.closeUploadModal,
  }));

  const handleClose = () => closeUploadModal();

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2} className="no-scroll">
          <DropFileInput getProviderOrSigner={getProviderOrSigner} />
        </Box>
      </Modal>
    </div>
  );
};


const CreateFolderModal = ({ getProviderOrSigner }) => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const { openFolderModal, closeFolderModal } = useCreateFolderStore(
    (state) => ({
      openFolderModal: state.openFolderModal,
      closeFolderModal: state.closeFolderModal,
    })
  );

  const handleClose = () => closeFolderModal();
  const createFolder = () => {
    const { cid } = router.query;
    if (cid === undefined) {
      HomeUploadFolder(input, getProviderOrSigner).then((res)=>{
        setInput("")
        closeFolderModal()
      })
    } else {
      UploadFolder(input,cid, getProviderOrSigner).then((res)=>{
        setInput("")
        closeFolderModal()
      })
    }
  };
  return (
    <div>
      <Modal
        open={openFolderModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style3} className="no-scroll ">
          <div>
            <p>Create a Folder</p>
          </div>
          <div className="flex">
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              sx={{ marginRight: "10px" }}
            />
            {input.length > 0 ? (
              <>
                <Button variant="contained" onClick={createFolder}>
                  Create
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};


export default ModalPopUp;

export { ModalPopUpUploadFile, CreateFolderModal };

