import { notification } from "antd";

export default position => {
  notification.info({
    message: `Notification ${position}`,
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    position
  });
};
