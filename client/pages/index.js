import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { StoreContent } from "@/components/upload";
import { getContent } from "@/components/getFiles";
import { address, abi } from "@/contract";
import Navbar from "@/components/navbar";

export default function Home() {
    const [selectedFile, setSelectedFile] = useState([]);
    const [uploadedFles, setuploadedFles] = useState([]);

    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState();
    const web3ModalRef = useRef();

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
    }, [walletConnected]);

    const uploadit = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            try {
                const cid = await StoreContent(selectedFile);
                const ipfsHash = `https://${cid}.ipfs.w3s.link/`;
                console.log(ipfsHash);
                setSelectedFile([]);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("file not selected");
        }
    };

    const updateFiles = (data) => {
        const uploaded = [...uploadedFles];
        data.forEach((file) => {
            uploaded.push(file);
        });
        setuploadedFles(uploaded);
    };

    return (
        <>
            {/* navbar */}

            <div className="mb-20">
                <Navbar
                    walletConnected={walletConnected}
                    currentAccount={walletAddress}
                    connectWallet={connectWallet}
                    disconnect={setWalletConnected}
                />
            </div>

            {/* input element */}

            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            const chosenFiles = Array.prototype.slice.call(
                                e.target.files
                            );
                            const uploaded = [...selectedFile];
                            chosenFiles.some((file) => {
                                uploaded.push(file);
                            });
                            setSelectedFile(uploaded);
                        }}
                        multiple
                        required
                    />
                </label>
            </div>

            {/* display files */}

            <div>
                {selectedFile.map((file, i) => (
                    <div key={i}>{file.name}</div>
                ))}
            </div>
            {/* upload elemnet */}
            <div>
                <button
                    onClick={uploadit}
                    type="submit"
                    className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                    Upload
                </button>
            </div>

            {/* get element */}

            <div>
                <button
                    onClick={async () => {
                        const data = await getContent(
                            "bafybeifok2y6t2cawfpvwvp7i7xybprf6ffmjkj4aud3ysuqbgefxudcuq"
                        );
                        updateFiles(data);
                    }}
                    type="submit"
                    className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                    get
                </button>
            </div>

            {/* display files */}

            <div>
                {uploadedFles.map((file, i) => (
                    <a
                        key={i}
                        href={file.link}
                        target="_blank"
                        className="block"
                    >
                        {file.name}
                    </a>
                ))}
            </div>
        </>
    );
}
