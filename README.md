Pizzaria (App mobile) 🍕📱

Aplicativo desenvolvido para trabalho da faculdade: sistema de pedidos de pizza (mobile) usando React Native + Expo (SDK 49) e Firebase como backend.

Visão geral

App mobile para fazer pedidos de pizza, gerenciar cardápio e realizar cadastros/login. Projeto feito com Expo (managed workflow). O Firebase é usado para autenticação e banco de dados (Realtime Database). O projeto foi entregue como parte da disciplina de IoT / Mobile — a interface do app está em React Native (Expo) e a persistência dos dados é feita diretamente pelo SDK do Firebase.

Tecnologias / Stack

Front-end (mobile): React Native via Expo (SDK 49)

Linguagem: JavaScript (React)

Backend / Banco: Firebase (Realtime Database / Auth) — via SDK JS modular (firebase).

Navegação: @react-navigation/*

Outros libs: react-native-reanimated, react-native-gesture-handler, react-native-safe-area-context, react-native-screens, react-native-toast-message, entre outros.

Dependências essenciais (extraídas do package.json)


expo: ~49.0.0

react: 18.2.0

react-native: 0.72.6

firebase: ^9.6.11

@react-navigation/native: ^6.1.6

@react-navigation/native-stack: ^6.9.12

@react-navigation/drawer: ^6.6.2

react-native-gesture-handler: ~2.12.0

react-native-reanimated: ~3.3.0

react-native-screens: ~3.22.0

react-native-safe-area-context: 4.6.3

react-native-maps: 1.7.1

react-native-toast-message: ^2.1.6

react-dom: 18.2.0

react-native-web: ~0.19.6

Dev: @babel/core: ^7.23.0

Observação: há outras dependências transitivas (dependências instaladas automaticamente pelo npm/expo), mas a lista acima cobre as libs que você precisa declarar/garantir compatibilidade.

Pré-requisitos (local)

Node.js: recomendo Node 18.x LTS (compatível com pacotes modernos).

npm (vem com Node) ou yarn (opcional).

Expo CLI: não é estritamente necessário instalar globalmente — você pode usar npx expo .... Se preferir global: npm install -g expo-cli ou npm install -g expo.

Android Studio (se for rodar no emulador Android) ou um dispositivo Android físico com o app Expo Go.

macOS + Xcode (necessário para rodar em simulador iOS local / construir para iOS) — veja observações abaixo sobre iPhone.


Como rodar (passo a passo)

Clone o repositório:

git clone <seu-repo.git>
cd <repo-pasta>/Pizzaria-main


Instale dependências:

npm install
# ou
yarn install


Rodar o projeto (modo desenvolvimento):

npx expo start
# ou se tem expo instalado globalmente
expo start


Isto abrirá a Metro devtools no navegador com o QR code.

Rodando no Android (físico)

Instale Expo Go no celular (Android).

No terminal com expo start, escaneie o QR code com o app Expo Go (ou use a no terminal para tentar abrir no emulador Android).

Se usar emulador: abra um emulador pelo Android Studio e execute expo start e depois a.

Rodando no iPhone / iOS — IMPORTANTE (Expo SDK 49)

Os pontos críticos sobre iOS:

Nem sempre a versão do Expo Go disponível na App Store pública será compatível com a SDK 49 local. Eu observei que você comentou: "estou usando o expo 49 então o expo go no celular tem que ser essa versão também — se for a mais recente não dá certo e no iPhone não funciona por causa da versão precisa de um outro metodo" — isso é real: para SDK mais recentes, a versão pública do Expo Go pode estar desatualizada ou incompatível.

Opções para iOS:

Expo Dev Client (recomendado): gere um build de desenvolvimento com eas build --profile development --platform ios (requer conta Expo e EAS). Depois instale a dev client no aparelho — assim o app embute suas dependências nativas e roda como Expo Go customizado.

EAS Build / TestFlight: faça um build via EAS e distribua via TestFlight (ou instale o .ipa via TestFlight).

npx expo run:ios — funciona localmente em macOS com Xcode para rodar no simulador ou dispositivo (requer configuração com provisioning profile para dispositivo real).

Em resumo: no iPhone, se o Expo Go público não for compatível, use Expo Dev Client (EAS) ou rode via Xcode / build para dispositivo.

Rodando para web
npm run web
# ou
expo start --web


Estrutura do projeto (resumo)

App.js — ponto de entrada do app (Expo).

screens/ — telas do app (login, cardápio, carrinho, pedidos etc.).

routes/ / StackNavigator.js — navegação entre telas.

firebaseconfig.js — inicialização do Firebase (Auth + Realtime Database).

assets/ — imagens / ícones.

utils/ — funções utilitárias.

package.json — dependências do projeto.



Observações e dicas (problemas comuns)

Expo SDK x Expo Go: sempre verifique a compatibilidade — SDK 49 exige versão do Expo Go que suporte 49. Se a App Store/Play Store estiver com versão diferente, rode com Dev Client / EAS.

iOS real device: sem macOS/Xcode a instalação direta não é trivial — prefere EAS/TestFlight ou Expo Dev Client via EAS.

Erros de versão do Android SDK: se usar emulador e o expo start não abrir no emulador, confirme que o Android SDK está instalado e a variável ANDROID_HOME/ANDROID_SDK_ROOT está apontando para o local correto (ex.: C:\Users\<you>\AppData\Local\Android\Sdk no Windows).

Problemas com módulos nativos (ex.: react-native-maps): podem demandar configuração extra no app.json / app.config.js e builds nativos (EAS) para funcionar no dispositivo real.

Comandos úteis (resumo)
# instalar dependências
npm install

# iniciar dev server
npx expo start

# abrir android emulator (opção)
npx expo start --android

# web
npx expo start --web

# (opcional) build dev client iOS/Android via EAS (requer configuração)
eas build --profile development --platform ios
eas build --profile development --platform android
