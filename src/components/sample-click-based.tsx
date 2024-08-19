import { Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import UiFetchData from "./fetch-utils/ui-fetch-data";
import { getData } from "./fetch-utils/fetch-data";
import { MainErrors } from "../types/main-errors";

function SampleClickBased() {
  const [todos, setTodos] = useState<any[] | null>(null);
  const [error, setError] = useState<MainErrors | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          const url = "https://jsonplaceholder.typicode.com/todos",
            params = null,
            validate = null;
          getData(url, params, validate, setTodos, setError, setIsLoading);
        }}
      >
        Get jsonplaceholder todo num
      </button>
      {
        <UiFetchData
          data={todos}
          error={error}
          isLoading={isLoading}
          successComponent={
            <Alert severity="success">
              This is an auccess alert — check it out!
            </Alert>
          }
          loadingComponent={
            <>
              Loading ...
              <CircularProgress />
            </>
          }
          errorComponent={
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          }
        />
      }

      <p>num todos : {todos ? todos.length : "..."}</p>
    </div>
  );
}

export default SampleClickBased;