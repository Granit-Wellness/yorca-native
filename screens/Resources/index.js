import React from "react";
import { Text, StyleSheet, Linking, ScrollView, View } from "react-native";
import { Avatar, Card } from "react-native-elements";

const RESOURCES = [
  {
    name: "Aegis Treatment Centers",
    addressOne: "109 Margaret Lane",
    addressTwo: "Grass Valley, CA 95945",
    phone: "530-863-8798",
    website: "https://aegistreatmentcenters.com/clinic/aegis-roseville/",
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/lLbBPgj3LuBFTV87eWJmIQ/o.jpg"
  },
  {
    name: "Granite Wellness Centers",
    addressOne: "180 Sierra College Drive",
    addressTwo: "Grass Valley, CA 95945",
    phone: "530-273-9541",
    website: "https://www.granitewellness.org/",
    image:
      "https://www.granitewellness.org/wp-content/themes/wsdg_responsive/images/gwc_logo_plum.png"
  },
  {
    name: "Common Goals Inc",
    addressOne: "159 Brentwood Drive",
    addressTwo: "Grass Valley, CA 95945",
    phone: "530-271-1140",
    website: "https://www.granitewellness.org/",
    image: "https://wp.commongoalsinc.org/"
  }
];

export default () => {
  return (
    <ScrollView style={styles.container}>
      {RESOURCES.map((resource, idx) => (
        <Card key={idx} style={styles.slide}>
          <View style={styles.header}>
            <Avatar rounded size={"medium"} source={{ uri: resource.image }} />
            <Text style={styles.title}>{resource.name}</Text>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.info}>{resource.addressOne}</Text>
            <Text style={styles.info}>{resource.addressTwo}</Text>
          </View>
          <Text style={styles.phoneNumber}>{resource.phone}</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(resource.website)}
          >
            More info here
          </Text>
        </Card>
      ))}
      <Card>
        <Text
          style={styles.resourcesLink}
          onPress={() =>
            Linking.openURL("https://findtreatment.samhsa.gov/locator")
          }
        >
          For more resources near you, click here!
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },

  resourcesLink: {
    fontSize: 18,
    color: "blue"
  },

  image: {
    height: "%"
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  title: {
    fontSize: 24,
    paddingLeft: 5
  },

  addressContainer: {
    marginTop: 5
  },

  info: {
    fontSize: 18
  },

  link: {
    fontSize: 18,
    paddingBottom: 5,
    paddingTop: 5,
    color: "blue"
  },

  phoneNumber: {
    fontSize: 18,
    marginTop: 5
  }
});
