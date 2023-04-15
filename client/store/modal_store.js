import { create } from "zustand";

const useModalStore = create((set) => ({
  openModalvariable: false,
  link: "",
  type:"",
  setOpenModal: () =>
    set((state) => ({
      openModalvariable: true,
    })),
  setCloseModal: () =>
    set((state) => ({
      openModalvariable: false,
    })),
  setLink: (link) =>
    set((state) => ({
      link: (state.link = link),
    })),
    setType:(type)=>set((state)=>({
        type:state.type = type
    }))
}));

const useModalUploadFileStore = create((set)=>({
    openModal:false,
    setUploadModal:()=>set((state)=>({
        openModal:true
    })),
    closeUploadModal:()=>set((state)=>({
        openModal:false
    }))
}))

const useCreateFolderStore = create((set) => ({
  openFolderModal: false,
  setFolderModal: () =>
    set((state) => ({
      openFolderModal: true,
    })),
  closeFolderModal: () =>
    set((state) => ({
      openFolderModal: false,
    })),
}));

export default useModalStore

export { useModalUploadFileStore, useCreateFolderStore };