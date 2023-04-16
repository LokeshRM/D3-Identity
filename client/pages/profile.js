import React, {  useState } from 'react'
import EditIcon from "@mui/icons-material/Edit";
import { ProfileModal } from '@/components/Modal';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from 'next/router';
const profile = () => {
    const router = useRouter()
    const [name, setName] = useState("Rahul")
    const [phone, setPhone] = useState("123456789")
    const [email, setEmail] = useState("rahul1@gmail.com")
    const [address, setAddress] = useState("Ranchi, Jharkhand, India")
    const [adhaar,setAdhaar] = useState("12345789105837583")

    const [openModal, setOpenModal] = useState(false)

    const openModalFunction = ()=>{
        if(openModal){
            setOpenModal(false)
        }
        else
        {
            setOpenModal(true)
        }
        // console.log(openModal);
    }

    const updateValue = (value,type)=>{
        if(type =="name"){
            setName(value)
            console.log(name);
        }
        if(type == "phone"){
            setPhone(value)
            console.log(phone);

        }
        if(type == "email"){
            setEmail(value)
            console.log(email);
        }   
        if(type == "address"){
            setAddress(value)
            console.log(address);
        }
        if(type=="adhaar"){
            setAdhaar(value)
            console.log(adhaar);
        }
    }

    const routeToHomePage = ()=>{
        router.push("/")
    }

  return (
    <div>
      <ArrowBackIcon
        sx={{ marginTop: "1rem", marginBottom: "1rem", cursor:"pointer" }}
        onClick={routeToHomePage}
      />
      <div>
        <ProfileModal
          openModal={openModal}
          openModalFunction={openModalFunction}
          updateValue={(value, type) => updateValue(value, type)}
        />
        <div className="mt-3 mb-3 ">
          <p className="text-4xl">
            Profile
            <span className="ml-[100px] ">
              <EditIcon
                className="cursor-pointer"
                onClick={openModalFunction}
              />
            </span>
          </p>
        </div>
      </div>
      <div>
        <div>
          <span className="font-bold">Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className="font-bold">Email: </span>
          <span>{email}</span>
        </div>
        <div>
          <span className="font-bold">Phone: </span>
          <span>{phone}</span>
        </div>
        <div>
          <span className="font-bold">Address: </span>
          <span>{address}</span>
        </div>
        <div>
          <span className="font-bold">Adhaar: </span>
          <span>{adhaar}</span>
        </div>
      </div>
    </div>
  );
}

export default profile