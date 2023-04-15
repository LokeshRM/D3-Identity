import React from 'react'
import useModalStore from "@/store/modal_store";
import Image from 'next/image';
import PdfSvg from "/public/Pdf.svg"
import PhotoIcon from "@mui/icons-material/Photo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const PdfType = ({item}) => {
  const { setOpenModal, setLink, setType } = useModalStore(
    (state) => ({
      
      setOpenModal: state.setOpenModal,
      setLink: state.setLink,
      setType: state.setType,
    })
  );
  const seePdf = ()=>{
    setOpenModal();
    setLink(item.link);
    setType("pdf")
  }
  return (
    <div
      className=" card-component cursor-pointer hover:bg-gray-300"
      onClick={seePdf}
    >
      <div className="lower-container flex justify-between">
        <div className="flex justify-start">
          <PictureAsPdfIcon sx={{ margin: "1px" }} />
          <p className="text-sm m-[1px] ">{item.name}</p>
        </div>
        <div className="">
          <MoreVertIcon />
        </div>
      </div>
      <div className="upper-container">
        <div className="image-container">
          <Image src={PdfSvg} alt="pdf" style={{ height: "10rem" }} />
        </div>
      </div>
    </div>
  );
}

export default PdfType