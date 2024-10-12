import {Dimensions} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

// Ширина устройства в процентах
export const wp = percentage => {
    // const width = deviceWidth;
    // return (percentage * width) / 100
    return (percentage * deviceWidth) / 100;
}

// Высота устройства в процентах
export const hp = percentage => {
    // const height = deviceHeight;
    // return (percentage * height) / 100
    return (percentage * deviceHeight) / 100;
}

// Определение количества колонок в зависимости от ширины экрана
export const getColumnCount = () => {

    if (deviceWidth > 1024) {
        //desktop
        return 4;
    } else if (deviceWidth > 768) {
        //tablet
        return 3;
    } else {
        //phone
        return 2;
    }

}

// Расчет высоты изображения с учетом реального соотношения сторон
export const getImageSize = (height, width) => {

    if (width > height) {
        //landscape
        return 250;
    } else if (width < height) {
        //portrait
        return 300;
    } else {
        //square
        return 200;
    }

}
// export const getImageSize = (imageHeight, imageWidth) => {
//     const columns = getColumnCount(); // получаем количество колонок
//     const columnWidth = deviceWidth / columns; // ширина одной колонки
//
//     // Соотношение сторон изображения
//     const aspectRatio = imageWidth / imageHeight;
//
//     // Возвращаем пропорциональную высоту для ширины колонки
//     return columnWidth / aspectRatio;
// }