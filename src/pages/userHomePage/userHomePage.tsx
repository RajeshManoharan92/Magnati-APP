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
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonicSlides,
  IonImg,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import "./userHomePage.css";
import { IonIcon } from "@ionic/react";
import {
  arrowBackOutline,
  arrowForwardOutline,
  cardOutline,
  homeOutline,
  listCircleOutline,
  logoIonic,
  logOutOutline,
  personOutline,
  scanOutline,
  walletOutline,
} from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from "swiper";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
// import "./success.css";

interface UserHomePageProps {}

const UserHomePage: React.FC<UserHomePageProps> = () => {
  const Navigate = useHistory();

  let initialized = false;

  const [array, setarray] = useState<any>([]);

  const [otp, setotp] = useState<any>();

  const [disabled, setdisabled] = useState<any>(true);

  const [otpdisabled, setotpdisabled] = useState<any>(true);

  const [name, setname] = useState<any>();
  const [availabeamount, setavailableamount] = useState<any>();

  const [counter, setcounter] = useState<any>(0);
  const [cardNumber, setcardNumber] = useState<any>();

  useEffect(() => {
    effect();
  }, [counter]);

  const effect = async () => {
    const userId = localStorage.getItem("userId");
    if (!initialized) {
      initialized = true;
      // My actual effect logic...
      await axios
        .post("http://192.168.0.132:8000/getUserStatus", {
          userId: userId ? userId : "",
        })
        .then(async (res) => {
          console.log(res.data, "homedata");
          await setname(res.data.firstName);
          localStorage.setItem(
            "cardNumber",
            res.data.cardNumbers[0]?.cardNumber
              ? res.data.cardNumbers[0]?.cardNumber
              : ""
          );
          await setcardNumber(res.data.cardNumbers[0].cardNumber);
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

  const dataToScan = async () => {
    const data = await BarcodeScanner.scan();
    // alert(JSON.stringify(data));
    Navigate.push("/withdrawAmount");
    localStorage.setItem("scanamount", "5");
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

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      setcounter(counter + 1);
      event.detail.complete();
    }, 100);
  }

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
        <IonRefresher
          slot="fixed"
          pullFactor={0.5}
          pullMin={100}
          pullMax={200}
          onIonRefresh={handleRefresh}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonRow>
          <IonCol>
            <Swiper
              className="swiper"
              modules={[
                Autoplay,
                Keyboard,
                Pagination,
                Scrollbar,
                Zoom,
                IonicSlides,
              ]}
              autoplay={true}
              pagination={true}
            >
              <SwiperSlide>
                <IonImg src="./creditcard.jpg"></IonImg>
              </SwiperSlide>
              <SwiperSlide>
                <IonImg src="./onlinepayment.jpg"></IonImg>
              </SwiperSlide>
              {/* <SwiperSlide>Slide 3</SwiperSlide> */}
            </Swiper>
          </IonCol>
        </IonRow>

        <IonRow class="ion-align-items-center ion-justify-content-center ">
          <IonCol size="12" size-md="8" size-lg="6">
            <IonCard style={{ padding: "0px" }}>
              <IonCardContent>
                <IonRow class="ion-align-items-center ion-justify-content-center ">
                  <h1 style={{ fontWeight: "bold", color: "#106cf8" }}>
                    Welcome {name ? name : "User"}
                  </h1>{" "}
                </IonRow>
                <IonRow>
                  {/* <IonCol size="6">
                    <h2>Card Number- </h2>
                  </IonCol> */}
                  <IonCol size="12">
                    <IonSelect
                      label="Card Number"
                      labelPlacement="Floating label"
                      onIonChange={() => availabelBalance()}
                      placeholder="Select Card Number"
                      {...register("selectedCardNumber", {
                        required: "Card Number is required",
                      })}
                    >
                      <IonSelectOption value="apple">
                        {cardNumber ? cardNumber : "Pending/InActive"}
                      </IonSelectOption>
                    </IonSelect>
                    {/* <h2>{cardNumber ? cardNumber : "InActive"}</h2> */}
                  </IonCol>
                </IonRow>
                <IonRow class="ion-align-items-center ion-justify-content-start ">
                  <IonCol size="6" style={{ "text-align": "start" }}>
                    {" "}
                    <IonText>Available-balance</IonText>
                  </IonCol>
                  <IonCol size="6">
                    <h2>{availabeamount ? availabeamount : "0"} AED </h2>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center ion-justify-content-center ">
          <IonCol size="6" size-md="4" size-lg="3">
            <IonCard
              className="card ion-align-items-center ion-justify-content-center"
              onClick={() => dataToScan()}
              style={{ padding: "0" }}
            >
              <IonCardContent
                class="ion-align-items-center ion-justify-content-center"
                style={{ padding: "0" }}
              >
                <IonRow class="ion-align-items-center ion-justify-content-center">
                  <IonIcon
                    className="icon"
                    color="primary"
                    icon={scanOutline}
                  ></IonIcon>{" "}
                </IonRow>
                <IonRow class="ion-align-items-center ion-justify-content-center">
                  <IonText className="cardtext">Scan & Pay</IonText>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="6" size-md="4" size-lg="3">
            <IonCard
              className="card ion-align-items-center ion-justify-content-center"
              onClick={() => {
                Navigate.push("/addAmount");
              }}
            >
              <IonCardContent style={{ padding: "0" }}>
                <IonRow class="ion-align-items-center ion-justify-content-center">
                  <IonIcon
                    className="icon"
                    color="primary"
                    icon={walletOutline}
                  ></IonIcon>{" "}
                </IonRow>
                <IonRow class="ion-align-items-center ion-justify-content-center">
                  <IonText className="cardtext">Prepaid Top-Up</IonText>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center ion-justify-content-center ">
          <IonCol size="6" size-md="4" size-lg="3">
            <IonCard
              className="card ion-align-items-center ion-justify-content-center"
              onClick={() => {
                Navigate.push("/Userpage");
              }}
            >
              <IonCardContent style={{ padding: "0" }}>
                <IonRow class="ion-align-items-center ion-justify-content-center">
                  <IonIcon
                    className="icon"
                    color="primary"
                    icon={personOutline}
                  ></IonIcon>{" "}
                </IonRow>
                <IonRow class="ion-align-items-center ion-justify-content-center">
                  <IonText className="cardtext">User Details</IonText>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="6" size-md="4" size-lg="3">
            <IonCard
              className="card ion-align-items-center ion-justify-content-center"
              onClick={() => {
                Navigate.push("/transactionHistory");
              }}
            >
              <IonCardContent style={{ padding: "0" }}>
                <IonRow class="ion-align-items-center ion-justify-content-center">
                  <IonIcon
                    className="icon"
                    color="primary"
                    icon={listCircleOutline}
                  ></IonIcon>{" "}
                </IonRow>
                <IonRow class="ion-align-items-center ion-justify-content-center">
                  <IonText className="cardtext">Transaction History</IonText>
                </IonRow>
              </IonCardContent>
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

export default UserHomePage;
