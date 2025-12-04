# 🍕📱 Pizzaria — App Mobile (React Native + Expo 49)

Aplicativo desenvolvido para trabalho da faculdade, com foco em **sistema de pedidos de pizza**.  
O projeto utiliza **React Native via Expo (SDK 49)** e **Firebase** para autenticação e persistência de dados.

---

## 📌 Visão Geral

O app permite:

- Exibir cardápio de pizzas  
- Realizar pedidos  
- Cadastrar/logar usuários  
- Gerenciar itens no carrinho  

A interface é construída em **React Native (Expo)** e os dados são persistidos no **Firebase Realtime Database**.  
O projeto foi entregue como parte da disciplina de **IoT / Mobile**.

---

## 🛠 Tecnologias Utilizadas

### **Frontend / Mobile**
- React Native (Expo SDK 49)
- JavaScript (React)

### **Backend / Banco**
- Firebase Authentication
- Firebase Realtime Database  
(Usando SDK Modular — firebase v9)

### **Navegação**
- @react-navigation/native  
- @react-navigation/native-stack  
- @react-navigation/drawer  

### **Outras libs importantes**
- react-native-reanimated  
- react-native-gesture-handler  
- react-native-screens  
- react-native-safe-area-context  
- react-native-maps  
- react-native-toast-message  

---

## 📦 Dependências Principais (package.json)

```txt
expo: ~49.0.0
react: 18.2.0
react-native: 0.72.6
firebase: ^9.6.11
@react-navigation/native: ^6.1.6
@react-navigation/native-stack: ^6.9.12
@react-navigation/drawer: ^6.6.2
react-native-reanimated: ~3.3.0
react-native-gesture-handler: ~2.12.0
react-native-screens: ~3.22.0
react-native-safe-area-context: 4.6.3
react-native-maps: 1.7.1
react-native-toast-message: ^2.1.6
```

## 🧰 Pré-requisitos

- Node.js 18 LTS (recomendado)

- npm ou yarn

- Expo CLI (opcional — npx funciona)

- Android Studio → para rodar emulador Android

- Dispositivo Android com Expo Go na versão 49 (opção mais simples)

## ❗ Sobre iPhone / iOS (IMPORTANTE)

O Expo Go da App Store NÃO é compatível com Expo SDK 49.
Ou seja: o projeto NÃO roda diretamente no iPhone usando Expo Go.

Para rodar no iOS, é necessário usar:

Expo Dev Client (EAS Build)
ou

Build via Xcode (macOS)


## ▶️ Como Rodar o Projeto
### 1️⃣ Clone o repositório
```
git clone <seu-repo.git>
cd Pizzaria-main
```

### 2️⃣ Instale as dependências
```
npm install
# ou
yarn install
```

### 3️⃣ Inicie o servidor de desenvolvimento
```
npx expo start
```

Isso abrirá o painel do Expo (Metro Bundler) com QR Code.

## 📱 Rodando no Android
### ✔️ No celular Android (mais simples)

Instale Expo Go pela Play Store

Execute:
```
npx expo start
```

Escaneie o QR Code com o Expo Go

### ✔️ No emulador Android

Abra o Android Studio

Inicie um emulador

No terminal do Expo, pressione:
```
a
```

## 🍏 Rodando no iOS (iPhone)

### ⚠️ Expo SDK 49 NÃO roda no iPhone usando Expo Go.

Opções possíveis:
### ✔️ 1. Expo Dev Client (recomendado)

Crie um build de desenvolvimento:
```
eas build --profile development --platform ios
```

Depois instale no iPhone via QR Code ou TestFlight.
Funciona como um “Expo Go personalizado”.

### ✔️ 2. Rodar no simulador iOS via Xcode

Somente no macOS:
```
npx expo run:ios
```
### ✔️ 3. EAS Build + TestFlight

Build nativo para iOS e distribuição via TestFlight.

## 💻 Rodando na Web (opcional)
```
npm run web
# ou
npx expo start --web
```

## 🧪 Comandos Úteis
```
npm install                 # instalar dependências
npx expo start              # rodar projeto
npx expo start --android    # abrir no Android
npx expo start --web        # rodar na web
eas build --platform ios    # build iOS
eas build --platform android# build Android
```
