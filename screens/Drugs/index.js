import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Icon } from "react-native-elements";
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

export default function Drugs({ navigation }) {
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
          {drugs.map((drug) => (
            <ListItem
              leftAvatar={{
                rounded: true,
                source: { uri: drug.avatarUri },
              }}
              onPress={() =>
                navigation.navigate("Drug", {
                  id: drug.id,
                })
              }
              titleStyle={styles.listTitle}
              key={drug.id}
              title={drug.name}
              bottomDivider
              chevron={<Icon name="chevron-right" size={24} />}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

Drugs.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  contentContainer: {
    paddingTop: 0,
  },

  listTitle: {
    marginLeft: 8,
  },
});
