import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import firebase from './src/config/firebaseConnection.js';
console.disableYellowBox=true;


export default function App() {

  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');


  useEffect(() => {
    async function dados() {
      // Cria um nó
      // await firebase.database().ref('tipo').set('Vendedor')

      // Apaga um nó
      // await firebase.database().ref('nome').remove();

      // Atualiza um nó, porem precisa passar todos campos, se nao apaga os que estão la.
      // await firebase.database().ref('usuarios').child(3).set({
      //   nome: 'Felipera',
      //   cargo: 'Dev backend'
      // })

      // Atualizar um campo sem apagar os outros.
      // await firebase.database().ref('usuarios').child(1).update({
      //   nome: 'Jose augusto'
      // });


      // Observer
      // await firebase.database().ref('nome').on('value', (snapshot) => {
      //   setNome(snapshot.val());
      // });
      // =======================================================================
      // Uma unica vez
      // await firebase.database().ref('usuarios/1').once('value', (snapshot) => {
      //   setNome(snapshot.val().nome);
      //   setIdade(snapshot.val().idade);
      // });
    };
    dados()
  }, []);

  async function cadastrar() {
    if(nome === '' || cargo === '') {
      return alert('Os campos não podem estar vazios')
    };

    let usuarios = await firebase.database().ref('usuarios')
    let chave = usuarios.push().key;
    usuarios.child(chave).set({
      nome: nome, cargo: cargo
    });
    alert('Usuario cadastrado com sucesso.');
    setCargo('');
    setNome('');
  };

  function pegaNome() {
    firebase.database()
  };

  return(
    <View style={ styles.container }>
      <Text style={ styles.texto }>Nome</Text>
      <TextInput
      style={ styles.input }
      value={ nome }
      underlineColorAndroid="transparent"
      onChangeText={ (texto) => setNome(texto)}/>
      
      <Text style={ styles.nome }>Cargo</Text>
      <TextInput
      style={ styles.input }
      value={ cargo }
      underlineColorAndroid="transparent"
      onChangeText={ (cargo) => setCargo(cargo)}/>

      <Button title="Novo funcionário"
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