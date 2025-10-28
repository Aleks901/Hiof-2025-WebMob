
import BasicCard from "./basic-card";



type ChatroomCardProps = {
    id: string;
    name: string;
    description: string;
    image?: string
}

export default function ChatroomCard({id, name, description, image }: ChatroomCardProps) {
    return (
    <a
    href={'/chat/${id}'}
    style={{
            textDecoration: "none", 
            color: "inherit",
            cursor: "pointer",
        }}
    >
        <BasicCard
        image={image}
        title={name}
        description={description}
        />
        </a>
    );
}