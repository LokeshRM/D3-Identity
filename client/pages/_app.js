import '@/styles/globals.css'
import ModalPopUp from "@/components/Modal";
import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useRef } from 'react';
import {
  useModalUploadFileStore,
  useCreateFolderStore,
} from "../store/modal_store";
import { ModalPopUpUploadFile, CreateFolderModal } from "../components/Modal";

export default function App({ Component, pageProps }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [forced, setForced] = useState(true);
  const web3ModalRef = useRef();

  const [openFiles, setOpenFiles] = useState(0)

  const { setUploadModal } = useModalUploadFileStore((state) => ({
    setUploadModal: state.setUploadModal,
  }));

  const { setFolderModal } = useCreateFolderStore((state) => ({
    setFolderModal: state.setFolderModal,
  }));

   const getProviderOrSigner = async (needSigner = false) => {
     const provider = await web3ModalRef.current.connect();
     const web3Provider = new providers.Web3Provider(provider);

     const { provider: ethereum } = web3Provider;
     ethereum.on("accountsChanged", connectWallet);
     ethereum.on("accountsChanged", connectWallet);

     const { chainId } = await web3Provider.getNetwork();
     if (chainId !== 11155111) {
       window.alert("Change the network to sepolia");
       throw new Error("Change network to sepolia");
     }
     if (needSigner) {
       const signer = web3Provider.getSigner();
       return signer;
     }
     return web3Provider;
   };

   const connectWallet = async () => {
     try {
       const signer = await getProviderOrSigner(true);
       const userAddress = await signer.getAddress();
       setWalletAddress(userAddress.toString());
       setWalletConnected(true);
     } catch (err) {
       console.error(err);
     }
   };

   useEffect(() => {
     if (!walletConnected) {
       web3ModalRef.current = new Web3Modal({
         network: "sepolia",
         providerOptions: {},
         disableInjectedProvider: false,
       });
     }
     connectWallet();
   }, [walletConnected]);

  return (
    <>
      <ModalPopUp />
      <ModalPopUpUploadFile getProviderOrSigner={getProviderOrSigner} />
      <CreateFolderModal getProviderOrSigner={getProviderOrSigner} />
      <div className="">
        <Navbar
          walletConnected={walletConnected}
          currentAccount={walletAddress}
          connectWallet={connectWallet}
          disconnect={(x) => {
            setWalletConnected(x);
            setForced(x);
          }}
        />
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="h-[100vh] bg-[#F6F9FD]  ">
          <div onClick={setUploadModal}>New file</div>
          <div onClick={setFolderModal}>New Folder</div>
          <div className="cursor-pointer" onClick={() => setOpenFiles(0)}>
            files
          </div>
          <div className="cursor-pointer" onClick={() => setOpenFiles(1)}>
            shared with me
          </div>
        </div>
        <div className="h-[100vh]  col-span-4  ">
          <Component
            {...pageProps}
            openFiles={openFiles}
          />
        </div>
      </div>
    </>
  );
}
