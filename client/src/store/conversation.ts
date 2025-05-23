import { create } from "zustand";

export type ConversationType = {
	id: string;
	fullname: string;
	profilePicture: string;
};

export type MessagesType = {
	id: string;
	body: string;
	senderId: string;
	createdAt: Date;
	isPending?: boolean;
};

type ConversationState = {
	isSending: boolean;
	selectedConversation: ConversationType | null;
	messages: MessagesType[];
};

type ConversationAction = {
	setIsSending: (isSending: boolean) => void;
	setMessages: (messages: MessagesType[]) => void;
	addMessages: (messages: MessagesType) => void;
	setSelectedConversation: (conversation: ConversationType | null) => void;
};

const useConversation = create<ConversationState & ConversationAction>(set => ({
	selectedConversation: null,
	setSelectedConversation: conversation =>
		set({ selectedConversation: conversation }),
	messages: [],
	setMessages: messages => set({ messages: messages }),
	addMessages: newMessages =>
		set(prev => {
			return { messages: [...prev.messages, newMessages] };
		}),
	isSending: false,
	setIsSending: isSending => set({ isSending: isSending }),
}));

export default useConversation;
