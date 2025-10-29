import { RequestInfo } from "rwsdk/worker";
import ChatroomCard from "../components/chatroom-card";



export function Home({ ctx }: RequestInfo) {
  return (
    <><h1>Chatrooms</h1>
     <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
      }}>
      <ChatroomCard
      id="1"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />

      <ChatroomCard
      id="2"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />

      <ChatroomCard
      id="3"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />
      <ChatroomCard
      id="4"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />
      <ChatroomCard
      id="5"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />
      <ChatroomCard
      id="6"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />
      <ChatroomCard
      id="7"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />
      <ChatroomCard
      id="8"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />
      <ChatroomCard
      id="9"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />
      <ChatroomCard
      id="10"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />
      <ChatroomCard
      id="11"
      name="The Tavern"
      description="The main chatroom for adventurers!"
      image="/assets/mc.png"
      />

      </div>
      <div>
        <p> Click the card above to enter the chatroom.
        </p>
      </div></>
      
  );
}


