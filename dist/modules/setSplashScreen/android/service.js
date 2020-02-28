"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_processing_1 = require("../../../services/color.processing");
const file_processing_1 = require("../../../services/file.processing");
const path_1 = require("path");
const config_1 = require("../../config");
const image_processing_1 = require("../../../services/image.processing");
const config_2 = require("./config");
const type_1 = require("../../../services/type");
exports.addAndroidSplashScreen = async (imageSource, backgroundColor, resizeMode, packageName) => {
    try {
        addReactNativeSplashScreen(backgroundColor, resizeMode, packageName);
        await generateAndroidSplashImages(imageSource);
    }
    catch (err) {
        console.log(err);
    }
};
const addLaunchScreenBackgroundColor = (backgroundColor) => {
    file_processing_1.replaceInFile(path_1.join(__dirname, '../../../../templates/android/values/colors-splash.xml'), `${config_1.ANDROID_MAIN_RES_PATH}/values/colors-splash.xml`, [
        {
            oldContent: /{{splashprimary}}/g,
            newContent: `${color_processing_1.getHexColor(backgroundColor)}`,
        },
    ]);
};
const addReactNativeSplashScreen = (backgroundColor, resizeMode = type_1.EResizeMode.CONTAIN, packageName) => {
    addLaunchScreenBackgroundColor(backgroundColor);
    file_processing_1.copyFile(path_1.join(__dirname, '../../../../templates/android/drawable/splashscreen.xml'), `${config_1.ANDROID_MAIN_RES_PATH}/drawable/splashscreen.xml`);
    file_processing_1.copyFile(path_1.join(__dirname, `../../../../templates/android/layout/launch_screen.${resizeMode}.xml`), `${config_1.ANDROID_MAIN_RES_PATH}/layout/launch_screen.xml`);
    file_processing_1.applyPatch(`${config_1.ANDROID_MAIN_RES_PATH}/values/styles.xml`, {
        pattern: /^.*<resources>.*[\r\n]/g,
        patch: file_processing_1.readFile(path_1.join(__dirname, '../../../../templates/android/values/styles-splash.xml')),
    });
    // This is crazy and not work well!!
    // const packageJson = require(join(process.cwd(), './package'));
    // const packageNameDirectory = packageName ? packageName.replace(/\./g, '/') : `com/${packageJson.name.toLowerCase()}`
    // const mainActivityPath = `${ANDROID_MAIN_PATH}/java/${packageNameDirectory}/MainActivity.java`;
    // applyPatch(mainActivityPath, {
    //   pattern: /^(.+?)(?=import)/gs,
    //   patch: 'import android.os.Bundle;\n' + 'import org.devio.rn.splashscreen.SplashScreen;\n',
    // });
    // const onCreateRegExp = /^.*onCreate.*[\r\n]/gm;
    // if (readFile(mainActivityPath).match(onCreateRegExp)) {
    //   applyPatch(mainActivityPath, {
    //     pattern: onCreateRegExp,
    //     patch: 'SplashScreen.show(this, R.style.SplashScreenTheme);',
    //   });
    // } else {
    //   applyPatch(mainActivityPath, {
    //     pattern: /^.*MainActivity.*[\r\n]/gm,
    //     patch:
    //       '    @Override\n' +
    //       '    protected void onCreate(Bundle savedInstanceState) {\n' +
    //       '        SplashScreen.show(this, R.style.SplashScreenTheme);\n' +
    //       '        super.onCreate(savedInstanceState);\n' +
    //       '    }',
    //   });
    // }
};
const generateAndroidSplashImages = (imageSource) => Promise.all(config_2.config.androidSplashImages.map(({ size, density }) => image_processing_1.generateResizedAssets(imageSource, `${config_1.ANDROID_MAIN_RES_PATH}/drawable-${density}/splash_image.png`, size, size, {
    fit: 'inside',
})));
