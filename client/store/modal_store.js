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

const useDeleteDataStore = create((set) => ({
  openDeleteModalValue: false,
  cid: "",
  setCid: (cid) =>
    set((state) => ({
      cid: (state.cid = cid),
    })),
  setOpenDeleteModal: () =>
    set((state) => ({
      openDeleteModalValue: true,
    })),
  setCloseDeleteModal: () =>
    set((state) => ({
      openDeleteModalValue: false,
    })),
  
}));

const useSharefile = create((set) => ({
  openShareFileValue: false,
  cid: "",
  setCidShareFile: (cid) =>
    set((state) => ({
      cid: (state.cid = cid),
    })),
  setOpenShareFileModal: () =>
    set((state) => ({
      openShareFileValue: true,
    })),
  setCloseShareFileModal: () =>
    set((state) => ({
      openShareFileValue: false,
    })),
}));

const useSharedWithStore = create((set) => ({
  openSharedWithStore: false,
  cid: "",
  setCidSharedWith: (cid) =>
    set((state) => ({
      cid: (state.cid = cid),
    })),
  setOpenSharedWithModal: () =>
    set((state) => ({
      openSharedWithStore: true,
    })),
  setCloseSharedWithModal: () =>
    set((state) => ({
      openSharedWithStore: false,
    })),
}));

export default useModalStore

export {
  useModalUploadFileStore,
  useCreateFolderStore,
  useDeleteDataStore,
  useSharefile,
  useSharedWithStore,
};