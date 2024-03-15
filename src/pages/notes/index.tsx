import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { getNotes } from "../../db/utilities";
import { Note } from "../../db/entities/note";
import { Camera, CameraResultType } from "@capacitor/camera";
import { logOutOutline } from "ionicons/icons";
import { useAuth } from "../../context/auth";

const Notes: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const imageRef = useRef<HTMLIonImgElement>(null);

  const { logout } = useAuth();

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    const imageUrl = image.webPath;
    if (imageRef.current) {
      imageRef.current.src = imageUrl;
    }
  };

  useEffect(() => {
    (async () => {
      const notesData = await getNotes();
      setNotes(notesData);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonButton expand="block" onClick={logout}>
          Sign Out <IonIcon icon={logOutOutline}></IonIcon>
        </IonButton>
        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={takePicture}
        >
          Take photo
        </IonButton>
        <IonImg ref={imageRef} className="ion-margin-top"></IonImg>
        <IonButton expand="block" routerLink="/note">
          Add Note
        </IonButton>
        <IonList className="ion-margin-top">
          {notes.map((note) => {
            return (
              <IonItem key={note.id}>
                <IonLabel>{note.content}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notes;
