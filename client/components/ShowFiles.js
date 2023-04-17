import React from "react";
import { getFile } from "@/feat/getfile";
import { useState } from "react";
import { useEffect } from "react";
import ImageType from "./fileType/ImageType";
import PdfType from "./fileType/PdfType";
import VedioType from "./fileType/VedioType";
import { SharedWithModal } from "./Modal";

const ShowFiles = ({ fetchedFiles,getProviderOrSigner }) => {
    const [decodedFile, setDecodeFile] = useState([]);
    const type = "files";
    const getFileType = (filename) => {
        console.log(filename);
        
        let ind = filename.lastIndexOf(".");
        let type = filename.slice(ind + 1);
        return type;
    };
    useEffect(() => {
        console.log(fetchedFiles.length);
    }, []);
    return (
        <div className="grid_folder">
        <div className="grid_folder_contain ">
        
            {fetchedFiles.map((item) => {
                if (
                    getFileType(item.name) === "jpg" ||
                    getFileType(item.name) === "png" ||
                    getFileType(item.name) === "jpeg"
                ) {
                    return <ImageType getProviderOrSigner={getProviderOrSigner} item={item} />;
                }
                if (getFileType(item.name) === "pdf") {
                    return <PdfType item={item} />;
                }
                if (getFileType(item.name) === "mp4") {
                    return <VedioType item={item} />;
                }
            })}
        </div>
        </div>
    );
};

export default ShowFiles;
