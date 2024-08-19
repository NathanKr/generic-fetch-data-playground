<h2>Motivation</h2>
fetching data from the server is on button click or page load is a common task which involve :
<ul>
<li>perform http request to the server using fetch \ axios</li>
<li>showing spinner</li>
<li>showing error</li>
<li>showing success</li>
<li>showing the data we got from the server</li>
</ul>

<p>This can happen in few pages and few applications so a generic solution can help and this is what this repository is all about</p>

<h2>Design</h2>
The design is composed of logic and ui via few layers

<h3>logic : fetchDataEngine</h3>
<p>This function fetch the data from the server and call setData, setError , setIsLoading accordingly</p>
<p>You need to call this function either on button click or page load via useEffect</p>

```ts

function fetchDataEngine<DataType, QueryParamsType>(
  url: string,
  params: QueryParamsType | null,
  validate: ((data: DataType) => IValidationResult) | null,
  setData: (data: DataType) => void,
  setError: (error: MainErrors | null) => void,
  setIsLoading: (isLoading: boolean) => void
) 
```

<h3>ui : FetchDataGen</h3>
This is a compontent that display error , spinner , success. its props are

```ts
  data: DataType | null;
  error: MainErrors | null;
  isLoading: boolean;
  successComponent: ReactElement;
  errorComponent: ReactElement;
  loadingComponent: ReactElement;
```


<h3>logic : useFetchState</h3>
this is a custom hook to avoid using few states and return IFetchState<DataType>


<h3>Interfaces</h3>

```ts

 interface IFetchBase<DataType> {
  data: DataType | null;
  error: MainErrors | null;
  isLoading: boolean;
}

 interface IFetchState<DataType> extends IFetchBase<DataType> {
  setData: (data: DataType | null) => void;
  setError: (error: MainErrors | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

 interface IFetchDataGenProps<DataType> extends IFetchBase<DataType> {
  successComponent: ReactElement;
  errorComponent: ReactElement;
  loadingComponent: ReactElement;
}

 interface IFetchDataParams<DataType, QueryParamsType>
  extends IFetchState<DataType> {
  url: string;
  params: QueryParamsType | null;
  validate: ((data: DataType) => IValidationResult) | null;
}

```

<h2>Usage</h2>

```ts
function SampleClickBased() {
  const {
    data: todos,
    error,
    isLoading,
    setData: setTodos,
    setError,
    setIsLoading,
  } = useFetchState<Todo[]>();

  return (
    <div>
      <button
        onClick={() => {
          const url = "https://jsonplaceholder.typicode.com/todos",
            params = null,
            validate = null;
          fetchDataEngine(
            url,
            params,
            validate,
            setTodos,
            setError,
            setIsLoading
          );
        }}
      >
        Get jsonplaceholder todo num
      </button>
      {<FetchDataDefault data={todos} error={error} isLoading={isLoading} />}

      {todos && <p>num todos : {todos ? todos.length : "..."}</p>}
    </div>
  );
}
```
