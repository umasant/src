import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
//export const configureAmplify = {
  Amplify.configure({
    Auth: {
      Cognito: {
        //userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID || import.meta.env.AWS_USER_POOL_ID  as string,
        userPoolId:'us-east-2_zm1nivHVd',
        userPoolClientId:'4m0d0smm9gm622vcucptie7ag3',
        //userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID || import.meta.env.AWS_USER_POOL_WEB_CLIENT_ID as string,
        loginWith: {
          oauth: {
            domain: 'https://us-east-2zm1nivhvd.auth.us-east-2.amazoncognito.com',
            scopes: ['openid','email','phone','profile','aws.cognito.signin.user.admin'],
            redirectSignIn: ['http://localhost:3000/coach'],
            redirectSignOut: ['http://localhost:3000/'],
            responseType: 'code',
          },
          username: true,
          email: true,
        }
      }
    }
  });
}
