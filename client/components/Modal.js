import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { HomeUploadFolder,UploadFolder } from '@/feat/upload';
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSharefile } from '../store/modal_store';
import SendIcon from "@mui/icons-material/Send";
import { useSharedWithStore } from '../store/modal_store';
import UserListIterator from './UserListIterator';
import { useLoaderModal } from '../store/modal_store';
import AddIcon from "@mui/icons-material/Add";
// import TextField from "@mui/material/TextField";
import { UpdateLoaderbuttonShow } from './Loader';
import {
  useModalUploadFileStore,
  useCreateFolderStore,
  useDeleteDataStore,
} from "../store/modal_store";
import useModalStore from '@/store/modal_store';
import DropFileInput from './draganddrop';
import { Typography } from '@mui/material';
import { deleteFile, deleteFolder, deleteHomeFile, deleteHomeFolder, giveAccessFile, giveAccessFolder,getSharedFiles,getSharedFolders } from '@/feat/helper';
import { logger } from 'ethers';
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

const style4 = {
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

const style5 = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
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
  const [load, setLoad] = useState(false)
  const { openFolderModal, closeFolderModal } = useCreateFolderStore(
    (state) => ({
      openFolderModal: state.openFolderModal,
      closeFolderModal: state.closeFolderModal,
    })
  );

  const { setConst3, setConst4 } = useLoaderModal((state) => ({
    setConst3: state.setConst3,
    setConst4:state.setConst4
  }));

  const handleClose = () => closeFolderModal();
  const createFolder = () => {
    setLoad(true)
    const { cid } = router.query;
    if (cid === undefined) {
      HomeUploadFolder(input, getProviderOrSigner).then((res)=>{
        setInput("")
        closeFolderModal()
        setLoad(false)
        setConst3()
      })
    } else {
      UploadFolder(input,cid, getProviderOrSigner).then((res)=>{
        setInput("")
        closeFolderModal()
        setLoad(false)
        setConst4()
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
          <div className="m-3 text-center">
            <Typography variant="h5">Create Folder</Typography>
          </div>
          <div className="flex items-center">
            <TextField
              id="outlined-basic"
              label="Folder Name  "
              variant="outlined"
              name="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              sx={{ marginRight: "10px" }}
            />
            {input.length > 0 ? (
              <div>
                {load ? (
                  <div>
                    <UpdateLoaderbuttonShow />
                  </div>
                ) : (
                  <div>
                    <Button variant="contained" onClick={createFolder}>
                      <AddIcon />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};


const  OpenDeleteModal=({getProviderOrSigner}) => {
    const router = useRouter();
  const { cid,type,openDeleteModalValue, setCloseDeleteModal } = useDeleteDataStore(
    (state) => ({
      cid:state.cid,
      type:state.type,
      openDeleteModalValue: state.openDeleteModalValue,
      setCloseDeleteModal: state.setCloseDeleteModal,
    })
  );

  const DeleteData = (file)=>{
    const { cid } = router.query;
    if(type == "folder"){
        if (cid === undefined) {
            deleteHomeFolder(getProviderOrSigner,cid,file).then(res=>{
                console.log(res);
                setCloseDeleteModal();
            })
          } else {
            deleteFolder(getProviderOrSigner,cid,file).then(res =>{ 
                console.log(res);
                setCloseDeleteModal();
            })
          }
    }else{
        if (cid === undefined) {
            deleteHomeFile(getProviderOrSigner,cid,file).then(res=>{
                console.log(res);
                setCloseDeleteModal();
            })
        } else {
            console.log(file);
            deleteFile(getProviderOrSigner,cid,file).then(res =>{ 
                console.log(res);
                setCloseDeleteModal();
            })
        }
    }
    
  }

  return (
    <div>
      <Modal
        open={openDeleteModalValue}
        onClose={setCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Are you sure you want to delete file
          </Typography>
          <p>{cid} {type}</p>
          
          <DeleteIcon onClick={()=> DeleteData(cid)} sx={{fontSize:"40px", cursor:"pointer" , margin:"3px"}} />
        </Box>
      </Modal>
    </div>
  );
}

const ShareDataModal = ({getProviderOrSigner})=>{
    const router = useRouter();
  const [input, setInput] = useState("");
  const [load, setLoad] = useState(false)
  const {type, _cid,openShareFileValue, setCloseShareFileModal } = useSharefile(
    (state) => ({
      _cid:state._cid,
      type:state.type,
      openShareFileValue: state.openShareFileValue,
      setCloseShareFileModal: state.setCloseShareFileModal,
    })
  );
  const shareData = ()=>{
    setLoad(true)
    const { cid } = router.query;
    console.log(type);
    if(type == "folder"){
        giveAccessFolder(getProviderOrSigner,input,_cid).then(res =>{ 
              console.log(res);
              setCloseShareFileModal();
              setLoad(false)
          })
          
    }else{
          giveAccessFile(getProviderOrSigner,input,_cid).then(res =>{ 
                console.log(res);
                setCloseShareFileModal();
                setLoad(false)
            })
    }

  }
  return (
    <div>
      <Modal
        open={openShareFileValue}
        onClose={setCloseShareFileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style3} className="no-scroll ">
          <div className="m-3">
            <p>Share File</p>
          </div>
          <div className="flex items-center">
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
              <div>
                <div>
                  <Button variant="contained" onClick={() => shareData()}>
                    <SendIcon />
                  </Button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const SharedWithModal = ({getProviderOrSigner})=>{
  const [userList, setuserList] = useState([])

  const {type, _cid, openSharedWithStore, setCloseSharedWithModal } = useSharedWithStore(
    (state) => ({
      _cid:state._cid,
      type:state.type,
      openSharedWithStore: state.openSharedWithStore,
      setCloseSharedWithModal: state.setCloseSharedWithModal,
    })
  ); 
  
    const fetchDataofSharedWith = async() => {
        console.log(type);
        console.log(_cid);
        if(type == "folder"){
            getSharedFolders(getProviderOrSigner,_cid).then((res)=>{
                console.log(res);
                setuserList(res)
            })
        }else{
            getSharedFiles(getProviderOrSigner,_cid).then(res=>{
                console.log(res);
                setuserList(res)
            })
        }
    };
  
  return (
    <div>
      <Modal
        open={openSharedWithStore}
        onClose={()=>{setCloseSharedWithModal();
        setuserList([])}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style3} className="no-scroll ">
          <div className="m-3">
            <p>Share File</p>
          </div>
          <div className="flex justify-center items-center	flex-col">
          <button onClick={fetchDataofSharedWith} className="p-4 bg-blue-600 hover:bg-blue-400">Refresh</button>
            {userList && userList.map((user) => {
              return <UserListIterator user={user} />;
            })} 
          </div>
        </Box>
      </Modal>
    </div>
  );
}


const ProfileModal = ({ openModal, openModalFunction, updateValue }) => {
  const [open, setOpen] = React.useState(openModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveData = ()=>{

  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style5}>
          <div>
            <CancelIcon
              onClick={openModalFunction}
              sx={{
                cursor: "pointer",
                marginBottom: "1rem",
                position: "absolute",
                right: "1rem",
              }}
            />
            <div>
              <Typography variant="h3"> Edit Profile </Typography>
            </div>

            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                fullWidth
                onChange={(e) => updateValue(e.target.value, "name")}
              />
            </div>
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                fullWidth
                onChange={(e) => updateValue(e.target.value, "phone")}
              />
            </div>
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <TextField
                id="standard-basic"
                label="Phone"
                variant="standard"
                fullWidth
                onChange={(e) => updateValue(e.target.value, "email")}
              />
            </div>
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <TextField
                id="standard-basic"
                label="Address"
                variant="standard"
                fullWidth
                onChange={(e) => updateValue(e.target.value, "address")}
              />
            </div>
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <TextField
                id="standard-basic"
                label="Adhaar"
                variant="standard"
                fullWidth
                onChange={(e) => updateValue(e.target.value, "adhaar")}
              />
            </div>
            <div>
              <Button
                variant="contained"
                sx={{
                  cursor: "pointer",
                  marginBottom: "1rem",
                  marginTop:"1rem", 
                  right: "1rem",
                }}
                onClick={saveData}
              >
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPopUp;

export {
  ModalPopUpUploadFile,
  CreateFolderModal,
  OpenDeleteModal,
  ShareDataModal,
  SharedWithModal,
  ProfileModal,
};

