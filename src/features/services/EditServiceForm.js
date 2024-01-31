import { useState, useEffect } from "react";
import {
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "./servicesApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EditServiceForm = ({ service, users }) => {
  const { isManager, isAdmin } = useAuth();

  const [updateService, { isLoading, isSuccess, isError, error }] =
    useUpdateServiceMutation();

  const [
    deleteService,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteServiceMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(service.title);
  const [text, setText] = useState(service.text);
  const [completed, setCompleted] = useState(service.completed);
  const [userId, setUserId] = useState(service.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/services");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveServiceClicked = async (e) => {
    if (canSave) {
      await updateService({
        id: service.id,
        user: userId,
        title,
        text,
        completed,
      });
    }
  };

  const onDeleteServiceClicked = async () => {
    await deleteService({ id: service.id });
  };

  const created = new Date(service.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(service.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteServiceClicked}
      ></button>
    );
  }

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Service #{service.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveServiceClicked}
              disabled={!canSave}
            ></button>
            {deleteButton}
          </div>
        </div>
        <label className="form__label" htmlFor="service-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="service-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="service-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="service-text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="service-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="service-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="service-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="service-username"
              name="username"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditServiceForm;
