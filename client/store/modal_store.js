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

export default useModalStore