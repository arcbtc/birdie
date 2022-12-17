<img src="https://user-images.githubusercontent.com/33088785/147620316-7499cebd-9019-4875-9e71-f569dd568995.png">

A very slightly changed fork off https://github.com/fiatjaf/branle, which was a fork of https://github.com/arcbtc/nostr.

Feel free to use <a href="https://nostr.com">nostr.com</a>, or run yourself.

> nostr.com is just a dot com with the protocols name. The nostr protocol is very diverse and can do much more than just twitter. Read more <a href="https://github.com/fiatjaf/nostr">here</a> 

## Installation

#### Install yarn and the dependencies

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn

yarn
```

#### Install Quasar

```bash
yarn global add @quasar/cli
export PATH="$(yarn global bin):$PATH"

```

##### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npx quasar dev
```

##### Lint the files

```bash
yarn run lint
```

##### Build the app for production

```bash
npx quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Build the docker image
```bash
docker build -t branle .
```

### Run the container
```bash
docker run -d -p 8080:80 --name branle branle
```

### Customize the brand
Edit `customize.json` and replace the colors, icon, name and dark mode setting.
When setting the dark mode, you can also set the colors `"dark-page"` and `"dark"`.
