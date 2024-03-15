import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logInOutline } from "ionicons/icons";
import { useAuth } from "../../context/auth";

const SignIn: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [name, setName] = useState<string>("");
  const { user, updateUser } = useAuth();

  const handleInputChange = (e: Event) => {
    setName((e.target as HTMLInputElement).value);
  };

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateUser({ name });
    props.history.replace("/");
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleLogin}>
          <IonInput
            label="Name"
            labelPlacement="floating"
            placeholder="Enter Your Name"
            fill="outline"
            value={name}
            onIonInput={handleInputChange}
            required
          ></IonInput>
          <IonButton type="submit" expand="block" className="ion-margin-top">
            Sign In <IonIcon icon={logInOutline}></IonIcon>
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
