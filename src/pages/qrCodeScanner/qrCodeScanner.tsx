import { 
    IonContent, 
    IonInput, 
    IonButton, 
    IonItem, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar } from '@ionic/react';
  import React, { useState } from 'react';
//   import './Home.css';
  import { BarcodeScanner } from '@ionic-native/barcode-scanner';

  interface QrCodeScannerPageProps {}

  const QrCodeScanner: React.FC<QrCodeScannerPageProps> = () => {
   const [state,setState] = useState( {
      stringEncoded: '',
      encodeResponse: 'Hello World',
      dataEncode: ''
    })
    const handleChange = (e: any) => {
      const { value, name } = e.target;
      setState({[name]: value }
      );
      console.log(state);
    };
    
      const dataToScan = async () => {
        const data = await BarcodeScanner.scan();
        alert(JSON.stringify(data));
        setState({ stringEncoded: data.text })
      };
      const createCode = () => {
        BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, state.encodeResponse)
          .then(data => {
            console.log(data);
          }, error => {
            console.log("Error : " + error);
          });
      };
  
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Ionic QR/Barcode Scanner Example</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <strong>Scan Content</strong>
            <IonButton color="danger" expand="block" onClick={()=>dataToScan()}>
                Scan Data 
            </IonButton>
            <strong>Generate QR code</strong>
            <IonItem>
              <IonInput name='dataEncode' value={state.encodeResponse} onIonChange={(e)=>handleChange(e)} clearInput></IonInput>
            </IonItem>
            <IonButton color="primary" expand="block" onClick={()=>createCode()}>
              Generate QR
            </IonButton>
          </IonContent>
        </IonPage >
      );
    
  };
  export default QrCodeScanner;