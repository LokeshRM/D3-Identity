import React from "react";
import folder from "../public/folder.svg"
import Image from 'next/image';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useRouter } from "next/router";
import Share_Remove from "./Share_Remove";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { OpenDeleteModal } from "./Modal";

const ShowFolder = ({ fetchedFolders, resetValues }) => {
  const [open, setOpen] = useState(false)
  const type = "folder"
  const router = useRouter();
  const visitFolder = (cid) => {
    resetValues()
    console.log(cid);
    router.push(cid);
  };
  const changeDivider = ()=>{
    if(open){
        setOpen(false)
    }else{
        setOpen(true)
    }
  }

//   const RemoveData = (cid)=>{
//     console.log('skghjh')
//     setCid(cid)
//     setOpenModal(true)
//   }
  return (
    <div>
   
      <div className="grid_folder">
        
        <div className="grid_folder_contain ">
          {fetchedFolders.map((item) => {
            return (
              <>
                <div className=" card-component  hover:bg-[#def9fb] ">
                  <div className="lower-container flex justify-between">
                    <div className="flex justify-start">
                      <CreateNewFolderIcon sx={{ marginRight: "5px" }} />
                      <p className="text-sm m-[1px] ">
                        {item.name.slice(0, 30)}
                      </p>
                    </div>
                    <div className="hover:bg-blue-50 rounded-lg cursor-pointer relative">
                      {open ? (
                        <div>
                          <div className="absolute top-0 left-10 ">
                            <div
                              className="flex justify-end mr-2 "
                              onClick={changeDivider}
                            >
                              <CancelIcon />
                            </div>
                            <Share_Remove
                              changeDivider={changeDivider}
                              cid={item.cid}
                              type = {type}
                            />
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <MoreVertIcon onClick={changeDivider} />
                    </div>
                  </div>
                  <div
                    className="upper-container"
                    onClick={() => visitFolder(item.cid)}
                  >
                    <div className="image-container cursor-pointer">
                      <Image
                        src={folder}
                        alt="pdf"
                        style={{ height: "10rem" }}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShowFolder;
