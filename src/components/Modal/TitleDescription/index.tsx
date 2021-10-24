import {Modal, StyleSheet, View} from 'react-native';

import React from 'react';
import {Paragraph} from '@app/components/Typography/Paragraph';
import {Solid} from '@app/components/Button/Solid';
import {Subheading} from '@app/components/Typography/Subheading';
import {getDimensions} from '@app/utils/deviceUtils';
import {useModal} from '@app/providers/hooks/useModal';
import {MODAL_TITLE_DESCRIPTION} from '@app/test/testIDs';

export interface ModalTitleDescriptionProps {
  title: string;
  description: string;
  onButtonPress?(): void;
  buttonText?: string;
}

export const ModalTitleDescription: React.FC<ModalTitleDescriptionProps> = ({
  title,
  description,
  buttonText = 'Ok',
  onButtonPress,
}) => {
  const {popModal} = useModal();

  const onPress = () => {
    popModal();
    if (onButtonPress) {
      return onButtonPress();
    }
  };

  return (
    <Modal testID={MODAL_TITLE_DESCRIPTION} visible={true} transparent={true}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Paragraph size="l" style={styles.text}>
            {title}
          </Paragraph>
          <Subheading style={styles.text}>{description}</Subheading>
          <Solid onPress={onPress}>{buttonText}</Solid>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  body: {
    width: getDimensions().width * 0.8,
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 16,
    borderBottomWidth: 0,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 1,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
