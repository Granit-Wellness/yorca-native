import { useLinking } from "@react-navigation/native";
import { Linking } from "expo";

export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl("/")],
    config: {
      Root: {
        path: "root",
        screens: {
          Drugs: "drugs",
          Blog: "blog",
          Resources: "resources",
          Settings: "settings",
        },
      },
      Drug: {
        path: "drug",
        screens: {
          Drug: "drugs/:id",
        },
      },
    },
  });
}
