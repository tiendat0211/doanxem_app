import React, { memo, useState } from "react";
import { Image, PressableProps, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IC_ANGRY, IC_HAHA, IC_LIKE, IC_LOVE, IC_REACTION, IC_SAD2, IC_WOW } from "../../assets/path";
import { unit1, unit10, unit12, unit19, unit24, unit28, unit3, unit60, unit80 } from "../../utils/appUnit";
import { AppFonts, fontSize14 } from "../../styles/AppFonts";
import AppText from "../../components/AppText/AppText";
import PressView from "../../components/PressView/PressView";
import { useTheme } from "../../hooks/useTheme";

interface ReactionProps {
  total_reactions?: number;
  post_uuid: number;
  userReaction?: any;
}

const images = [
  { id: "like", img: IC_LIKE },
  { id: "heart", img: IC_LOVE },
  { id: "haha", img: IC_HAHA },
  { id: "wow", img: IC_WOW },
  { id: "sad", img: IC_SAD2 },
  { id: "angry", img: IC_ANGRY },
];

const filterReaction = (userReaction: any) => {
  switch (userReaction) {
    case "like":
      return images[0];
    case "heart":
      return images[1];
    case "haha":
      return images[2];
    case "wow":
      return images[3];
    case "sad":
      return images[4];
    case "angry":
      return images[5];
    default:
      return { id: "none", img: IC_REACTION };
  }
};

const Reaction: React.FC<ReactionProps> = (props) => {

  const { userReaction, total_reactions, post_uuid } = props;
  const { colorPallet } = useTheme();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(filterReaction(userReaction));
  const [total_reaction, setTotal_reactions] = useState(total_reactions);
  const [loadingReaction, setLoadingReaction] = useState(false);
  const navigation = useNavigation();

  const change = (i: number) => {
    setOpen(false);
    setUrl(images[i]);
    if (url.id === "none") {
      // @ts-ignore
      setTotal_reactions(total_reaction + 1);
    } else {
      // @ts-ignore
      setTotal_reactions(total_reaction <= 0 ? 0 : total_reaction);
    }
  };

  const openPress = async () => {
    //console.log('url.id', url.id);
    if (url.id !== "none") {
      if (open) {
        setOpen(false);
      } else {
        // const old_reaction = url;
        // const old_total_reaction = total_reaction;
        setUrl({ id: "none", img: IC_REACTION });
        // @ts-ignore
        setTotal_reactions(total_reaction <= 0 ? 0 : total_reaction - 1);
      }
    } else {
      // const old_reaction = url;
      // const old_total_reaction = total_reaction;
      setUrl(images[0]);
      // @ts-ignore
      setTotal_reactions(total_reaction + 1);
    }
  };
  const openLongPress = async () => {
    setOpen(!open);
    hide();
  };
  const hide = () => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewBtnTotal}>
        <PressView
          onLongPress={openLongPress}
          onPress={openPress}
          style={styles.touch}>
          <Image style={styles.imageEmoji} source={url.img} />
          <View style={styles.viewMostEmoji}>
            <AppText
              style={{
                fontFamily: AppFonts.semiBold,
                fontSize: fontSize14,
                color:colorPallet.color_text_blue_3
              }}>
              {total_reaction}
            </AppText>
          </View>
        </PressView>
      </View>
      {
        open && <View
          style={[styles.viewEmoji, {
            flexDirection: "row",
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit60,
            paddingHorizontal: unit12,
            paddingVertical: 6,
            transform: [{ translateX: 0 }, { translateY: -60 }],
          },
            {
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.15,
              shadowRadius: 13,
              elevation: 23,
            }]}
        >
          {images.map((img, i) => {
            return <ReactionItem
              img={img.img}
              onPress={() => change(i)}
              onPressOut={close}
              key={i.toString()}
            />;
          })
          }
        </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row",marginRight: unit24},
  pic: {
    resizeMode: "cover",
    height: unit28,
    width: unit28,
    borderRadius: unit19,
    borderWidth: unit1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageEmoji: {
    height: unit24,
    width: unit24,
  },
  viewEmoji: {
    flexDirection: "row",
    position: "absolute",
  },
  viewMostEmoji: {
    flexDirection: "row",
    marginLeft: unit10,
  },
  viewBtnTotal: {
    flexDirection: "row",
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default memo(Reaction);

interface ReactionItemProps extends PressableProps {
  img: any,
}

const ReactionItem: React.FC<ReactionItemProps> = (props) => {

  const { img } = props;
  return (
    <PressView
      {...props}
    >
      <Image
        style={[styles.pic,
          {
            margin: unit3,
          },
        ]}
        source={img} />
    </PressView>
  );
};
