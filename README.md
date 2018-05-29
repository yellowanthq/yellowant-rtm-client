# YellowAnt RTM Client

RTM client app which utilizes Socket.IO to listen for YellowAnt commands and send them to your
YellowAnt application server.

## Getting Started

These instructions will get you started with deploying this application under 15 minutes.

### Prerequisites

```
node >= 8
```

### Installation

Clone this repo.

```
npm install
```

## Run the RTM client app in development

`APPLICATION_API_URL="YOUR_APP_API_URL_WHICH_RECEIVES_YELLOWANT_COMMANDS" CLIENT_ID="YOUR_APP_CLIENT_ID" RTM_TOKEN="YOUR_APP_RTM_TOKEN" npm run server`

## Run the RTM client app in production

`npm run build`
`APPLICATION_API_URL="YOUR_APP_API_URL_WHICH_RECEIVES_YELLOWANT_COMMANDS" CLIENT_ID="YOUR_APP_CLIENT_ID" RTM_TOKEN="YOUR_APP_RTM_TOKEN" npm start`

