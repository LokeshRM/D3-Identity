import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { getFun } from '@/helperfunction/getFiles';
import ImageType from '@/components/fileType/ImageType';
import VedioType from '@/components/fileType/VedioType';
import PdfType from '@/components/fileType/PdfType';
const FolderStructure = () => {
    const [files, setFiles] = useState([])
    const router= useRouter()
    const getFileType = (filename)=>{
        let ind = filename.lastIndexOf(".")
        let type = filename.slice(ind+1)
        console.log(type);
        return type
    }
    useEffect(() => {
      if (router.isReady) {
        const { cid } = router.query;
        console.log(cid);
        const getFiles = async () => {
          await getFun(cid).then((res) => {
            setFiles(res);
          });
        };
        getFiles();
      }
    }, [router.isReady]);
    return (
      <div className="grid_folder">
        <div className="grid_folder_contain ">
          {files &&
            files.map((item) => {
              if (
                getFileType(item.name) === "jpg" ||
                getFileType(item.name) === "png" ||
                getFileType(item.name) === "jpeg"
              ) {
                return (
                  <ImageType item={item}  />
                );
              }
              if (getFileType(item.name) === "pdf") {
                return <PdfType item={item}  />;
              }
              if (getFileType(item.name) === "mp4") {
                return (
                  <VedioType item={item}  />
                );
              }
            })}
        </div>
      </div>
    );
}

export default FolderStructure