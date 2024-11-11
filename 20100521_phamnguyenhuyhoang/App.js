import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.description}>A premium online store for sporter and their stylish choice</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/Bicycleblue.jpg')} 
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>POWER BIKE SHOP</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};


const ProductListScreen = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const bikes = [
    { id: '1', name: 'Pinarello', price: '$1800', image: require('./assets/Bicycleblue.jpg'), category: 'Mountain' },
    { id: '2', name: 'Pina Mountain', price: '$1700', image: require('./assets/bicycle3.jpg'), category: 'Mountain' },
    { id: '3', name: 'Pina Bike', price: '$1500', image: require('./assets/bicycle2.jpg'), category: 'Roadbike' },
    { id: '4', name: 'Pinarello', price: '$1900', image: require('./assets/bicycle1.jpg'), category: 'Roadbike' },
    { id: '5', name: 'Pinarello', price: '$2700', image: require('./assets/bicycle2.jpg'), category: 'Roadbike' },
    { id: '6', name: 'Pinarello', price: '$1350', image: require('./assets/bicycle3.jpg'), category: 'Mountain' },
  ];

  const filteredBikes = bikes.filter(bike => selectedCategory === 'All' || bike.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>The World’s Best Bike</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setSelectedCategory('All')} style={styles.filterButton}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Roadbike')} style={styles.filterButton}>
          <Text style={styles.filterText}>Roadbike</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Mountain')} style={styles.filterButton}>
          <Text style={styles.filterText}>Mountain</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBikes}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity style={styles.productButton}>
              <Text style={styles.productButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </ScrollView>
  );
};


const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.detailContainer}>
      <Image source={product.image} style={styles.detailImage} />
      <Text style={styles.detailName}>{product.name}</Text>
      <Text style={styles.detailPrice}>Discounted Price: {product.discountPrice}</Text>
      <Text style={styles.detailOriginalPrice}>Original Price: {product.price}</Text>
      <Text style={styles.detailDescription}>
        Description: It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.
      </Text>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Product List' }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productCard: {
    width: '45%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: '2.5%',
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 12,
    color: '#FF5A5F',
    marginBottom: 10,
  },
  productButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  productButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F8E6E4',
  },
  detailImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailPrice: {
    fontSize: 20,
    color: '#FF5A5F',
    marginBottom: 5,
  },
  detailOriginalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#999',
    marginBottom: 20,
  },
  detailDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default App;
