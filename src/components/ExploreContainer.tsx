import "./ExploreContainer.css";
import {
  IonCol,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonText,
} from "@ionic/react";
interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <IonGrid>
        <IonRow class="ion-justify-content-center ion-align-items-center">
          <IonCol >
            <IonRow>
              <IonCol size="12" className="heading1">
                Online Banking
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" className="heading2">
                Welcome to Magnati
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol >
            <IonCard>
              {/* <IonCardTitle>NOT REGISTER FOR ONLINE BANKING?</IonCardTitle> */}
              {/* <IonCardSubtitle></IonCardSubtitle> */}

              <IonRow>
              <IonCol size="12">
              <IonText>
                <h1>NOT REGISTERED FOR ONLINE BANKING?</h1>
              </IonText>
              </IonCol>
            </IonRow>

            <IonRow class="ion-justify-content-center ion-align-items-center">
              <IonCol size="12" size-md="8" size-lg="4">
              <IonButton routerLink="/register" expand="block">
                REGISTER NOW
              </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
              <IonText>
                <h1>Already Registerd User?</h1>
              </IonText>
              </IonCol>
            </IonRow>
             
            <IonRow class="ion-justify-content-center ion-align-items-center">
              <IonCol size="12" size-md="8" size-lg="4">
              <IonButton routerLink="/login" expand="block">
                Login
              </IonButton>
              </IonCol>
            </IonRow>
              
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ExploreContainer;
