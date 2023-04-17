import { create } from "zustand";

const useFileStoreModal = create((set)=>({
    files:[],
    folder:[],
    setFiles:(newFiles)=>set((state)=>({
        files:state.files = newFiles
    })),
    setFolder:(newFolder)=>set((state)=>({
        folder:state.files = newFolder
    }))

}))

export default useFileStoreModal