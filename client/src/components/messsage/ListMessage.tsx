import { DUMMY_MESSAGES } from "../../dummy_data/dummy";
import Message from "./Message";

export default function ListMessage() {
   return (
      <div className="flex flex-col gap-1">
         {DUMMY_MESSAGES.map((message, i) => (
            <Message message={message} key={i} />
         ))}
      </div>
   );
}
