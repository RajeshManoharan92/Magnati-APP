import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import "./register.css";
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
  IonIcon
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
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


interface UserDetailsPageProps {}

const UserDetailsPage: React.FC<UserDetailsPageProps> = () => {
  const Navigate = useHistory();

  let initialized = false;

  const [status, setstatus] = useState<any>(false);
  const [activateButton, setactivateButton] = useState<any>(true);
  const [counter, setcounter] = useState<any>(0);

  const [otp, setotp] = useState<any>();

  const [disabled, setdisabled] = useState<any>(true);

  const [otpdisabled, setotpdisabled] = useState<any>(true);

  var initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    cardNumber: "",
    status: "",
    amount: "",
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
  }, [counter]);

  const effect = async () => {
    const userId = localStorage.getItem("userId");
    if (!initialized) {
      initialized = true;
      // My actual effect logic...
      await axios
        .post("http://192.168.0.132:8000/getUserStatus", {
          userId: userId,
        })
        .then((res) => {
          console.log(res.data, "useeffect");
          setValue("email", res.data.email);
          setValue("firstName", res.data.firstName);
          setValue("lastName", res.data.lastName);
          setValue("middleName", res.data.middleName);
          setValue("mobile", res.data.mobile);
          setValue("status", res.data.status);
          setValue("amount", res.data.amount);
          setValue(
            "cardNumber",
            res.data.cardNumbers[0]?.cardNumber
              ? res.data.cardNumbers[0]?.cardNumber
              : ""
          );
          setactivateButton(res.data.status == "Active" ? false : true);
          setstatus(res.data.status == "Active" ? true : false);
        });
    }
  };

  // console.log(array, "array");

  //   useIonViewWillEnter(() => {
  //       axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>console.log(res))

  // });

  const onSubmit = async (data: any) => {
    console.log(data, "data");
    await axios
      .post("http://192.168.0.132:8000/customerOnboarding")
      .then((res) => {
        console.log(res.data, "data");
        reset();
        Navigate.push("/");
        presentToast("top");
      })
      .catch((err) => console.log(err));
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
    setotp(Math.floor(100000 + Math.random() * 900000));
    // initialValues.otp = val.toString();
    // console.log(initialValues.otp, "iv");
    setdisabled(false);
    setotpdisabled(true);
  };

  const inputChange = (fieldname) => {
    clearErrors([fieldname]);
    setotp("");
    setdisabled(true);
    setotpdisabled(false);
  };

  const activateUser = async () => {
    const userId = localStorage.getItem("userId");
    await axios
      .post("http://192.168.0.132:8000/createCard", {
        userId: userId,
      })
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == "Success") {
          setstatus(true);
          setcounter(counter+1)
        }
      })
      .catch((err) => console.log(err, "err"));
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
                  <IonCardTitle>User Details</IonCardTitle>
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
                          onIonInput={() => inputChange("firstName")}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.firstName?.message}</p>
                      <IonItem>
                        <IonInput
                          label="Middle Name"
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder="Enter Middle Name"
                          onIonInput={() => inputChange("middleName")}
                          // value={formvalue.lastName}
                          {...register("middleName", {
                            required: "Middle Name is required",
                            // maxLength: {
                            //   value: 4,
                            //   message: "must be four characters",
                            // },
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
                          onIonInput={() => inputChange("lastName")}
                          // value={formvalue.lastName}
                          {...register("lastName", {
                            required: "Last Name is required",
                            // maxLength: {
                            //   value: 10,
                            //   message: "must be four characters",
                            // },
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
                          label="Mobile Number"
                          labelPlacement="stacked"
                          type="number"
                          clearInput={true}
                          placeholder="Enter Mobile Number"
                          onIonInput={() => inputChange("mobile")}
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
                          label="Status"
                          labelPlacement="stacked"
                          clearInput={true}
                          placeholder=""
                          onIonInput={() => setdisabled(true)}
                          {...register("status", {
                            required: "Stauts is Required",
                            // maxLength: {
                            //   value: 6,
                            //   message: "Enter six Numbers",
                            // },
                          })}
                        ></IonInput>
                      </IonItem>
                      <p>{errors.status?.message}</p>

                      {status ? (
                        <>
                          <IonItem>
                            <IonInput
                              label="Card Number"
                              labelPlacement="stacked"
                              clearInput={true}
                              placeholder=""
                              onIonInput={() => setdisabled(true)}
                              {...register("cardNumber", {
                                required: "OTP is Required",
                                // maxLength: {
                                //   value: 6,
                                //   message: "Enter six Numbers",
                                // },
                              })}
                            ></IonInput>
                          </IonItem>
                          <p>{errors.cardNumber?.message}</p>

                          
                        </>
                      ) : (
                        <></>
                      )}
                    </IonList>

                    {/* {status ? (
                      <>
                        <IonButton
                          // onClick={() => sendOTP()}
                          // disabled={otpdisabled}
                          routerLink="/addAmount"
                          routerDirection="none"
                        >
                          Add Amount
                        </IonButton>
                        <IonButton
                          // type="submit"
                          // disabled={disabled}
                          routerLink="/withdrawAmount"
                          routerDirection="none"
                        >
                          Withdraw Amount
                        </IonButton>
                      </>
                    ) : (
                      <></>
                    )} */}

                    {/* {activateButton ? (
                      <>
                        <IonButton
                          // type="submit"
                          // disabled={disabled}
                          onClick={() => activateUser()}
                          routerDirection="none"
                        >
                          Activate User
                        </IonButton>
                      </>
                    ) : (
                      <></>
                    )} */}
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
    </div>
  );
};

export default UserDetailsPage;
