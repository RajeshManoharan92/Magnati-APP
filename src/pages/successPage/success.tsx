
import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonFooter,
    IonCard,
    IonText,
    IonButton,
  } from "@ionic/react";
  
  import "./success.css";

  interface SuccessProps {}
  
  const Success: React.FC<SuccessProps> = () => {
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
       
      <IonCard>
        <IonText>Registeration Successfull</IonText>
      </IonCard>

      <IonButton routerLink="/" routerDirection="none">Home</IonButton>
  
        <IonFooter>
          <IonRow class="ion-align-items-center">
            <IonCol size="12">
              {" "}
              Copyright (c) 2023 First Abu Dhabi Bank. All Rights Reserved.
            </IonCol>
          </IonRow>
        </IonFooter>
      </IonPage>
    );
  };
  
  export default Success;
  