import { getFirestore, onSnapshot, query, collection, where, addDoc } from "firebase/firestore"
import React, { useCallback, useEffect, useRef, useState } from 'react'

const JOB_ID = "testPurposeJob"
const MESSAGES_COLLECTION_NAME = "messages"
const CONVERSATIONS_COLLECTION_NAME = "conversations"
const CONVERSATIONS_JOB_FIELD_NAME = "job"
const CONVERSATIONS_COMPANY_FIELD_NAME = "startup"
const MESSAGES_CONVERSATION_FIELD_NAME = "conversationId"
const MESSAGES_TEXT_FIELD_NAME = "text"

export const Conversation = () => {
  const [conversation, setConversation] = useState();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const db = getFirestore();
    const conversationsRef = collection(db, CONVERSATIONS_COLLECTION_NAME);
    const q = query(conversationsRef, where(CONVERSATIONS_JOB_FIELD_NAME, "==", JOB_ID), where(CONVERSATIONS_COMPANY_FIELD_NAME, "==", process.env.REACT_APP_COMPANY_ID))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length === 0) {
        setConversation(undefined);
      } else {
        setConversation({
          id: snapshot.docs[0].id,
          data: snapshot.docs[0].data(),
        });
      }
    })
    return unsubscribe;
  }, [])

  useEffect(() => {
    if (!conversation) {
      return;
    }
    const db = getFirestore();
    const messagesRef = collection(db, MESSAGES_COLLECTION_NAME);
    const q = query(messagesRef, where(MESSAGES_CONVERSATION_FIELD_NAME, "==", conversation.id))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const result = {};
      for (const message of snapshot.docs) {
        result[message.id] = message.data()
      }
      setMessages(result);
    })
    return unsubscribe;
  }, [conversation])

  const createConversation = useCallback(() => {
    const db = getFirestore();
    return addDoc(collection(db, CONVERSATIONS_COLLECTION_NAME), {
      [CONVERSATIONS_JOB_FIELD_NAME]: JOB_ID,
      [CONVERSATIONS_COMPANY_FIELD_NAME]: process.env.REACT_APP_COMPANY_ID
    })
  }, [])

  const sendMessage = useCallback(async (text) => {
    const db = getFirestore()
    let localConversation = conversation
    if (!localConversation) {
      localConversation = await createConversation()
    }
    addDoc(collection(db, MESSAGES_COLLECTION_NAME), {
      [MESSAGES_CONVERSATION_FIELD_NAME]: localConversation.id,
      [MESSAGES_TEXT_FIELD_NAME]: text
    })
  }, [conversation, createConversation])

  const inputRef = useRef()

  return (
    <div>
      Conversation id: {conversation ? conversation.id : "N/A"}
      <br />
      <button onClick={createConversation}>Create conversation</button>
      <br />
      <input ref={inputRef} type="text" />
      <button onClick={() => sendMessage(inputRef.current.value)}>Send</button>
      <br />
      Messages:
      <br />
      {Object.keys(messages).map((key) => (
        <React.Fragment key={key}>
          <div>{messages[key][MESSAGES_TEXT_FIELD_NAME]}</div>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
