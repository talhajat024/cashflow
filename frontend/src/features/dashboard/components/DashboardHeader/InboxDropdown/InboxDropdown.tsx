import { useState } from "react";
import type { InboxMessage } from "../../../types/inbox.types";
import { fetchInboxMessages } from "../../../api/inbox.api";
import Dropdown from "../../../../../shared/ui/dropdown/Dropdown";
import {
  messageList,
  messageItem,
  messageHeader,
  messageTitle,
  messageTimestamp,
  messageBody,
} from "./InboxDropdown.styles";

interface InboxDropdownProps {
  trigger: React.ReactNode; // Mail icon from TopBar
}

export default function InboxDropdown({ trigger }: InboxDropdownProps) {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch messages when dropdown opens
  const handleOpen = () => {
    setLoading(true);
    fetchInboxMessages()
      .then(setMessages)
      .finally(() => setLoading(false));
  };

  return (
    <Dropdown trigger={trigger} align="right" onOpen={handleOpen}>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className={messageList()}>
          {messages.map((msg) => (
            <li key={msg.id} className={messageItem({ read: msg.read })}>
              <div className={messageHeader()}>
                <strong className={messageTitle()}>{msg.title}</strong>
                <small className={messageTimestamp()}>{msg.timestamp}</small>
              </div>
              <p className={messageBody()}>{msg.body}</p>
            </li>
          ))}
        </ul>
      )}
    </Dropdown>
  );
}