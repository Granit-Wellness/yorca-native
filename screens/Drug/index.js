import React from "react";
import { ScrollView, Linking, View, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { Avatar, Card } from "react-native-elements";

import gql from "graphql-tag";

const query = gql`
  query Drug($id: ID!) {
    drug(id: $id) {
      id
      name
      description
      avatarUri
      externalResourceUrl
      aliases
      healthRisks
      effects
    }
  }
`;

export default function Drug({ route }) {
  const { id } = route.params;
  const { data = {}, loading } = useQuery(query, { variables: { id } });

  if (loading) {
    return null;
  }

  const drug = data.drug || {};

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <Avatar rounded size="large" source={{ uri: drug.avatarUri }} />
        <View style={{ width: "60%", marginLeft: 20 }}>
          <Text style={{ fontSize: 24 }}>{drug.name}</Text>
          <View
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {drug.aliases.map((alias, idx) => {
              if (idx === drug.aliases.length - 1) {
                return <Text>{alias}</Text>;
              } else {
                return <Text>{alias}, </Text>;
              }
            })}
          </View>
        </View>
      </View>
      <View>
        <Card title={"Description"}>
          <Text>{drug.description}</Text>
        </Card>
        <Card title={"Effects"}>
          {drug.effects.map((effect) => (
            <Text>* {effect}</Text>
          ))}
        </Card>
        <Card title={"Health Risks"}>
          {drug.healthRisks.map((risk) => (
            <Text>* {risk}</Text>
          ))}
        </Card>
      </View>
      <View>
        <View>
          <Text
            style={{
              marginTop: 20,
              alignSelf: "center",
              color: "blue",
              fontSize: 18,
            }}
            onPress={() => Linking.openURL(drug.externalResourceUrl)}
          >
            Check out the NIDA for more information
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
