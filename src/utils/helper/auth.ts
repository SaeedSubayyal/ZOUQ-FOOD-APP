import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const googleAuthConfig = () =>
  GoogleSignin.configure({
    // androidClientId:'881573398721-f24pg3g7cbgqj9fv4gd1pkjgrcbi632p.apps.googleusercontent.com',
    // iosClientId:
    //   '708879870613-bs4do9l5vte3aas9r6u2dlg1h27fdklv.apps.googleusercontent.com',
    webClientId:
      '542525841018-nhtcn9l4sedn9q3vfchrgfo2nh9vpqhl.apps.googleusercontent.com',
    // webClientId:
    //   '881573398721-2k3ogteg2do7b6uuvq8mdaouq4iutqe9.apps.googleusercontent.com',
    // androidClientId:
    //   '881573398721-f24pg3g7cbgqj9fv4gd1pkjgrcbi632p.apps.googleusercontent.com',
    // my frontend project
    // webClientId:
    //   '708879870613-bmsn1bltl0sonevm47f5ulkl6gv55vlf.apps.googleusercontent.com',
    // androidClientId:
    //   '708879870613-bmsn1bltl0sonevm47f5ulkl6gv55vlf.apps.googleusercontent.com',
  });
