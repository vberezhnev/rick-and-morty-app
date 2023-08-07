import { Image, Text, Title, Flex, Block } from "./UI/index";
import { ICharacterItem } from "../types/ICharacterItem";

/* interface ICharacterItem {
 *
 * } */

// TODO: add types & remove any
export const CharacterItem = (item: any) => {
  const { name, status, gender, episode, image }: ICharacterItem = {
    ...item.item,
  };

  // Episode counter
  let totalEpisodes = 0;
  for (let properties in episode) {
    totalEpisodes += 1;
  }

  return (
    <Flex>
      <Image src={image}></Image>
      <Block $margin="0px 0px 0px 25px">
        <Title>{name}</Title>
        {"\n"}
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
