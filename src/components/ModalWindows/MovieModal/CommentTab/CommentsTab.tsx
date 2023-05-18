import { FC, FormEvent, useState } from "react";
import { IComment } from "/src/types/IComment";
import ModalInput from "/src/UI/ModalInput/ModalInput";
import styles from "./CommentsTab.module.sass";
import CommentsList from "./CommentsList/CommentsList";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "/src/hooks/redux";
import { setShowAuthModal } from "/src/store/slices/modalsSlice";
import { getUserByEmail } from "/src/api/userApi";
import { createComment } from "/src/api/comments";
import { useRouter } from "next/router";

interface CommentsTabProps {
  comments: IComment[];
}

const CommentsTab: FC<CommentsTabProps> = ({ comments }) => {
  const [commentsState, setCommentsState] = useState<IComment[]>(comments);
  const [inputText, setInputText] = useState("");
  const [replyFor, setReplyFor] = useState<IComment | undefined>(undefined);
  const { t } = useTranslation("movie");
  const { userEmail, isLogged } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { query } = useRouter();

  const handleSubmitForm = (event: FormEvent): void => {
    event.preventDefault();

    if (!isLogged) {
      dispatch(setShowAuthModal(true));
      return;
    }

    getUserByEmail(userEmail).then((user) => {
      if (!user) return;

      if (replyFor && !inputText.indexOf("@" + String(replyFor.user.email))) {
        createComment(
          String(query.id),
          user.user_id,
          inputText,
          replyFor.comment_id,
          String(localStorage.getItem("token"))
        ).then((res) => {
          if (!res) return;
          replyFor.sub_comments.push(res);
          setCommentsState(commentsState);
          setInputText("");
        });
      } else {
        createComment(
          String(query.id),
          user.user_id,
          inputText,
          null,
          String(localStorage.getItem("token"))
        ).then((res) => {
          if (!res) return;
          setCommentsState([...commentsState, res]);
          setInputText("");
        });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <ModalInput
          className={styles.input}
          authData={inputText}
          setAuthData={setInputText}
          inputType="text"
          showIcon={false}
          buttonText={t("modal.commentsInput.submit")}
          placeholderText={t("modal.commentsInput.placeholder")}
        />
      </form>
      <CommentsList
        setInputText={setInputText}
        setReplyFor={setReplyFor}
        comments={commentsState}
      />
    </>
  );
};

export default CommentsTab;
