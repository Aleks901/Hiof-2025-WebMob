import { useTheme } from "../lib/useTheme";
import BasicCard from "./basic-card";

type ChatroomCardProps = {
    id: string;
    name: string;
    description: string;
    image?: string
}

export default function ChatroomCard({id, name, description, image }: ChatroomCardProps) {
    return (
        <div style={styles.chatcardContainer}>
    <a href={`/chat/${id}`}>
        
        <BasicCard
        image={image}
        title={name}
        description={description}
        />
        </a>

        
        </div>
    );
}

const theme = useTheme();

const styles: { [key: string]: React.CSSProperties } = {
    chatcardContainer: {
    display: "flex",
    flexDirection: "column",
    width: 180,
    margin: 0,
    padding: 10,
    boxSizing: "border-box",
    borderRadius: 12,
    border: `1px solid ${theme.highlight}`,
    backgroundColor: theme.background,
    boxShadow: `0 4px 10px ${theme.hover}`,
    color: '#ffffff'
  },

  link: {
    textDecoration: "none",
    color: "inherit",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  image: {
    width: "100%",
  },

  title: {

  },

  description: {

  },
};