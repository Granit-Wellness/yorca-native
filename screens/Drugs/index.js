import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

const query = gql`
  query Drugs {
    drugs {
      id
      name
      description
      avatarUri
    }
  }
`;

export default function Drugs() {
  const { data = {}, loading } = useQuery(query);

  if (loading) {
    return null;
  }

  const drugs = data.drugs || [];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          {drugs.map(drug => (
            <ListItem
              leftAvatar={{
                rounded: true,
                source: { uri: drug.avatarUri }
              }}
              titleStyle={styles.listTitle}
              key={drug.id}
              title={drug.name}
              bottomDivider
              chevron
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

Drugs.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  contentContainer: {
    paddingTop: 0
  },

  listTitle: {
    marginLeft: 8
  }
});
