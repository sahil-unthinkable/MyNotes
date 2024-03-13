import React, { useState } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonTextarea,
  IonButton,
  IonNav,
  IonPage,
} from "@ionic/react";
import { addNewNote } from "../../db/utilities";

type Props = {};

function AddEditNote(props: any) {
  const [note, setNote] = useState<string>("");

  const handleInputChange = (e: Event) => {
    setNote((e.target as HTMLInputElement).value);
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(note);
    await addNewNote(note);
    props.history.goBack();
  };

  console.log(props);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Add/Edit Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <form onSubmit={handleFormSubmit}>
          <IonTextarea
            fill="outline"
            label="Note"
            labelPlacement="floating"
            placeholder="Enter Some Text"
            autoGrow={true}
            rows={20}
            value={note}
            onIonInput={handleInputChange}
            required
          ></IonTextarea>
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Save
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default AddEditNote;
