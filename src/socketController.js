import events from "./events";
const socketController = socket => {
    socket.on("setNickname", ({ nickname }) => {
      console.log(nickname);
      socket.nickname = nickname;
    });
  };
  export default socketController;