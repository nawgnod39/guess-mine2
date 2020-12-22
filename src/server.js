import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);



const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);


  
const server = app.listen(PORT, handleListening);//서버변수를 만든 이유는 socketIO에 전달하기 위해서.

const io = socketIO(server); 

/*io.on("connection", socket => {//이벤트에서 중요한것은 CONNECTION
  //sockets.push(socket.id);//소켓은 Request객체 , express 위에서 보내는 http 요청같은
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anon"//닉네임이 존재하지 않을 경우 anon
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });

});*/
io.on("connection", socket => socketController(socket));