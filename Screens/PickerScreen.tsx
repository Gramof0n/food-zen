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

  let myUsers = this.state.userValues.map((myValue, myIndex) => {
    return (
      <Picker.Item
        label={myValue.name + " - " + myValue.username}
        value={myIndex}
        key={myIndex}
      />
    );
  });

  useEffect(() => {
    this.GetFakeData;
  }, []);

  return (
    <View>
      <Picker
        selectedValue={this.state.selectedValue}
        onValueChange={(value) => this.setState({ selectedValue: value })}
      >
        {myUsers}
      </Picker>
    </View>
  );
};

//ZADNJE NAPRAVLJENO USEEFFECT METODA KOJA JE ZAMJENA INACE ZA COMPONENTDIDMOUNT
//PROVJERI JEL MOZE U USEEFFECT SE DAT CITAV DIO KODA IZ METODE GETFAKEDATA A NE OVAKO NAKARADNO

export default PickerScreen;
