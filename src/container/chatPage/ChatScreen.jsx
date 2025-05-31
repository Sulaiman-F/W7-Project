import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import Select from "react-select";
import { FaUserAlt } from "react-icons/fa";
function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const API_MESSAGES = "https://6839bc5c6561b8d882b18134.mockapi.io/Messages";
  const API_USERS = "https://6839bc5c6561b8d882b18134.mockapi.io/Users";
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_USERS)
      .then((res) => setUsers(res.data))
      .catch((err) => setError(`Error fetching users: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    setLoadingChat(true);

    // Function to fetch messages
    const fetchMessages = () => {
      axios
        .get(API_MESSAGES)
        .then((res) => {
          const currentUserId = localStorage.getItem("userId");
          const filtered = res.data.filter(
            (msg) =>
              (msg.senderId === currentUserId &&
                msg.reserverId === selectedUser.id) ||
              (msg.senderId === selectedUser.id &&
                msg.reserverId === currentUserId)
          );
          setMessages(filtered);
        })
        .catch((err) => setError(`Error fetching messages: ${err.message}`))
        .finally(() => setLoadingChat(false));
    };

    // Fetch immediately
    fetchMessages();

    // Set up polling
    const interval = setInterval(fetchMessages, 3000); // every 3 seconds

    // Cleanup on unmount or when selectedUser changes
    return () => clearInterval(interval);
  }, [selectedUser, success]);

  const handleSendMessage = () => {
    if (!selectedUser) {
      setError("Please select a user to chat with");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    if (!inputMessage.trim()) {
      setError("Message cannot be empty");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    setLoadingChat(true);
    const message = {
      reserverId: selectedUser.id,
      senderId: localStorage.getItem("userId"),
      usernameSender: localStorage.getItem("user"),
      usernameReceiver: selectedUser.username,
      message: inputMessage,
    };

    axios
      .post(API_MESSAGES, message)
      .then((res) => {
        setMessages([...messages, res.data]);
        setInputMessage("");
        setSuccess("Message sent successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 1500);
        setInputMessage("");
      })
      .catch((err) => setError(`Error sending message: ${err.message}`))
      .finally(() => setLoadingChat(false));
  };

  const userOptions = users
    .filter((user) => user.username !== localStorage.getItem("user"))
    .map((user) => ({
      value: user.id,
      label: user.username,
    }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="inherit" />
      </div>
    );
  }
  if (!localStorage.getItem("user")) {
    return (
      <div
        className="flex flex-col gap-7 justify-center items-center h-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1040' height='600' preserveAspectRatio='none' viewBox='0 0 1040 600'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1022%26quot%3b)' fill='none'%3e%3crect width='1040' height='600' x='0' y='0' fill='rgba(245%2c 245%2c 245%2c 1)'%3e%3c/rect%3e%3cpath d='M822.96-1.88C720.71 15.05 671.4 262.88 505.69 264.96 339.98 267.04 347.05 189.96 188.42 189.96 29.78 189.96-47.35 264.45-128.85 264.96' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M569.84-96.46C457.44-24.24 521.46 369.31 317.99 374.91 114.53 380.51-52.98 209.11-185.7 206.91' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M612.94-10.69C526.27 14.53 594.48 231.87 373.01 259.13 151.54 286.39 29.13 509.12-106.84 517.13' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M498.59-112.76C399.46-44.15 450.59 315.85 281.09 317.61 111.58 319.37-29.26 79.93-153.92 71.61' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M649.03-77.96C531.69-65.5 495.81 163.33 260 189.32 24.18 215.31-10.56 451.78-129.04 465.32' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1022'%3e%3crect width='1040' height='600' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="text-3xl text-neutral-700">
          Please log in to access the chat.
        </p>
        <button
          className="bg-lime-500 text-white px-4 py-3 w-50 rounded-lg text-2xl hover:bg-lime-600 transition duration-300 cursor-pointer hover:shadow-lg hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {success}
        </Alert>
      )}

      <div className="w-full flex flex-col gap-5 py-5 bg-neutral-100 px-5 md:px-5 lg:px-25">
        <div className="flex items-center justify-between lg:justify-start gap-8 ">
          <h1 className="text-xl md:text-3xl font-semibold  underline underline-offset-4 decoration-lime-500">
            {localStorage.getItem("user")}
          </h1>
          <div className="w-40 md:w-60">
            <h1 className="text-neutral-500 text-sm">Select User</h1>
            <Select
              isDisabled={loadingChat}
              options={userOptions}
              value={
                userOptions.find((u) => u.value === selectedUser?.id) || null
              }
              onChange={(option) =>
                setSelectedUser(users.find((user) => user.id === option.value))
              }
              placeholder="Users"
              className="react-select-container"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "0.75rem",
                  borderColor: "#d1d5db",
                  minHeight: "2.5rem",
                  fontSize: "1rem",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#a3e635"
                    : state.isFocused
                    ? "#f7fee7"
                    : "#fff",
                  color: "#374151",
                  fontSize: "1rem",
                }),
              }}
            />
          </div>
        </div>
        <div
          className="flex-1 flex-col  bg-neutral-800 rounded-lg p-5 "
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='860' preserveAspectRatio='none' viewBox='0 0 1440 860'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1076%26quot%3b)' fill='none'%3e%3crect width='1440' height='860' x='0' y='0' fill='rgba(23%2c 23%2c 23%2c 1)'%3e%3c/rect%3e%3cpath d='M1252.3157913342882 707.3656101932369L1162.247306261886 495.1775565492572 950.0592526179064 585.2460416216593 1040.1277376903085 797.434095265639z' fill='rgba(38%2c 38%2c 38%2c 1)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1444.8607157520482 134.48552713273983L1334.66634354382 65.62844118692902 1265.809257598009 175.82281339515734 1376.0036298062373 244.67989934096815z' fill='rgba(38%2c 38%2c 38%2c 1)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1191.4356999861952 742.5928533446456L1121.1533063559748 568.6378248438577 947.1982778551869 638.9202184740783 1017.4806714854074 812.8752469748661z' fill='rgba(38%2c 38%2c 38%2c 1)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M944.6139178542231 826.912259138017L950.8791931208453 647.498249715837 765.1999084320431 820.6469838713948z' fill='rgba(38%2c 38%2c 38%2c 1)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1085.109854338135 217.5999497327443L1098.062781401221 94.36108090558085 906.7280146289327 136.55112472453362z' fill='rgba(38%2c 38%2c 38%2c 1)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M176.1458354087437 336.4682375706644L325.7412891684272 137.94836532092083 127.22141691868359-11.647088438762694-22.374036840999906 186.87278381098093z' fill='rgba(38%2c 38%2c 38%2c 1)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M295.1129711473976 675.9125310257052L263.06821379155855 537.1114376415984 156.31187776329077 707.9572883815443z' fill='rgba(38%2c 38%2c 38%2c 1)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1135.61 555.8 a283.67 283.67 0 1 0 567.34 0 a283.67 283.67 0 1 0 -567.34 0z' fill='rgba(38%2c 38%2c 38%2c 1)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1076'%3e%3crect width='1440' height='860' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex-1 flex-col overflow-y-auto scrollbar-hide h-[70vh]">
            {loadingChat ? (
              <div className="flex justify-center items-center h-full  text-white">
                <CircularProgress color="inherit" />
              </div>
            ) : selectedUser ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.senderId === localStorage.getItem("userId")
                      ? "flex justify-start"
                      : "flex justify-end"
                  }
                >
                  <div
                    className={
                      msg.senderId === localStorage.getItem("userId")
                        ? "bg-green-900 p-1 px-2 mb-2 rounded-lg  w-fit mr-15  h-fit shadow-lg flex flex-col gap-1 hover:shadow-xl transition-all duration-300"
                        : "bg-neutral-800  p-1 px-2 mb-2 rounded-lg w-fit  ml-15 h-fit shadow-lg flex flex-col gap-1 hover:shadow-xl transition-all duration-300"
                    }
                  >
                    <div className="flex items-center gap-2 w-fit">
                      <FaUserAlt className="text-lg text-neutral-100" />
                      <p className="text-xs md:text-sm lg:text-lg xl:text-lg font-semibold text-neutral-100">
                        {msg.usernameSender}
                      </p>
                    </div>
                    <p className="text-xs md:text-base lg:text-xl xl:text-xl text-wrap w-10/12 text-neutral-100">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-full text-center">
                <p className="text-neutral-100 text-2xl">
                  Select a user to start chatting.
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-2 h-[6vh] md:h-[8vh] mt-2 items-center">
            <input
              type="text"
              className="w-full h-full p-2 border border-neutral-300 text-xs md:text-lg rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={loading}
            />
            <button
              className="bg-green-900 text-white w-32 h-full lg:text-xl rounded-lg cursor-pointer hover:bg-green-950 transition duration-300"
              onClick={handleSendMessage}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatScreen;
