import { Image, Text, Title, Flex, Block } from "./UI/index";
import { ICharacter } from "../types/ICharacter";
import { ICharacterItem } from "../types/ICharacterItem";

export const CharacterItem = (item: ICharacterItem) => {
  const { name, status, gender, episode, image }: ICharacter = {
    ...item.item,
  };

  // Total episode counter
  let totalEpisodes = 0;
  for (let properties in episode) {
    totalEpisodes += 1;
  }

  return (
    <Flex>
      <Image src={image}></Image>
      <Block $margin="0px 0px 0px 25px">
        <Title>{name}</Title>
        <Text>
          <b>Status:</b> {status}
        </Text>
        <Text>
          <b>Gender:</b> {gender}
        </Text>
        <Text>
          <b>Total episodes:</b> {totalEpisodes}
        </Text>
      </Block>
    </Flex>
  );
};
