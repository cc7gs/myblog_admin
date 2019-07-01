const defaultServer = `${window.location.protocol}//${window.location.host.slice(0, -1)}`;

/**
 * 获取文件名后缀
 * @param name 文件名
 */
const getFileSuffix = (name: string): string => name.substr(name.lastIndexOf('.')).toLowerCase();

/**
 * 判断是否为限定文档类型
 * @param name 文件名
 */
export const checkDocument = (name: string): boolean => {
    const suffix = getFileSuffix(name);
    return suffix === '.xls' || suffix === '.xlsx';
}

/**
 * 判断是否为限定的图片类型
 * @param name 文件名
 */
export const checkPicture = (name: string): boolean => {
    const suffix = getFileSuffix(name);
    return suffix === '.jpg' || suffix === '.jpeg' || suffix === '.gif' || suffix === '.png' || suffix === '.bmp' || suffix === '.svg';
}

/**
 * 获取文件上传路径
 * @param url 上传路径
 * @param port 文件服务端口
 */
export const getUploadURL = (url: string, port: string): string => {
    if (port === '') {
        return `${window.location.protocol}//${window.location.host.slice(0, -1)}1/${url}`;
    }
    const index = window.location.host.lastIndexOf(`:${window.location.port}`);
    const uploadHost = window.location.host.slice(0, index);
    return `${window.location.protocol}//${uploadHost}:${port}/${url}`;
}
