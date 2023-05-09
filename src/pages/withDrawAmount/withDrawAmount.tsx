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
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonAlert,
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

interface AmountWithdrawPageProps {}

const AmountWithdraw: React.FC<AmountWithdrawPageProps> = () => {
  const Navigate = useHistory();

  let initialized = false;

  const [array, setarray] = useState<any>([]);

  const [otp, setotp] = useState<any>();

  const [disabled, setdisabled] = useState<any>(true);

  const [otpdisabled, setotpdisabled] = useState<any>(true);
  const [availabeamount, setavailableamount] = useState<any>();

  const [counter, setcounter] = useState<any>(0);

  const [cardNumber, setcardNumber] = useState<any>();

  var initialValues = {
    cardNumber: "",
    amount: "",
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

  useEffect(() => {
    effect();
    return localStorage.setItem("scanamount", "");
  }, [counter]);

  const effect = async () => {
    const userId = localStorage.getItem("userId");
    const cardNumber = localStorage.getItem("cardNumber");
    setcardNumber(cardNumber);
    const scanamount = localStorage.getItem("scanamount");
    if (!initialized) {
      initialized = true;
      // My actual effect logic...
    }
  };

  const [state, setState] = useState({
    selectedCardNumber: "",
    stringEncoded: "",
    encodeResponse: "Hello World",
    dataEncode: "",
  });
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setState({ [name]: value });
    console.log(state);
  };

  const dataToScan = async () => {
    const data = await BarcodeScanner.scan();
    // alert(JSON.stringify(data));
    setValue("amount", "5");
    setotpdisabled(false);
    setState({ stringEncoded: data.text });
  };

  const createCode = () => {
    BarcodeScanner.encode(
      BarcodeScanner.Encode.TEXT_TYPE,
      state.encodeResponse
    ).then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log("Error : " + error);
      }
    );
  };

  const onSubmit = async (data: any) => {
    console.log(data, "data");
    const cardNumber = localStorage.getItem("cardNumber");
    await axios
      .post("http://192.168.0.132:8000/withdrawFund", {
        cardNumber: cardNumber ? cardNumber : "",
        amount: data.amount ? data.amount : "",
      })
      .then((res) => {
        console.log(res.data, "data");
        reset();
        setcounter(counter + 1);
        // Navigate.push("/userhomepage");
        // presentToast("top");
        setdisabled(true);
        setotp("");
      })
      .catch((err) => console.log(err));
  };

  const [present] = useIonToast();

  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Amount Withdrawn",
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
                <IonCardTitle>WithDraw Amount</IonCardTitle>
              </IonCardHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonSelect
                        label="Debit From"
                        labelPlacement="stacked"
                        placeholder="Select Card Number"
                        onIonChange={() => availabelBalance()}
                        {...register("selectedCardNumber", {
                          required: "Card Number is required",
                        })}
                      >
                        <IonSelectOption value={cardNumber ? cardNumber : "Pending/InActive"}>
                        {cardNumber ? cardNumber : "Pending/InActive"}
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                    {
                        cardNumber ? <><IonInput
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
                      ></IonInput></> : <><IonInput
                      label="Enter Amount (AED)"
                      labelPlacement="stacked"
                      type="number"
                      clearInput={true}
                      placeholder="Enter Amount"
                      disabled
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
                    ></IonInput></>
                      }
                    </IonItem>
                    <p>{errors.amount?.message}</p>

                    <IonItem>
                      <IonInput
                        label="Available Amount"
                        labelPlacement="stacked"
                        value={availabeamount}
                        clearInput={true}
                        placeholder=""
                        disabled
                        onIonInput={() => setdisabled(true)}
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

                  <IonButton
                    color="danger"
                    // expand="block"
                    onClick={() => dataToScan()}
                  >
                    Scan QR Code
                  </IonButton>

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
                    id="present-alert"
                  >
                    WithDraw Amount
                  </IonButton>
                </IonCardContent>
              </form>
            </IonCard>
          </IonCol>
        </IonRow>

        {/* Alert */}

        <IonAlert
          header="Note !"
          trigger="present-alert"
          message="9999999999"
          subHeader="Reference Number For This Transaction"
          buttons={[
            {
              text: "OK",
              role: "confirm",
              handler: () => {
                setHandlerMessage();
              },
            },
          ]}
          // onDidDismiss={({ detail }) => setRoleMessage(`Dismissed with role: ${detail.role}`)}
        ></IonAlert>
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
              onClick={() => Navigate.push("/")}
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

export default AmountWithdraw;
