import { View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { IInstitution } from 'src/types';

import HomeView from './home-view';

const RenderScene = ({ institution }: { institution: IInstitution }) => {
  return SceneMap({
    tab1: () => <HomeView institution={institution} />,
    tab2: () => <View />,
    tab3: () => <View />,
    tab4: () => <View />,
    tab5: () => <View />,
    tab6: () => <View />,
    tab7: () => <View />,
  });
};

export default RenderScene;
