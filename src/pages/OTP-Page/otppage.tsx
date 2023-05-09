import React, { useState, useEffect } from "react";
import {
  IonFooter,
  IonHeader,
  IonCol,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonToolbar,
  IonTitle,
  IonPage,
  IonContent,
  useIonViewWillEnter,
  useIonViewDidEnter,
  withIonLifeCycle,
  useIonToast,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

// import "./success.css";

interface AddAmountPageProps {}

const AddAmountPage: React.FC<AddAmountPageProps> = () => {
  const Navigate = useHistory();

  let initialized = false;

  const [array, setarray] = useState<any>([]);

  const [otp, setotp] = useState<any>();

  const [disabled, setdisabled] = useState<any>(true);

  const [otpdisabled, setotpdisabled] = useState<any>(true);

  const [availabeamount, setavailableamount] = useState<any>()

  const [counter , setcounter] = useState<any>(0)

  useEffect(() => {
    effect();
  }, [counter]);

  const effect = async () => {
    const userId = localStorage.getItem("userId");
    const cardNumber = localStorage.getItem("cardNumber")
    if (!initialized) {
      initialized = true;
      // My actual effect logic...
      await axios
        .post("http://192.168.0.132:8000/custDetails",{
          cardNumber : cardNumber,
          userId : userId
        })
        .then((res) => {
          console.log(res,"res")
           setavailableamount(res.data.availableBalance)
        });
    }
  };


  var initialValues = {
    cardNumber:"",
    amount: "",
    // availableamount:"",
    otp: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm({
    defaultValues: initialValues,
  });

  //   QR

  const [state, setState] = useState({
    stringEncoded: "",
    encodeResponse: "Hello World",
    dataEncode: "",
  });
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setState({ [name]: value });
    console.log(state);
  };

  // const dataToScan = async () => {
  //   const data = await BarcodeScanner.scan();
  //   // alert(JSON.stringify(data));
  //   setValue("amount", "5");
  //   setotpdisabled(false)
  //   setState({ stringEncoded: data.text });
  // };
  
  // const createCode = () => {
  //   BarcodeScanner.encode(
  //     BarcodeScanner.Encode.TEXT_TYPE,
  //     state.encodeResponse
  //   ).then(
  //     (data) => {
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.log("Error : " + error);
  //     }
  //   );
  // };

  const onSubmit = async (data: any) => {
    console.log(data, "data");
    await axios
      .post("http://192.168.0.132:8000/addFund",{
        cardNumber : data.cardNumber? data.cardNumber : "",
        amount : data.amount ? data.amount : ""
      })
      .then((res) => {
        console.log(res,"res")
        reset();
        setcounter(counter+1)
        // Navigate.push("/userHomePage");
        presentToast("top");
        setdisabled(true);
        setotp("");
      })
      .catch((err) => console.log(err));
   
  };

  const [present] = useIonToast();

  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Amount Added",
      duration: 3000,
      position: position,
      color: "primary",
    });
  };

  const sendOTP = () => {
    // console.log(Math.floor(100000 + Math.random() * 900000));
    const cardNumber = localStorage.getItem("cardNumber");
    const val = Math.floor(100000 + Math.random() * 900000);
    const newotp = val.toString();
    console.log(newotp, "iv");
    setotp(newotp);
    setValue("cardNumber", cardNumber?cardNumber:"");
    setValue("otp", newotp);
    setdisabled(false);
    setotpdisabled(true);
  };

  const inputChange = (fieldname) => {
    clearErrors([fieldname]);
    setotp("");
    setdisabled(true);
    setotpdisabled(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonRow class="ion-align-items-center">
          <IonCol size="6">
            {" "}
            <img src="magnatinew.png" />
          </IonCol>
          <IonCol size="6">
            <a href="javascript:void(0);"> عربى </a>
          </IonCol>
        </IonRow>
      </IonHeader>

      <IonContent scrollbar="true">
        <IonRow class="ion-align-items-center ion-justify-content-center row">
          <IonCol size="12" size-md="8" size-lg="4">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Add Amount</IonCardTitle>
              </IonCardHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonInput
                        label="Enter Amount (AED)"
                        labelPlacement="stacked"
                        type="number"
                        clearInput={true}
                        placeholder="Enter Amount"
                        onIonInput={() => inputChange("amount")}
                        {...register("amount", {
                          required: "Amount is required",
                          //   pattern: {
                          //     value:
                          //       /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
                          //     message: "Please Enter Valid Mobile Number",
                          //   },
                          //   maxLength: {
                          //     value: 10,
                          //     message: "Please Enter Valid Mobile Number",
                          //   },
                        })}

                        // value={formvalue.mobileNumber}
                      ></IonInput>
                    </IonItem>
                    <p>{errors.amount?.message}</p>
                    <IonItem>
                            <IonInput
                              label="Available Amount"
                              labelPlacement="stacked"
                              value={availabeamount}
                              clearInput={true}
                              placeholder=""
                              onIonInput={() => setdisabled(true)}
                              disabled
                              // {...register("availabelamount", {
                              //   required: "Amount is Required",
                              //   // maxLength: {
                              //   //   value: 6,
                              //   //   message: "Enter six Numbers",
                              //   // },
                              // })}
                            ></IonInput>
                          </IonItem>
                          {/* <p>{errors.availabeamount?.message}</p> */}
                    <IonItem>
                      <IonInput
                        label="OTP"
                        value={otp}
                        labelPlacement="stacked"
                        clearInput={true}
                        placeholder="Enter OTP"
                        onIonInput={() => setdisabled(true)}
                        {...register("otp", {
                          required: "OTP is Required",
                          // maxLength: {
                          //   value: 6,
                          //   message: "Enter six Numbers",
                          // },
                        })}
                      ></IonInput>
                    </IonItem>
                    <p>{errors.otp?.message}</p>
                  </IonList>

                  {/* <IonButton
                    color="danger"
                    // expand="block"
                    onClick={() => dataToScan()}
                  >
                    Scan Data
                  </IonButton> */}


                  <IonButton
                    onClick={() => sendOTP()}
                    disabled={otpdisabled}
                    routerDirection="none"
                  >
                    Send OTP
                  </IonButton>

                  
                  <IonButton
                    type="submit"
                    disabled={disabled}
                    routerDirection="none"
                  >
                    Add Amount
                  </IonButton>
                </IonCardContent>
              </form>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>

      <IonFooter>
        <IonRow class="ion-align-items-center">
          <IonCol size="12">
            {" "}
            Copyright (c) 2023 Magnati. All Rights Reserved.
          </IonCol>
        </IonRow>
      </IonFooter>
    </IonPage>
  );
};

export default AddAmountPage;
