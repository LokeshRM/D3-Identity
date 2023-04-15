import '@/styles/globals.css'
import ModalPopUp from "@/components/Modal";
export default function App({ Component, pageProps }) {
  return (
    <>
      <ModalPopUp />
      <Component {...pageProps} />
    </>
  );
}
