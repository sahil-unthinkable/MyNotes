import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonHeader,
  IonContent,
  IonNavLink,
  IonToolbar,
  IonTitle,
  IonRouterLink,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";

import AddEditNote from "../addEditNote";
import { getNotes } from "../../db/utilities";
import { Note } from "../../db/entities/note";

type Props = {};

function Notes(props: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    (async () => {
      const notesData = await getNotes();
      console.log("Get Notes");
      setNotes(notesData);
    })();
  }, []);

  console.log(notes);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonButton routerLink="/note">Add Note</IonButton>
        <IonList>
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
}

export default Notes;
