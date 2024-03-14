import {
  IonApp,
  IonSpinner,
  setupIonicReact,
} from "@ionic/react";

import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";
import sqliteParams from "./db/sqliteParams";
import noteDataSource from "./db/datasources/noteDataSource";
import Notes from "./pages/notes";
import { useEffect, useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import AddEditNote from "./pages/addEditNote";

customElements.define("jeep-sqlite", JeepSqlite);

const initializeDataSources = async () => {
  //check sqlite connections consistency
  await sqliteParams.connection.checkConnectionsConsistency().catch((e) => {
    console.log(e);
    return {};
  });

  // Loop through the DataSources
  for (const mDataSource of [noteDataSource]) {
    // initialize
    await mDataSource.dataSource.initialize();
    if (mDataSource.dataSource.isInitialized) {
      // run the migrations
      await mDataSource.dataSource.runMigrations();
    }
    if (sqliteParams.platform === "web") {
      await sqliteParams.connection.saveToStore(mDataSource.dbName);
    }
  }
};

setupIonicReact();

const App: React.FC = () => {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      if (sqliteParams.platform !== "web") {
        await initializeDataSources();
        setDbInitialized(true);
      } else {
        const jeepEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepEl);
        customElements
          .whenDefined("jeep-sqlite")
          .then(async () => {
            await sqliteParams.connection.initWebStore();
            await initializeDataSources();
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
            throw new Error(`Error: ${err}`);
          })
          .finally(() => {
            setDbInitialized(true);
          });
      }
    })();
  }, []);

  if (!dbInitialized) {
    return <IonSpinner name="dots" />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/" component={Notes} />
        <Route path="/note" component={AddEditNote} />
        <Route path="/note/:id" component={AddEditNote} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
