import moment from 'moment';
import { notification } from "antd";

const DateFormat = 'YYYY/MM/DD';
const DateBar = 'YYYY-MM-DD'
const DateTimeFormat = 'YYYY/MM/DD HH:mm:ss';

export const localDatetimeRenderer = (date, type) => {
    if (date !== null) {
        if (type === 'dateFormat') {
            return moment(date).local().format(DateFormat);
        } else if (type === 'dateBar') {
            return moment(date).local().format(DateBar);
        }
        return moment(date).local().format(DateTimeFormat);
    }

    return null;
};

export const checkNullOrEmpty = param => {
    if (param && (param !== null || param !== '')) {
        return param;
    } else {
        return true;
    }
};

export const doEllipsis = (value, length) => {
    if (value.length > length / 2) {
        return value.slice(0, length) + '...';
    } else {
        return value;
    }
};

export const useParams = type => {
    const query = decodeURI(window.location.search).substring(1);
    let category = '';
    const vars = query.split('&');
    const params = {};

    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        params[pair[0]] = pair[1];
    }

    if (!type) {
        category = query.split('=')[4];
        const result = { ...params, category: category };
        return result;
    }

    return params;
};

export const imageSizeChange = (image, type, fileType) => {
    let canvas = document.createElement('canvas'),
        max_size = type === "quill" ? 16384 : type === "multiple" ? 100 : 1024,
        width = image.width,
        height = image.height;
    if (width > height) {
        if (width > max_size) {
            height *= max_size / width;
            width = max_size;
        }
    } else {
        if (height > max_size) {
            width *= max_size / height;
            height = max_size;
        }
    }
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, width, height);
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;
    for (var i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 255) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
            data[i + 3] = 255 - data[i + 3];
        }
    }
    ctx.putImageData(imgData, 0, 0);

    const result = canvas;
    URL.revokeObjectURL(canvas);

    if (type === "quill") {
        return result.toDataURL(fileType === 'image/gif' ? 'image/gif' : 'image/jpeg', 0.6);
    } else if (type === "multiple") {
        return Promise.resolve(dataURItoBlob(result.toDataURL('image/jpeg', 0.8)));
    }

    return dataURItoBlob(result.toDataURL('image/jpeg', 0.8));
};

const dataURItoBlob = dataURI => {
    var byteString = atob(dataURI.split(',')[1]);

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/jpeg' });
};

export const openNotification = (message, icon, className) => {
    className === "alert" && (
        notification.error({
            icon: icon,
            message: message,
            placement: 'top',
        })
    )
    className === "none" && (
        notification.warning({
            icon: icon,
            message: message,
            placement: 'top',
        })
    )
    className === "success" && (
        notification.success({
            icon: icon,
            message: message,
            placement: 'top',
        })
    )
    className !== "alert" && className !== "none" && className !== "success" && (
        notification.open({
            icon: icon,
            message: message,
            placement: 'top',
        })
    );
};