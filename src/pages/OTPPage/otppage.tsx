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
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonAlert,
  useIonAlert,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import {
  arrowBackOutline,
  arrowForwardOutline,
  cardOutline,
  homeOutline,
  listCircleOutline,
  logoIonic,
  logOutOutline,
  scanOutline,
  walletOutline,
} from "ionicons/icons";

// import "./success.css";

interface RegisterOTPProps {}

const RegisterOTP: React.FC<RegisterOTPProps> = (submit) => {
  const Navigate = useHistory();

  let initialized = false;

  const [array, setarray] = useState<any>([]);

  const [otp, setotp] = useState<any>();

  const [disabled, setdisabled] = useState<any>(true);

  const [otpdisabled, setotpdisabled] = useState<any>(false);

  const [availabeamount, setavailableamount] = useState<any>();

  const [counter, setcounter] = useState<any>(0);

  const [cardNumber, setcardNumber] = useState<any>();

  const [presentAlert] = useIonAlert();

  useEffect(() => {
    effect();
  }, [counter]);

  const effect = async () => {
    const userId = localStorage.getItem("userId");
    const cardNumber = localStorage.getItem("cardNumber");
    setcardNumber(cardNumber);
    if (!initialized) {
      initialized = true;
      // My actual effect logic...
    }
  };

  var initialValues = {
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
    Navigate.push("/");
    presentToast("top");
    reset();
    setotp("");
    setotpdisabled(false)
    setdisabled(true)
  };

  const [present] = useIonToast();

  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Registration Successfull",
      duration: 3000,
      position: position,
      color: "primary",
    });
  };

  const sendOTP = () => {
    // console.log(Math.floor(100000 + Math.random() * 900000));
    const val = Math.floor(100000 + Math.random() * 900000);
    const newotp = val.toString();
    console.log(newotp, "iv");
    setotp(newotp);

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

  const availabelBalance = async () => {
    console.log("AB");
    const cardNumber = await localStorage.getItem("cardNumber");
    const userId = localStorage.getItem("userId");

    await axios
      .post("http://192.168.0.132:8000/custDetails", {
        cardNumber: cardNumber,
        userId: userId,
      })
      .then((res) => {
        console.log(res, "res", "availble balance");
        setavailableamount(res.data.availableBalance);
      });
  };

  const setHandlerMessage = () => {
    presentToast("top");
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
                <IonCardTitle>OTP</IonCardTitle>
              </IonCardHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <IonCardContent>
                  <IonList>
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
                    onClick={() => submit()}
                  >
                    Submit
                  </IonButton>
                </IonCardContent>
              </form>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>

      <IonFooter>
        <IonRow>
          <IonCol>
            <IonIcon
              className="tabicon"
              color="primary"
              icon={arrowBackOutline}
              onClick={() => Navigate.goBack()}
            ></IonIcon>
          </IonCol>
          <IonCol>
            <IonIcon
              className="tabicon"
              color="primary"
              icon={homeOutline}
              onClick={() => Navigate.push("/userHomePage")}
            ></IonIcon>
          </IonCol>
          <IonCol>
            <IonIcon
              className="tabicon"
              color="primary"
              icon={logOutOutline}
              onClick={() => {
                localStorage.clear();
                Navigate.push("/");
              }}
            ></IonIcon>
          </IonCol>
          <IonCol>
            <IonIcon
              className="tabicon"
              color="primary"
              icon={arrowForwardOutline}
              onClick={() => Navigate.goForward()}
            ></IonIcon>
          </IonCol>
        </IonRow>
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

export default RegisterOTP;
