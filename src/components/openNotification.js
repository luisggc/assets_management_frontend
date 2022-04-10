import { notification as notif } from "antd";

const openNotification = (msg, type, title) => {
  //success, info, warning, error
  notif[type]({
    message: title ? title : type.charAt(0).toUpperCase() + type.slice(1),
    description: msg,
    placement: "bottomRight",
    duration: 5,
  });
};

export default openNotification;
