import { render } from "@testing-library/react";
import Map from "../Map";

const activities = [
  {
    "activity name": "Walking Tour of Gothic Quarter",
    duration: "09:00-13:00",
    address: "Carrer de Fernández y González, 7, 08002 Barcelona,",
  },
  {
    "activity name": "Visit Sagrada Familia",
    duration: "13:00-17:00",
    address: "Carrer de Mallorca, 401, 08013 Barcelona,",
  },
  {
    "activity name": "Tibidabo Amusement Park",
    duration: "17:00-22:00",
    address: "Travessera de Dalt, s/n, 08035 Barcelona,",
  },
];

it("renders correctly", () => {
  // const component = render(<Map activities={activities} />);
  // expect(component).toMatchSnapshot();
});
