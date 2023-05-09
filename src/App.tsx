import React from "react";
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Register from "./pages/registerPage/Register"
import Success from "./pages/successPage/success";
import UserDetailsPage from "./pages/userDetailsPage/userDetailsPage";
import AddAmountPage from "./pages/addAmountPage/addAmountPage";
import AmountWithdraw from "./pages/withDrawAmount/withDrawAmount";
import QrCodeScanner from "./pages/qrCodeScanner/qrCodeScanner";
import UserHomePage from "./pages/userHomePage/userHomePage";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import TransactionHistoryPage from "./pages/login/transactionPage/transactionPage";
import RegisterOTP from "./pages/OTPPage/otppage";
// import QrCodeScanner from "./pages/qrCodeScanner/qrCodeScanner";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet animated="false">
        <Route exact path="/" component={Home} />
        {/* <Redirect exact from="/" to="/" /> */}
        
        <Route exact path="/register" component={Register} />
        {/* <Redirect exact from="/register" to="/register" /> */}

        <Route exact path="/success" component={Success} />
        
        <Route exact path="/login" component={Success} />

        <Route exact path="/Userpage" component={UserDetailsPage} />

        <Route exact path="/addAmount" component={AddAmountPage} />

        <Route exact path="/withdrawAmount" component={AmountWithdraw} />
        <Route exact path="/userHomePage" component={UserHomePage} />
        <Route exact path="/transactionHistory" component={TransactionHistoryPage} />

        <Route exact path="/registerOTP" component={RegisterOTP} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
