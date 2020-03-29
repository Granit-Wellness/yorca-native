import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import TimeAgo from "react-native-timeago";

import gql from "graphql-tag";

const BODY_LENGTH = 150;

const truncateBody = text => {
  return text.slice(0, BODY_LENGTH) + "...";
};

const query = gql`
  query Blog {
    posts {
      id
      title
      body
      user {
        id
        avatarUri
        annonymousName
      }
      createdAt
    }
  }
`;

export default function Blog() {
  const { data = {}, loading } = useQuery(query);

  if (loading) {
    return null;
  }

  const posts = data.posts || [];

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.splash}
      >
        <Icon name="format-quote" size={36} color="#ffff" />
      </LinearGradient>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.postList}>
          {posts.map(post => {
            const body =
              post.body.length <= BODY_LENGTH
                ? post.body
                : truncateBody(post.body);

            return (
              <View key={post.id} style={styles.postContainer}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postBody}>{body}</Text>
                <View style={styles.userDetail}>
                  <Image
                    source={post.user.avatarUri}
                    style={styles.userAvatar}
                  />
                  <View>
                    <Text style={styles.postUserName}>
                      {post.user.annonymousName}
                    </Text>
                    <TimeAgo style={styles.postTime} time={post.createdAt} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

Blog.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  contentContainer: {
    padding: 0
  },

  postList: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16
  },

  postTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 10
  },

  postContainer: {
    marginBottom: 20
  },

  splash: {
    height: 140,
    borderBottomColor: "#E1E9F0",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    display: "flex",
    justifyContent: "center"
  },

  postBody: {
    color: "rgba(0,0,0,.54)"
  },

  postUserName: {
    color: "rgba(0,0,0,.84)",
    fontWeight: "400",
    fontSize: 15
  },

  postTime: {
    color: "rgba(0,0,0,.54)",
    fontSize: 15,
    fontWeight: "400"
  },

  userDetail: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  userAvatar: {
    marginRight: 8,
    height: 36,
    width: 36,
    borderRadius: "50%",
    boxShadow:
      "0 0 0 1px rgba(8, 56, 100, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.05)"
  }
});
