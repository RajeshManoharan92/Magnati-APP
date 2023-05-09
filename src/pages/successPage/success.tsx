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

import "./success.css";

interface SuccessProps {}

const Success: React.FC<SuccessProps> = () => {
  const Navigate = useHistory();

  let initialized = false;

  const [array, setarray] = useState<any>([]);

  const [otp, setotp] = useState<any>();

  const [disabled, setdisabled] = useState<any>(true);

  const [otpdisabled, setotpdisabled] = useState<any>(true);

  // useIonViewWillEnter(() => {
  //   effect();
  // }, []);

  // const effect = async () => {
  //   if (!initialized) {
  //     initialized = true;
  //     // My actual effect logic...
  //     await axios
  //       .get("https://jsonplaceholder.typicode.com/posts")
  //       .then((res) => setarray(res.data));
  //   }
  // };

  var initialValues = {
    email: "",
    otp: "",
    userId: "",
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
    const userId = localStorage.getItem("userId");

    await axios
      .post("http://192.168.0.132:8000/getUserStatus", {
        userId: userId,
      })
      .then((res) => {
        console.log(res.data, "data");
        Navigate.push("/userHomePage");
        presentToast("top");
        setdisabled(true);
        setotp("");
        reset();
        // presentToast("top");
      })
      .catch((err) => console.log(err));
    // Navigate.push("/userHomePage");

    // setotpdisabled(false)
  };

  const [present] = useIonToast();

  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Login Successfull",
      duration: 3000,
      position: position,
      color: "primary",
    });
  };

  const sendOTP = () => {
    // console.log(Math.floor(100000 + Math.random() * 900000));
    const userId = localStorage.getItem("userId");
    console.log(userId, "userId");
    const val = Math.floor(100000 + Math.random() * 900000);
    const newotp = val.toString();
    console.log(newotp, "iv");
    setotp(newotp);
    setValue("userId", userId);
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
                <IonCardTitle>Login</IonCardTitle>
              </IonCardHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <IonCardContent>
                  <IonList>
                  <IonItem>
                        <IonInput
                          label="Email"
                          labelPlacement="stacked"
                          type="email"
                          clearInput={true}
                          placeholder="Enter Email "
                          onIonInput={() => inputChange("email")}
                          // value={formvalue.email}
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                              message: "Please Enter Valid Email Id",
                            },
                          })}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.email?.message}</p>
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
                    Login
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

export default Success;
