import Image from "next/image";
import avatar from "../public/avatar.jpg";

const style = {
    wrapper: `h-16 w-full bg-black text-white flex md:justify-between items-center px-60`,
    leftMenu: `flex gap-3`,
    menuItem: `text-lg text-white font-medium flex items-center mx-4 cursor-pointer`,
    rightMenu: `flex gap-3 items-center`,
    userImageContainer: `mr-2`,
    userImage: `h-9 w-9 rounded-full p-px `,
    loginButton: `cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1`,
    loginText: `ml-2`,
    logoutText: `ml-10 cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1`,
};

const Navbar = ({
    walletConnected,
    currentAccount,
    connectWallet,
    disconnect,
}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.leftMenu}></div>
            <div className={style.rightMenu}>
                <div className={style.userImageContainer}>
                    <Image
                        className={style.userImage}
                        src={avatar}
                        alt="img"
                        width={200}
                        height={200}
                    />
                </div>
                {walletConnected ? (
                    <div>
                        {currentAccount.slice(0, 6)}....
                        {currentAccount.slice(39)}
                        <span
                            className={style.logoutText}
                            onClick={() => disconnect(false)}
                        >
                            Log out
                        </span>
                    </div>
                ) : (
                    <div
                        className={style.loginButton}
                        onClick={() => connectWallet()}
                    >
                        <span className={style.loginText}>Log in</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
