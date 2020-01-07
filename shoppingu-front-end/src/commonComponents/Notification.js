import React from "react";
import { notification } from "antd";

export default (
  messages,
  description = "",
  duration = 2,
  placement = "topRight"
) => {
  if (Array.isArray(messages) && messages.length) {
    if (messages.length > 1) {
      description = messages.map((message, index) => (
        <code>
          {`${index + 1}. ${message}`}
          {messages.length !== index + 1 && <br />}
        </code>
      ));
      messages = "Notification";
    }
    notification.info({
      message: messages,
      description,
      duration,
      placement
    });
  }
};