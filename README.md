<p align="center"><img src="./docs/assets/make-logo.png"></p>
<h2 align="center">Everyday tools for simpler React Native development</h2>

## ⚙️ Setup

In your react-native project folder, run:
```bash
yarn add -D @bam.tech/react-native-make
# OR
npm i -D @bam.tech/react-native-make
```

## 📚 Usage

Once installed, plugins are available through the React Native CLI

You can get the list of available plugins by running `react-native -h` within your project's folder

|                            Command | Description                               |
| ---------------------------------: | :---------------------------------------- |
|     [set-icon](./docs/set-icon.md) | generate platform specific app icons      |
| [set-splash](./docs/set-splash.md) | generate platform specific splash screens |


## 🚨🚨🚨 Custom bundle name 🚨🚨🚨
Thanks to sandyputra for the fix. Now you can add the package name version.
I also commented out the TS part where the package add the Splashscreen code in the native part of iOS and Android section.

So if your package has a custom bundle name like `de.testing.test.app`, now you can add the package name as below:
`--bundle <com.example.app>`


## 💻 Local development

- Pull latest version
- `cd react-native-make`
- Run `yarn` then `yarn link`
- Launch a new project with `react-native init`
- In your React Native project, `yarn link @bam.tech/react-native-make`
- In the package.json of your React Native project, in dependencies add "@bam.tech/react-native-make" : "0.0.0"

## 👉 About Bam

We are a 100 people company developing and designing multiplatform applications with [React Native](https://www.bam.tech/agence-react-native-paris) using the Lean & Agile methodology. To get more information on the solutions that would suit your needs, feel free to get in touch by [email](mailto://contact@bam.tech) or through or [contact form](https://www.bam.tech/en/contact)!

We will always answer you with pleasure 😁

<br><hr/>

**Disclaimer:** _To better understand your usage of this tool, basic analytics have been enabled. It only records commands usage as anonymous page views and does not identify users in any way_
