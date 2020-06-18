import React, { useState, useEffect } from "react"
import api from './services/api'

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

export default function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api
      .get('/repositories')
      .then(response => setRepositories(response.data))
      .catch(error => console.log(error))
  }, [])

  async function likeRepository(id) {
    // Implement "Like Repository" functionality
    api
      .post(`/repositories/${id}/like`)
      .then(response => {
        const index = repositories.findIndex(item => item.id == id)
        if (index > -1) {
          setRepositories(
            repositories.map(repo => {
              if (repo.id == id)
                return response.data

              return repo
            })
          )
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121622" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.h1}>Repositories</Text>

        <FlatList 
          data={repositories}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{item.title}</Text>

              <View style={styles.techsContainer}>
                {item.techs.map(tech => (
                  <Text style={styles.tech} key={tech}>
                    {tech}
                  </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${item.id}`}
                >
                  {item.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => likeRepository(item.id)}
                activeOpacity={.75}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${item.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121622",
    paddingHorizontal: 15,
    paddingTop: 30
  },

  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30
  },

  repositoryContainer: {
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 16,
    width: '100%'
  },
  repository: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#fff'
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    flexWrap: 'wrap'
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    borderRadius: 4
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: '#fff'
  },
  button: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#7159c1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
