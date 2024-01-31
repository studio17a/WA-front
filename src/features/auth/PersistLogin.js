import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import LoginModal from "./LoginModal";
import PulseLoader from "react-spinners/PulseLoader";
import UserPanel from "../../components/UserPanel.js";
import TopMenu from "../navigation/TopMenu.js";
import { HStack, VStack, Container, Box, Center } from "@chakra-ui/react";
import PageHeader from "../../components/PageHeader";
import io from "socket.io-client";
import useAuth from "../../hooks/useAuth";

// const ENDPOINT = "http://localhost:3500";

let socket, selectedChatCompare;

const PersistLogin = () => {
  const UserInfo = useAuth();
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  // useEffect(() => {
  //   socket = io("https://tg3vhf-3500.csb.app", {
  //     transports: ["websocket", "polling", "flashsocket"],
  //   });
  //   socket.emit("setup", UserInfo);
  //   socket.emit("join room", "updates");
  //   socket.on("xxx", () => {
  //     console.log("madeit");
  //   });
  //   socket.on("connected", () => setSocketConnected(true));
  // });

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    //persist: yes, token: no
    console.log(`${error?.data?.message} - `);
    content = (
      // <LoginModal open={true} url={window.location.pathname}></LoginModal>
      <Outlet />
      // <p className='errmsg'>
      //     {`${error?.data?.message} - `}
      //     <Link to="/login">Please login again</Link>.
      // </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return (
    <>
      <VStack backgroundColor="#edf9ff">
        <VStack className="pageTop" backgroundColor="#edf9ff">
          <HStack alignContent={"center"} className="topMenuWrapper">
            <TopMenu alignContent={"center"} align="center" />
          </HStack>
          <PageHeader className="pageHeader" />
        </VStack>
        {content}
      </VStack>
    </>
  );
};
export default PersistLogin;
