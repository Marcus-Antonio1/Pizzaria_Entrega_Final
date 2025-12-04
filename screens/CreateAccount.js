import React, { useState } from 'react';
import { Text, View, Image, TextInput, Button, Alert } from 'react-native';
import { SignUp } from '../utils/authHandles/AuthHandles.util';
import {useNavigation} from "@react-navigation/native"

const CreateAccount = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword, setConfirmPassord] = useState('')

    const navigation = useNavigation()

    const goToPage = (path) => {
        navigation.navigate(path);
    }   

    const handleRegister = async () => {
  console.log("Botão Cadastrar clicado!");
  if (password !== confirmPassword) {
    return Alert.alert('Senhas diferentes!', 'As senhas digitadas estão diferentes!');
  } else if (password.length < 6) {
    return Alert.alert('A senha deve conter no mínimo 6 caractéres');
  } else if (!email || !name || !password || !confirmPassword) {
    return Alert.alert('Campos vazios!', 'Por favor, preencha todos os campos!');
  } else {
    console.log("Chamando SignUp...");
    await SignUp(email, password, () => goToPage('Login'));
  }
}

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FFF',
                justifyContent: 'center',
                padding: 40,
            }}
        >
            <View
                style={{
                    alignItems: 'center',
                    marginBottom: '10%',
                }}
            >
                <Image
                    source={{
                        uri:
                            'https://static.ifood-static.com.br/image/upload/t_high/logosgde/761fa731-38d9-432e-b925-d6db842155da/202008052136_Unrw_.jpeg',
                    }}
                    style={{ width: 200, height: 100 }}
                />
            </View>
            <View>
                <Text>Nome</Text>
                <TextInput
                 onChangeText={(value) => setName(value)}
                    style={{
                        height: 40,
                        width: '100%',
                        borderColor: '#848484',
                        borderWidth: 1,
                        marginBottom: '5%',
                        marginTop: '3%',
                    }}
                />
            </View>
            <View>
                <Text>Email</Text>
                <TextInput
                    onChangeText={(value) => setEmail(value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{
                        height: 40,
                        width: '100%',
                        borderColor: '#848484',
                        borderWidth: 1,
                        marginBottom: '5%',
                        marginTop: '3%',
                    }}
                />
            </View>
            <View>
                <Text>Senha</Text>
                <TextInput
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={true}
                    style={{
                        height: 40,
                        width: '100%',
                        borderColor: '#848484',
                        borderWidth: 1,
                        marginBottom: '5%',
                        marginTop: '3%',
                    }}
                />
            </View>
            <View>
                <Text>Confirmar Senha</Text>
                <TextInput
                    onChangeText={(value) => setConfirmPassord(value)}
                    secureTextEntry={true}
                    style={{
                        height: 40,
                        width: '100%',
                        borderColor: '#848484',
                        borderWidth: 1,
                        marginBottom: '5%',
                        marginTop: '3%',
                    }}
                />
            </View>
            <Button onPress={() => handleRegister()} title='Cadastrar' />
        </View>
    );
};

export default CreateAccount;



