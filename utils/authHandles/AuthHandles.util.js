
import {signInWithEmailAndPassword,createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Auth } from "../../firebaseconfig";

import { Alert } from "react-native";


export const  SignIn = async (email,password, onSucess) => {

   

    signInWithEmailAndPassword(Auth,email,password).then(() => {

     console.log("Login sucessido, prosseguindo para tela HOME")
     onSucess()
     
    }).catch((error) => {
     const errorMessage = error.message;
     const errorCode = error.code;

     console.log(`Ocorreu um erro na autenticação: ERROR MESSAGE: ${errorMessage} | ERROR CODE: ${errorCode}` )
     if(error.code === 'auth/missing-email' | error.code === 'auth/invalid-credential'){
        Alert.alert('Usuário não encontrado','Email ou senha incorretos')
     } 


    })
}


export const SignUp = async (email, password, onSucess) => {
  console.log("Entrou na função SignUp");
  createUserWithEmailAndPassword(Auth, email, password)
    .then(() => {
      console.log("Usuário criado com sucesso!");
      console.log(`Email: ${email} | Senha: ${password}`);
      onSucess();
    })
    .catch((error) => {
      console.log("Erro ao criar usuário:", error);
      Alert.alert("Erro ao criar usuário", error.message);
    });
}


export const PasswordReset = async (email, onSucess) => {



   sendPasswordResetEmail(Auth,email).then(() => {
      console.log(`Email de redefinição enviado para ${email}`)
      onSucess()
   }).catch((error) => {
      throw error
   })
}