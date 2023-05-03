import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";
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

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const Navigate = useHistory();

  let initialized = false;

  const [array, setarray] = useState<any>([]);

  useIonViewWillEnter(() => {
    effect();
  }, []);

  const effect = async () => {
    if (!initialized) {
      initialized = true;
      // My actual effect logic...
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => setarray(res.data));
    }
  };

  // console.log(array, "array");

  //   useIonViewWillEnter(() => {
  //       axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>console.log(res))

  // });

  const initialValues = {
    firstName: "",
    middleName:"",
    lastName: "",
    email: "",
    mobile: "",
   otp: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = async (data: any) => {
    presentToast("top");
    console.log(data, "data");

    await axios
    .post("http://192.168.0.83:8000/customerOnboarding")
    .then((res) => console.log(res.data,"data")).catch((err)=>console.log(err));


    // Navigate.push("/");
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

  return (
    <div>
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
                  <IonCardTitle>Registration Form</IonCardTitle>
                </IonCardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonInput
                          label="First Name"
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder="Enter First Name"
                          // value={formvalue.firstName}
                          {...register("firstName", {
                            required: "First Name is required",
                          })}
                          onIonInput={() => clearErrors(["firstName"])}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.firstName?.message}</p>
                      <IonItem>
                        <IonInput
                          label="Middle Name"
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder="Enter Middle Name"
                          onIonInput={() => clearErrors(["middleName"])}
                          // value={formvalue.lastName}
                          {...register("middleName", {
                            required: "Middle Name is required",
                            maxLength: {
                              value: 4,
                              message: "must be four characters",
                            },
                          })}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.middleName?.message}</p>
                      <IonItem>
                        <IonInput
                          label="Last Name"
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder="Enter Last Name"
                          onIonInput={() => clearErrors(["lastName"])}
                          // value={formvalue.lastName}
                          {...register("lastName", {
                            required: "Last Name is required",
                            maxLength: {
                              value: 4,
                              message: "must be four characters",
                            },
                          })}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.lastName?.message}</p>
                      <IonItem>
                        <IonInput
                          label="Email Address"
                          labelPlacement="stacked"
                          type="email"
                          clearInput={true}
                          placeholder="Enter Email Address"
                          onIonInput={() => clearErrors(["email"])}
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
                          label="Mobile Number"
                          labelPlacement="stacked"
                          type="number"
                          clearInput={true}
                          placeholder="Enter Mobile Number"
                          onIonInput={() => clearErrors(["mobile"])}
                          {...register("mobile", {
                            required: "Mobile Number is required",
                            pattern: {
                              value:
                                /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
                              message: "Please Enter Valid Mobile Number",
                            },
                            maxLength: {
                              value: 10,
                              message: "Please Enter Valid Mobile Number",
                            },
                          })}

                          // value={formvalue.mobileNumber}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.mobile?.message}</p>
                      <IonItem>
                        <IonInput
                          label="OTP"
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder="Enter Country"
                          onIonInput={() => clearErrors(["otp"])}
                          {...register("otp", {
                            required: "Country is Required",
                            maxLength: {
                              value: 10,
                              message: "Enter Ten Numbers",
                            },
                          })}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.otp?.message}</p>
                    </IonList>
                    <IonButton type="submit" routerDirection="none">
                      REGISTER
                    </IonButton>
                  </IonCardContent>
                </form>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonContent>

        {/* <IonContent>
          {array?.length > 0
            ? array?.map((el: any, i: number) => {
                return (
                  <>
                    <ul key={i}>
                      <li>{el.title}</li>
                    </ul>
                  </>
                );
              })
            : ""}
        </IonContent> */}

        <IonFooter>
          <IonRow class="ion-align-items-center">
            <IonCol size="12">
              {" "}
              Copyright (c) 2023 First Abu Dhabi Bank. All Rights Reserved.
            </IonCol>
          </IonRow>
        </IonFooter>
      </IonPage>
    </div>
  );
};

export default Register;
