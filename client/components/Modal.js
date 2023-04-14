import { useRef } from "react";

const Modal = ({ status, changeStatus, addUser }) => {
    const inputRef = useRef();

    return (
        <>
            {status ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-non transition delay-1000">
                        <div className="relative my-6 mx-auto w-[600px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-xl font=semibold">
                                        Share these File
                                    </h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => changeStatus(false)}
                                    >
                                        <span className="text-black opacity-7 h-8 w-8 text-xl block bg-gray-400 py-0 rounded-full">
                                            x
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Enter address to share
                                        </label>
                                        <input
                                            ref={inputRef}
                                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                        />
                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => changeStatus(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => {
                                            changeStatus(false);
                                            addUser(inputRef.current.value);
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default Modal;
