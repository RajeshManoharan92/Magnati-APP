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
  IonText,
  IonLabel,
  IonIcon

} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
// import "./userHomePage.css";
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

interface TransactionHistoryPageProps {}

const TransactionHistoryPage: React.FC<TransactionHistoryPageProps> = () => {
  const Navigate = useHistory();

  let initialized = false;

  const [array, setarray] = useState<any>([]);

  const [otp, setotp] = useState<any>();

  const [disabled, setdisabled] = useState<any>(true);

  const [otpdisabled, setotpdisabled] = useState<any>(true);

  useIonViewWillEnter(() => {
    effect();
  }, []);

  const effect = async () => {
    const userId = localStorage.getItem("userId");
    if (!initialized) {
      initialized = true;
      // My actual effect logic...
      await axios
        .post("http://192.168.0.132:8000/transactionHistory", {
          userId: userId,
        })
        .then((res) => {
          console.log(res.data);
          const reverse = res.data.reverse();
          console.log(reverse, "Reversse");
          setarray(reverse);
        });
    }
  };

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

  const onSubmit = async (data: any) => {
    console.log(data, "data");
    await axios
      .post("http://192.168.0.132:8000/addFund", {
        cardNumber: data.cardNumber ? data.cardNumber : "",
        amount: data.amount ? data.amount : "",
      })
      .then((res) => {
        console.log(res, "res");
        reset();
        Navigate.push("/Userpage");
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

  const openModal = () => {};

  const arrayReverse = array.reverse();

  console.log(arrayReverse, "arrayrev");

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

      <IonContent
        class="ion-align-items-center ion-justify-content-center "
        scrollbar="true"
      >
        {/* <IonRow> */}
        {/* <IonCol>Welcome Rajesh</IonCol> */}
        {/* </IonRow>
        <IonRow class="ion-align-items-center ion-justify-content-center ">
          <IonRow style={{"border":"1px solid black"}} className="tableheader">
            <IonCol style={{"border":"1px solid black"}} className="col">Date</IonCol>
            <IonCol style={{"border":"1px solid black"}} className="col">Amount</IonCol>
            <IonCol style={{"border":"1px solid black"}} className="col"> Transaction Type</IonCol>
            <IonCol style={{"border":"1px solid black"}} className="col">More info</IonCol>
          </IonRow> */}
<IonCard>
        {arrayReverse.length > 0 ? (
          <>
            {arrayReverse.map((data: any) => {
              return (
                <>
                
                  <IonList lines="full">
                    <IonItem>
                    
                      <IonRow style={{"padding":"10px"}}>
        
                        <IonRow >
                          {data.transactionType == "DR" ? (
                            <>
                              <IonCol style={{ color: "red" }}>
                                {data.transactionType}
                              </IonCol>
                            </>
                          ) : (
                            <>
                              <IonCol style={{ color: "green" }}>
                                {data.transactionType}
                              </IonCol>
                            </>
                          )}
                        </IonRow>{" "}
                        <br></br>
                        <IonRow>
                          <IonCol>
                            <span style={{ color: "#106cf8" }}>Date</span>
                            :&nbsp;{data.createdDate}
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <span style={{ color: "#106cf8" }}>
                              {" "}
                              Current Balance{" "}
                            </span>
                            :&nbsp;{data.currentBalance} AED
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <span style={{ color: "#106cf8" }}>
                              {" "}
                              Previous Balance{" "}
                            </span>{" "}
                            :&nbsp;{data.previousBalance} AED
                          </IonCol>
                        </IonRow>
                        {data.transactionType == "CR" ? (
                          <>
                            <IonRow>
                              <IonCol>
                                <span style={{ color: "#106cf8" }}>
                                  {" "}
                                  Transaction Amount{" "}
                                </span>{" "}
                                :&nbsp;
                                <span style={{ color: "green" }}>  {data.currentBalance - data.previousBalance} </span> AED
                              </IonCol>
                            </IonRow>
                          </>
                        ) : (
                          <>
                            <IonRow>
                              <IonCol>
                                <span style={{ color: "#106cf8" }}>
                                  {" "}
                                  Transaction Amount{" "}
                                </span>
                                :&nbsp;
                                <span style={{ color: "red" }}>{data.previousBalance - data.currentBalance}</span> AED
                              </IonCol>
                            </IonRow>
                          </>
                        )}
                      </IonRow>
                    </IonItem>
                  </IonList>

                  {/* <IonCard>
                    <IonCardContent style={{ padding: "0px" }}>
                     
                    </IonCardContent>
                  </IonCard> */}
                </>
              );
            })}
          </>
        ) : (
          <>
            <IonRow class="ion-align-items-center ion-justify-content-center ">
              <h6>No Transaction History</h6>
            </IonRow>
          </>
        )}
        {/* </IonRow> */}
        </IonCard>
      </IonContent>

      <IonFooter>
      <IonRow>
          <IonCol><IonIcon
                    className="tabicon"
                    color="primary"
                    icon={arrowBackOutline}
                    onClick={()=>Navigate.goBack()}
                  ></IonIcon></IonCol>
          <IonCol><IonIcon
                    className="tabicon"
                    color="primary"
                    icon={homeOutline}
                    onClick={()=>Navigate.push("/userHomePage")}

                  ></IonIcon></IonCol>
          <IonCol><IonIcon
                    className="tabicon"
                    color="primary"
                    icon={logOutOutline}
                    onClick={() => {
                      localStorage.clear();
                      Navigate.push("/");
                    }}

                  ></IonIcon></IonCol>
          <IonCol><IonIcon
                    className="tabicon"
                    color="primary"
                    icon={arrowForwardOutline}
                    onClick={()=>Navigate.goForward()}

                  ></IonIcon></IonCol>
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

export default TransactionHistoryPage;
