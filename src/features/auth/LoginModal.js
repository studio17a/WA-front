import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { setLoginModalOpen } from "./loginModalOpenSlice";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";

import {
  FormControl,
  Input,
  useDisclosure,
  FormLabel,
  useToast,
  Box,
  Button,
  Container,
  Spinner,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  Tabs,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NewUserForm from "../users/NewUserForm";

const LoginModal = ({ children, url }) => {
  const loginModalOpen = useSelector(
    (state) => state.loginModalOpen.loginModalOpen,
  );
  useTitle("Employee Login");
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (loginModalOpen == true) {
      onOpen();
    } else {
      // console.log("click2");
      onClose();
    }
  }, [loginModalOpen]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  if (isSuccess) setLoginModalOpen(false);

  const handleSubmit = async (e) => {
    setErrMsg(`"Missing Username or Password": ${username} ${password}`);
    e.preventDefault();
    try {
      const { accessToken } = await login({
        username,
        password,
      }).unwrap();
      setErrMsg(`"2Missing Username or Password": ${accessToken} ${password}`);
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      // navigate("/dash");
      // navigate(0);
    } catch (err) {
      setErrMsg(`"3err": ${err} ${err.message}`);
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <PulseLoader color={"#FFF"} />;
  const closeModal = () => {
    dispatch(setLoginModalOpen(false));
  };
  const content = (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <ModalBody>
            <section className="public">
              <main className="login">
                <Tabs variant="soft-rounded">
                  <TabList mb="1em">
                    <Tab width="50%">Zaloguj</Tab>
                    <Tab width="50%">Utwórz konto</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <FormControl id="username" isRequired>
                        <FormLabel>Nazwa</FormLabel>
                        <Input
                          className="form__input"
                          type="text"
                          id="username"
                          ref={userRef}
                          value={username}
                          onChange={handleUserInput}
                          autoComplete="off"
                          required
                        />
                      </FormControl>

                      <FormControl id="password" isRequired>
                        <FormLabel>Hasło</FormLabel>
                        <Input
                          className="form__input"
                          type="password"
                          id="password"
                          onChange={handlePwdInput}
                          value={password}
                          required
                        />
                      </FormControl>
                      <br />
                      <Button
                        width="100%"
                        colorScheme="blue"
                        onClick={handleSubmit}
                      >
                        Loguj
                      </Button>
                      <div></div>
                    </TabPanel>
                    <TabPanel>
                      <NewUserForm isAdmin={false} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </main>
            </section>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

  return content;
};
export default LoginModal;
