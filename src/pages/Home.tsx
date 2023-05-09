import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonFooter,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

const Home: React.FC = () => {
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
      <ExploreContainer />
      {/* <IonContent fullscreen>
        <IonHeader collapse="condense">
        <IonRow class="ion-align-items-center">
          <IonCol size="6" > <img src="fab.png"/></IonCol>
          <IonCol size="6" ><a href="javascript:void(0);"> عربى </a></IonCol>
        </IonRow>
        </IonHeader>
        <ExploreContainer />
      </IonContent> */}

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

export default Home;
