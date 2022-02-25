import React, { Fragment, useEffect, useState } from 'react';
import {
  CommentBox,
  Container,
  Box,
  CounterWrapper,
  MainWrapper,
  ReplyBox,
  ReplayWrapper,
  Divider,
  EditAction,
  ReplyAct,
  InputComment,
  Author,
  EditComment,
} from './element';
import { ReactComponent as Plus } from './assets/icon-plus.svg';
import { ReactComponent as Minus } from './assets/icon-minus.svg';
import { ReactComponent as Reply } from './assets/icon-reply.svg';
import { ReactComponent as Edit } from './assets/icon-edit.svg';
import { ReactComponent as Delete } from './assets/icon-delete.svg';
import Modal from './components/Modal';

interface Comments {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      [key: string]: string;
    };
    username: string;
  };
  isReply: boolean;
  replies: any[];
}

interface User {
  image: {
    [key: string]: string;
  };
  username: string;
}

interface Replies extends Comments {
  replyingTo: string;
  isEditing: false;
}

function App() {
  const [listComments, setListComments] = useState<Comments[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({
    image: {
      png: '',
      webp: '',
    },
    username: '',
  });
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [commentId, setCommentId] = useState(0);
  const [parentIdx, setParentIdx] = useState(0);
  const [replyToUser, setReplyToUser] = useState('');
  const [currentInput, setCurrentInput] = useState('');

  const handleInjectKeys = (params: any) => {
    params.forEach((value: any) => {
      value.isReply = false;
      value.isEditing = false;
      if (value.replies !== undefined && value.replies.length > 0) {
        handleInjectKeys(value.replies);
      }
    });
    return params;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('./data.json');
        const data = await res.json();
        setListComments(handleInjectKeys(data.comments));
        setCurrentUser(data.currentUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCounterScore =
    (
      idx: number,
      operation: string,
      isReply: boolean = false,
      iNested: number = 0
    ) =>
    () => {
      let newComments = [...listComments];
      if (isReply) {
        newComments[idx].replies[iNested].score =
          operation === 'add'
            ? newComments[idx].replies[iNested].score + 1
            : newComments[idx].replies[iNested].score - 1;
      } else {
        newComments[idx].score =
          operation === 'add'
            ? newComments[idx].score + 1
            : newComments[idx].score - 1;
      }
      setListComments(newComments);
    };

  const handleShowModal = (id: number, i: number) => () => {
    setCommentId(id);
    setParentIdx(i);
    setIsModalShow(true);
  };

  const handleCloseModal = () => {
    setCommentId(0);
    setParentIdx(0);
    setIsModalShow(false);
  };

  const handleShowReply = (idx: number, userName: string) => {
    const newComments = [...listComments];
    newComments[idx].isReply = !newComments[idx].isReply;
    setListComments(newComments);
    setReplyToUser(`@${userName} `);
  };

  const handlePushComment = () => {
    if (!inputValue) return null;
    const payload = {
      id: Math.random() * 10,
      content: inputValue,
      createdAt: 'today',
      score: 10,
      user: currentUser,
      replies: [],
      isReply: false,
      isEditing: false,
    };
    setInputValue('');
    const newComments = [...listComments, payload];
    setListComments(newComments);
  };

  const handleDelete = () => {
    const newComments = [...listComments];
    const filteredReplies = newComments[parentIdx].replies.filter(
      (value) => value.id !== commentId
    );
    newComments[parentIdx].replies = filteredReplies;
    setListComments(newComments);
  };

  const handlePushReply = (idx: number, toUser: string) => () => {
    const payload = {
      id: Math.random() * 10,
      content: replyToUser,
      createdAt: 'today',
      score: 9,
      replyingTo: toUser,
      user: currentUser,
      isReply: false,
      isEditing: false,
    };
    const newComments = [...listComments];
    newComments[idx].replies.push(payload);
    newComments[idx].isReply = false;
    setListComments(newComments);
  };

  const handleEditComment = (parentIdx: number, currentIdx: number) => () => {
    const newComments = [...listComments];
    newComments[parentIdx].replies[currentIdx].isEditing =
      !newComments[parentIdx].replies[currentIdx].isEditing;
    setListComments(newComments);
    setCurrentInput(newComments[parentIdx].replies[currentIdx].content);
  };

  const handleChangeUpdated = (parentIdx: number, currentIdx: number) => () => {
    const newComments = [...listComments];
    newComments[parentIdx].replies[currentIdx] = {
      ...newComments[parentIdx].replies[currentIdx],
      content: currentInput,
      isEditing: false,
    };
    setListComments(newComments);
  };

  const renderCommentBox = () => (
    <InputComment>
      <img src={currentUser?.image?.png} alt="user-avatar" />
      <textarea
        placeholder="Add a comment..."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}></textarea>
      <button onClick={handlePushComment}>Send</button>
    </InputComment>
  );

  const renderReplyChat = (idx: number, userName: string) => (
    <InputComment>
      <img src={currentUser?.image?.png} alt="user-avatar" />
      <textarea
        onChange={(e) => setReplyToUser(e.target.value)}
        value={replyToUser}></textarea>
      <button onClick={handlePushReply(idx, userName)}>Send</button>
    </InputComment>
  );

  const renderEditChat = (idx: number, currentIdx: number) => (
    <EditComment>
      <textarea
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}></textarea>
      <div>
        <button onClick={handleChangeUpdated(idx, currentIdx)}>Update</button>
      </div>
    </EditComment>
  );

  const renderReplyBox = (replies: Replies[] | [], idx: number) => (
    <ReplayWrapper>
      <Divider />
      <div>
        {replies.map((value, i) => (
          <ReplyBox key={i}>
            <CounterWrapper>
              <Plus onClick={handleCounterScore(idx, 'add', true, i)} />
              <p>{value.score}</p>
              <Minus onClick={handleCounterScore(idx, 'min', true, i)} />
            </CounterWrapper>
            <MainWrapper>
              <nav>
                <div>
                  <img src={value.user.image.png} alt="avatar" />
                  <h4>{value.user.username}</h4>
                  {value.user.username === currentUser.username && (
                    <Author>you</Author>
                  )}
                  <p>{value.createdAt}</p>
                </div>
                <div>
                  {value.user.username === currentUser.username ? (
                    <EditAction>
                      <div>
                        <Delete />
                        <span onClick={handleShowModal(value.id, idx)}>
                          Delete
                        </span>
                      </div>
                      <div onClick={handleEditComment(idx, i)}>
                        <Edit />
                        <span>Edit</span>
                      </div>
                    </EditAction>
                  ) : (
                    <ReplyAct>
                      <Reply />
                      <h5>Reply</h5>
                    </ReplyAct>
                  )}
                </div>
              </nav>
              {value.isEditing ? (
                renderEditChat(idx, i)
              ) : (
                <p>
                  <span>@{value.replyingTo} </span>
                  {value.content}
                </p>
              )}
            </MainWrapper>
          </ReplyBox>
        ))}
      </div>
    </ReplayWrapper>
  );

  return (
    <Container>
      <Box>
        {listComments.map((value, i) => (
          <Fragment key={i}>
            <CommentBox>
              <CounterWrapper>
                <Plus onClick={handleCounterScore(i, 'add')} />
                <p>{value.score}</p>
                <Minus onClick={handleCounterScore(i, 'min')} />
              </CounterWrapper>
              <MainWrapper>
                <nav>
                  <div>
                    <img src={value.user.image.png} alt="avatar" />
                    <h4>{value.user.username}</h4>
                    {value.user.username === currentUser.username && (
                      <Author>you</Author>
                    )}
                    <p>{value.createdAt}</p>
                  </div>
                  <div onClick={() => handleShowReply(i, value.user.username)}>
                    <Reply />
                    <h5>Reply</h5>
                  </div>
                </nav>
                <p>{value.content}</p>
              </MainWrapper>
            </CommentBox>
            {value.isReply && renderReplyChat(i, value.user.username)}
            {value?.replies?.length > 0 && renderReplyBox(value.replies, i)}
          </Fragment>
        ))}
        {renderCommentBox()}
      </Box>
      <Modal {...{ isModalShow, handleCloseModal, handleDelete }} />
    </Container>
  );
}

export default App;
