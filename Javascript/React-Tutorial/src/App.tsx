import { useState } from "react";
import Message from "./Message";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  let items = ["New York", "San Francisco", "London", "Taipei", "Paris"];

  const [alert, setAlert] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const onClick = () => {
    console.log("Clicked");
    setAlert(true);
  };

  const close = () => {
    setAlert(false);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      <p />
      {alert && (
        <Alert onClick={close}>
          Hello <span>World</span>
        </Alert>
      )}
      <p />
      <Button color="success" onClick={onClick} alertOpen={alert}>
        Click me!
      </Button>
    </div>
  );
}

export default App;
