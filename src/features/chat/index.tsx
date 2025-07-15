import ChatBox from "@/components/chat/ChatBox";
import { Card } from "@/components/ui/card";
import { PageContent } from "@/components/ui/structure";

const Chat = () => {
  return (
    <PageContent
    // hideGradient={true}
    // header={{
    //   title: "Chat",
    // }}
    >
      <Card>
        <ChatBox />
      </Card>
    </PageContent>
  );
};

export default Chat;
