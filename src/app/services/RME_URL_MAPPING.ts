
export class RME_URL_MAPPING{

    // For Account Url

      // http://accounttest.s3-website.us-east-2.amazonaws.com
    // https://account.rmehub.in
    
    public static account ='http://accounttest.s3-website.us-east-2.amazonaws.com';
    
    public static LOCAL_URL = 'http://localhost:8080';
    public static TESTING_ENV_URL = 'http://ec2-34-234-215-47.compute-1.amazonaws.com';
    public static PRODUCTION_ENV_URL = 'https://apiretail.rmehub.in';
    public static PRODUCTION_AUTH_URL = 'https://api.rmehub.in';
    public static TESTING_AUTH_URL = 'http://ec2-18-223-238-93.us-east-2.compute.amazonaws.com';
    public static DAPP_TESTING_URL = 'http://ec2-34-201-30-149.compute-1.amazonaws.com';


    public static POST_RESIDENTIAL_PROPERTY = RME_URL_MAPPING.TESTING_ENV_URL + '/api/user/product/residential';

    public static POST_COMMERCIAL_PROPERTY = RME_URL_MAPPING.TESTING_ENV_URL + '/api/user/product/commercial?uuid=';

    public static POST_INDUSTRIAL_PROPERTY = RME_URL_MAPPING.TESTING_ENV_URL + '/api/user/product/industrial?uuid='

    public static POST_RAW_PROPERTY = RME_URL_MAPPING.TESTING_ENV_URL + '/api/product/raw';
    
    public static POST_NEED_ANALYSIS = RME_URL_MAPPING.TESTING_ENV_URL + '/save/need-analysis';

    public static RES_POST_FILTER = RME_URL_MAPPING.TESTING_ENV_URL + '/filter/residential-products?size=';
   
    public static COMM_POST_FILTER = RME_URL_MAPPING.TESTING_ENV_URL + '/filter/commercial-products?size=';

    public static GET_Top_RECENT_PROPERTY = RME_URL_MAPPING.TESTING_ENV_URL + '/filter/show/res?page=';
   
    public static GET_COMMERCIAL_PROPERTY = RME_URL_MAPPING.TESTING_ENV_URL + '/product/view-all-commercial?page=';

    public static GET_TOP_INDUSTRIAL_PROPERTY = RME_URL_MAPPING.TESTING_ENV_URL + '/product/view-all-industrial?size=10&pageNo=0&sort=createdAt,desc'

    public static GET_TOP_VIEW_Property = RME_URL_MAPPING.TESTING_ENV_URL + '/filter/show/res?page=0&size=10&sort=views,desc';

    public static GET_RESIDENTIAL_SINGLE_VIEW = RME_URL_MAPPING.TESTING_ENV_URL + '/single/product/residential?pid=';

    public static GET_COMMERCIAL_SINGLE_VIEW = RME_URL_MAPPING.TESTING_ENV_URL + '/single/product/commercial?pid=';

    public static GET_INDUSTRIAL_SINGLE_VIEW = RME_URL_MAPPING.TESTING_ENV_URL + '/single/product/industrial?pid='

    public static GET_LEADS_DATA = RME_URL_MAPPING.TESTING_ENV_URL + 'single-property-lead?pid=';

    public static GET_USER_RESID_PROPERTIES = RME_URL_MAPPING.TESTING_ENV_URL + '/api/user/product/residential?uuid=';

    public static GET_USER_COMM_PROPERTIES = RME_URL_MAPPING.TESTING_ENV_URL + '/api/user/product/view-commercial?uuid=';

    public static GET_ADD_VIEWS = RME_URL_MAPPING.TESTING_ENV_URL + '/add-view';

    public static POST_POPERTY_IMAGES = RME_URL_MAPPING.TESTING_ENV_URL + '/api/uploadattachment?_uat=';

    public static GET_USER_DATA = RME_URL_MAPPING.TESTING_AUTH_URL + '/api/getuser';

    public static LOG_OUT = RME_URL_MAPPING.TESTING_AUTH_URL+ '/api/logout';

    public static POST_SESSION = RME_URL_MAPPING.TESTING_AUTH_URL+ '/api/user/getSession';

    public static PROFILE_UPLOAD = RME_URL_MAPPING.TESTING_AUTH_URL+ '/api/profilePic/upload';

    public static GET_RAW_LAND_PROPERTY =RME_URL_MAPPING.TESTING_ENV_URL + '/filter/show/raw?page=0&size=10&sort=createdAt,desc';

    public static GET_RAW_SINGLE_VIEW =RME_URL_MAPPING.TESTING_ENV_URL + '/product/raw/single?pid=';

    public static POST_CONTACT = RME_URL_MAPPING.TESTING_ENV_URL + '/contact-us?pid=';
    
    public static GET_DAPPDATA = RME_URL_MAPPING.DAPP_TESTING_URL + '/bh/view/projects?pageNo=0&dataSize='

    public static GET_SINGLE_DAPP_DATA = RME_URL_MAPPING.TESTING_ENV_URL + '/product/raw/view/inv/';


  }
