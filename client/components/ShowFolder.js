import React from "react";
import folder from "../public/folder.svg"
import Image from 'next/image';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
const ShowFolder = ({ fetchedFolders }) => {
    const router = useRouter()
    const visitFolder = (cid)=>{
        console.log(cid);
        router.push(cid)
    }
    return (
        <div>
            <div className="grid_folder">
                <p>Folders</p>
                <div className="grid_folder_contain ">
                    {fetchedFolders.map((item) => {
                        return (
                            <div
                                className=" card-component cursor-pointer hover:bg-gray-300"
                                onClick={()=>visitFolder(item.cid)}
                            >
                                <div className="lower-container flex justify-between">
                                    <div className="flex justify-start">
                                        <PictureAsPdfIcon
                                            sx={{ margin: "1px" }}
                                        />
                                        <p className="text-sm m-[1px] ">
                                            {item.name}
                                        </p>
                                    </div>
                                    <div className="">
                                        <MoreVertIcon />
                                    </div>
                                </div>
                                <div className="upper-container">
                                    <div className="image-container">
                                        <Image
                                            src={folder}
                                            alt="pdf"
                                            style={{ height: "10rem" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShowFolder;
