import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import firebase from './src/config/firebaseConnection.js';
console.disableYellowBox=true;


export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  async function cadastrar() {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((value) => {
      firebase.database().ref('usuarios').child(value.user.uid).set({
        nome,
      })
      alert('Usuário criado com sucesso');
      setNome('');
      setEmail('');
      setPassword('');
    })
    .catch((error) => alert('Ops! Algo deu errado.'))
  };

  return(
    <View style={ styles.container }><Text style={ styles.texto }>Nome</Text>
      <TextInput
      style={ styles.input }
      value={ nome }
      underlineColorAndroid="transparent"
      onChangeText={ (nome) => setNome(nome)}/>
      
      <Text style={ styles.texto }>E-mail</Text>
      <TextInput
      style={ styles.input }
      value={ email }
      underlineColorAndroid="transparent"
      onChangeText={ (email) => setEmail(email)}/>
      
      <Text style={ styles.nome }>Senha</Text>
      <TextInput
      style={ styles.input }
      value={ password }
      underlineColorAndroid="transparent"
      onChangeText={ (password) => setPassword(password)}/>

      <Button title="Cadastrar"
      onPress={ cadastrar }/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  texto: {
    fontSize: 20
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 40,
    fontSize: 15
  }
});