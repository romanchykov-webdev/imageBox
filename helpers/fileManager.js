import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import {Platform, Alert} from 'react-native';

// Универсальная функция для скачивания и шаринга файлов
export const handleFileAction = async ({ actionType, imageUri, fileName, showToast }) => {
    const filepath = `${FileSystem.documentDirectory}${fileName || imageUri.split('/').pop()}`;

    try {
        if (Platform.OS === 'web') {
            if (actionType === 'download') {
                await downloadFileWeb(imageUri, fileName, showToast);
            } else {
                Alert.alert('Ошибка', 'Шаринг на вебе не поддерживается');
            }
        } else {
            const uri = await downloadFileMobile(imageUri, filepath);
            if (actionType === 'share') {
                await Sharing.shareAsync(uri);
            }
            if (showToast && uri) showToast(`Image ${actionType}`);
        }
    } catch (error) {
        Alert.alert('Ошибка', error.message);
    }
};

// Функция для скачивания файлов на вебе
const downloadFileWeb = async (imageUri, fileName, showToast) => {
    try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName || 'downloaded_image.jpg';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        if (showToast) showToast('Image downloaded');
    } catch (error) {
        console.log('Error during download (Web):', error.message);
        throw error;
    }
};

// Функция для скачивания файлов на мобильных устройствах
const downloadFileMobile = async (imageUri, filepath) => {
    try {
        const { uri } = await FileSystem.downloadAsync(imageUri, filepath);
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
            const asset = await MediaLibrary.createAssetAsync(uri);
            await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
            Alert.alert('Разрешение отклонено', 'Доступ к медиабиблиотеке был отклонен.');
        }
        return uri;
    } catch (error) {
        console.log('Error during download (Mobile):', error.message);
        throw error;
    }
};
