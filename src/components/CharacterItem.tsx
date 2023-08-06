import { Image, Text, Title } from "@/UI/index";
import { ICharacterItem } from "../types/ICharacterItem";

/* interface ICharacterItem {
 *
 * }
 *  */

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
    <div style={{ display: "flex" }}>
      <Image src={image}></Image>
      <div style={{ display: "block", marginLeft: "20px" }}>
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
      </div>
    </div>
  );
};
