const BACK_IP= process.env.NODE_ENV === 'development' ? 'http://localhost' : (process.env.REACT_APP_BACK_PROD_HOST as string);
const Config = {
    BACK_HOST: BACK_IP  + ':' + process.env.REACT_APP_BACK_PORT
}

export default Config;
