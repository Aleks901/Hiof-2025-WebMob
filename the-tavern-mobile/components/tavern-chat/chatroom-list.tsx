import { FlatList, StyleSheet } from "react-native";
import ChatroomCard from "./chatroomCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chatroom } from "../../../packages/types/chat-room";

type Props = {
  chatrooms: Chatroom[];
};

export default function ChatroomList({ chatrooms }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={chatrooms}
      renderItem={({ item }) => <ChatroomCard chatroom={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom }]}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {},
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
});