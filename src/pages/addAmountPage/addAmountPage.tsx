import React, { useState, useEffect, useSyncExternalStore } from "react";
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
  IonRadioGroup,
  IonRadio,
  IonText,
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
import "./addAmountPage.css";

// import "./success.css";

interface AddAmountPageProps {}

const AddAmountPage: React.FC<AddAmountPageProps> = () => {
  const Navigate = useHistory();

  let initialized = false;

  const [array, setarray] = useState<any>([]);

  const [otp, setotp] = useState<any>();

  const [disabled, setdisabled] = useState<any>(true);

  const [otpdisabled, setotpdisabled] = useState<any>(true);

  const [availabeamount, setavailableamount] = useState<any>();

  const [counter, setcounter] = useState<any>(0);

  const [cardNumber, setcardNumber] = useState<any>();

  const [presentAlert] = useIonAlert();

  const [account, setaccount] = useState<any>(false);

  const [card, setcard] = useState<any>(false);

  const [radioValue, setradioValue] = useState<any>();

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
    selectedCardNumber: "",
    fromAccountNumber: "",
    toAccountNumber: "",
    debitCardNumber:"",
    creditCardNumber:"",
    cardNumber: "",
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
      .post("http://192.168.0.132:8000/addFund", {
        cardNumber: data.cardNumber ? data.cardNumber : "",
        amount: data.amount ? data.amount : "",
      })
      .then((res) => {
        console.log(res, "res");
        setcounter(counter + 1);
        // Navigate.push("/userHomePage");
        setdisabled(true);
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
    setValue("cardNumber", cardNumber ? cardNumber : "");
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

  const availabelBalance = async (e: any) => {
    console.log("AB", e);
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
    reset();
    setotp("");
  };

  const radioButtonValue = (e: any) => {
    const value = e.target.value;
    if (value == "Account") {
      setradioValue("Account");
      setaccount(true);
      setcard(false);
    } else {
      setradioValue("Card");
      setcard(true);
      setaccount(false);
    }
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
                <IonCardTitle>Prepaid Top-Up</IonCardTitle>
              </IonCardHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <IonCardContent>
                  <IonList>
                    <IonText>Debit From</IonText>
                    <IonItem>
                      <IonRadioGroup
                        onIonChange={(e) => radioButtonValue(e)}
                        value={radioValue}
                      >
                        
                        <IonRadio labelPlacement="end" justify="start" aria-label="Custom checkbox" value="Account">
                          Account
                        </IonRadio>
                        <IonRadio labelPlacement="end" justify="start" value="Card">Card</IonRadio>
                      </IonRadioGroup>
                    </IonItem>

                    {account ? (
                      <>
                        <IonItem>
                          <IonInput
                            label="From Account Number"
                            labelPlacement="stacked"
                            placeholder="Enter Account Number"
                            onIonChange={availabelBalance}
                            {...register("fromAccountNumber", {
                              required: "Account Number is required",
                            })}
                          ></IonInput>
                        </IonItem>
                        <p>{errors.fromAccountNumber?.message}</p>

                        <IonItem className="select">
                          <IonSelect
                            label="Credit To"
                            labelPlacement="stacked"
                            placeholder="Select Card Number"
                            onIonChange={availabelBalance}
                            {...register("creditCardNumber", {
                              required: "Card Number is required",
                            })}
                          >
                            <IonSelectOption
                              value={
                                cardNumber ? cardNumber : "Pending/InActive"
                              }
                            >
                              {cardNumber ? cardNumber : "Pending/InActive"}
                            </IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </>
                    ) : (
                      <></>
                    )}

                    {card ? (
                      <>
                        {" "}
                        <IonItem className="select">
                          <IonSelect
                            label="Debit From"
                            labelPlacement="stacked"
                            placeholder="Select Card Number"
                            onIonChange={availabelBalance}
                            {...register("debitCardNumber", {
                              required: "Card Number is required",
                            })}
                          >
                            <IonSelectOption
                              value={
                                cardNumber ? cardNumber : "Pending/InActive"
                              }
                            >
                              {cardNumber ? cardNumber : "Pending/InActive"}
                            </IonSelectOption>
                          </IonSelect>
                        </IonItem>
                        <IonItem className="select">
                          <IonSelect
                            label="Credit To"
                            labelPlacement="stacked"
                            placeholder="Select Card Number"
                            onIonChange={availabelBalance}
                            {...register("creditCardNumber", {
                              required: "Card Number is required",
                            })}
                          >
                            <IonSelectOption
                              value={
                                cardNumber ? cardNumber : "Pending/InActive"
                              }
                            >
                              {cardNumber ? cardNumber : "Pending/InActive"}
                            </IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </>
                    ) : (
                      <></>
                    )}

                    <IonItem>
                      {cardNumber ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <IonInput
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
                          ></IonInput>
                        </>
                      )}
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
                    id="present-alert"
                  >
                    Top Up
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

export default AddAmountPage;
