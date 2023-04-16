import Image from "next/image";
import avatar from "../public/avatar.jpg";
import { useRouter } from "next/router";
const style = {
  wrapper: `h-16 w-full bg-[#3448C5] text-white flex md:justify-between items-center px-60`,
  leftMenu: `flex gap-3`,
  menuItem: `text-lg text-white font-medium flex items-center mx-4 cursor-pointer`,
  rightMenu: `flex gap-3 items-center`,
  userImageContainer: `mr-2`,
  userImage: `h-9 w-9 rounded-full p-px cursor-pointer `,
  loginButton: `cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1 `,
  loginText: `ml-2 text-white`,
  logoutText: `ml-10 cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1 text-white`,
};

const Navbar = ({
    walletConnected,
    currentAccount,
    connectWallet,
    disconnect,
}) => {

    const router = useRouter()
    const routeToProfile = ()=>{
        router.push('/profile')
    }

    return (
        <div className={style.wrapper}>
            <div className={style.leftMenu}></div>
            <div className={style.rightMenu}>
                <div className={style.userImageContainer} >
                    <Image
                        className={style.userImage}
                        src={avatar}
                        alt="img"
                        width={200}
                        height={200}
                        onClick={routeToProfile}
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
