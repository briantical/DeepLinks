import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

const App = () => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const getInitialUrl = async () => {
      const initial = await Linking.getInitialURL();
      setRoute(initial);
    };

    getInitialUrl();
  }, []);

  useEffect(() => {
    const subscription = Linking.addEventListener('url', async ({url}) => {
      console.log('Subscription to event');
      setRoute(url);
    });

    return () => {
      console.log('Un-subscription to event');
      return subscription && subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{route}</Text>
    </View>
  );
};

export default App;
