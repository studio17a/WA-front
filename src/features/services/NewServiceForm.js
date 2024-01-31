import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleServiceMutation } from "./servicesApiSlice";
import {
  Box,
  Button,
  Container,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const NewServiceForm = ({ users }) => {
  const [addNewService, { isLoading, isSuccess, isError, error }] =
    useHandleServiceMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/services");
    }
  }, [isSuccess, navigate]);

  const [tabIndex, setTabIndex] = useState(0);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveServiceClicked = async (e) => {
    setTabIndex(1);
    e.preventDefault();
    if (canSave) {
      await addNewService({ user: userId, title, text });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <Container maxW="400px" centerContent>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <form onSubmit={onSaveServiceClicked}>
            <Tabs index={tabIndex} variant="soft-rounded">
              <TabList mb="1em">
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel></TabPanel>
                <TabPanel>
                  <Select
                    variant="filled"
                    placeholder="Filled"
                    value={userId}
                    onChange={onUserIdChanged}
                  >
                    {options}
                  </Select>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            ></Button>
            <label className="form__label" htmlFor="title">
              Title:
            </label>
            <input
              className={`form__input ${validTitleClass}`}
              id="title"
              name="title"
              type="text"
              autoComplete="off"
              value={title}
              onChange={onTitleChanged}
            />

            <label className="form__label" htmlFor="text">
              Text:
            </label>
            <textarea
              className={`form__input form__input--text ${validTextClass}`}
              id="text"
              name="text"
              value={text}
              onChange={onTextChanged}
            />

            <label
              className="form__label form__checkbox-container"
              htmlFor="username"
            >
              ASSIGNED TO:
            </label>
          </form>
        </Box>
      </Container>
    </>
  );

  return content;
};

export default NewServiceForm;
