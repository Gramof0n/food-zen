import React from "react";
import { Picker } from "react-native";
import { View } from "react-native";

const PickerScreen = () => {
  const [userValues, setUserValues] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState("");

  const GetFakeData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          userValues: json,
        });
      });
  };

  useEffect(() => {
    this.GetFakeData;
  }, []);
};

//ZADNJE NAPRAVLJENO USEEFFECT METODA KOJA JE ZAMJENA INACE ZA COMPONENTDIDMOUNT
//PROVJERI JEL MOZE U USEEFFECT SE DAT CITAV DIO KODA IZ METODE GETFAKEDATA A NE OVAKO NAKARADNO

export default PickerScreen;
