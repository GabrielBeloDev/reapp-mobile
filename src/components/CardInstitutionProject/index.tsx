import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import Colors from '../../constants/colors';
import Button from '../Button';

type CardInstitutionProjectProps = {
  imagePath?: string;
  title?: string;
  description?: string;
  textButton?: string;
  isFavoriteCard?: boolean;
  onPressLike?: () => void;
  onPress?: () => void;
};

function CardInstitutionProject({
  imagePath,
  title,
  description,
  textButton,
  isFavoriteCard,
  onPressLike,
  onPress,
}: CardInstitutionProjectProps) {
  const [isLiked, setIsLiked] = useState(true);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    onPressLike && onPressLike();
  };

  return (
    <View className="w-full rounded-md bg-white p-4 shadow-xl">
      <View className="relative mb-2.5 h-56 w-full">
        <Image className="h-full w-full" source={{ uri: imagePath }} />

        {isFavoriteCard && (
          <View className="absolute right-3 top-3">
            <Pressable onPress={handleLikePress}>
              <Ionicons
                name={isLiked ? 'heart-sharp' : 'heart-outline'}
                size={34}
                color="red"
              />
            </Pressable>
          </View>
        )}
      </View>

      <View className="mb-2.5">
        <Text className="font-_bold text-base text-text_neutral">{title}</Text>
      </View>

      {description && (
        <View className="mb-2.5">
          <Text className="font-_regular text-base text-text_neutral">
            {description}
          </Text>
        </View>
      )}

      <Button
        customStyles="bg-color_primary w-full justify-center"
        textColor="text-text_light"
        endIcon={
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.text_white}
          />
        }
        onPress={onPress}
      >
        {textButton}
      </Button>
    </View>
  );
}

export default CardInstitutionProject;
