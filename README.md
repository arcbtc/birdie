<img src="https://user-images.githubusercontent.com/33088785/147620316-7499cebd-9019-4875-9e71-f569dd568995.png">

# Birdie

a very slightly changed fork off https://github.com/fiatjaf/branle

## Install yarn and the dependencies

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn

yarn
```

## Install Quasar

```bash
yarn global add @quasar/cli
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn run lint
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
