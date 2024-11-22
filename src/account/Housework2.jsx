import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as H from "./styledHousework2";

const tasks = [
  { id: 1, label: "집안 청소", img: "/images/Task1.svg" },
  { id: 2, label: "세탁 및 관리", img: "/images/Task2.svg" },
  { id: 3, label: "요리 및 주방 관리", img: "/images/Task3.svg" },
  { id: 4, label: "정리정돈", img: "/images/Task4.svg" },
  { id: 5, label: "쓰레기 관리 및 분리수거", img: "/images/Task5.svg" },
  { id: 6, label: "육아", img: "/images/Task6.svg" },
  { id: 7, label: "반려동물 관리", img: "/images/Task7.svg" },
  { id: 8, label: "장보기", img: "/images/Task8.svg" },
  { id: 9, label: "화장실 청소", img: "/images/Task9.svg" },
];

export function Housework2() {
  const navigate = useNavigate();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [profileImage, setProfileImage] = useState(""); // 프로필 이미지 상태

  // 프로필 정보 가져오기
  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (storedNickname && storedProfileImage) {
      setNickname(storedNickname);
      setProfileImage(storedProfileImage);
    } else {
      console.error("Profile information is missing");
      alert("프로필 정보가 누락되었습니다. 다시 로그인해주세요.");
      navigate("/"); // 로그인 페이지로 이동
    }
  }, [navigate]);

  const goHousework3 = () => {
    navigate(`/housework3`);
  };

  const toggleTaskSelection = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  return (
    <H.Container>
      <H.ProfileImg>
        <img src={profileImage} alt={`${nickname}'s profile`} />
      </H.ProfileImg>
      <H.Nickname>{nickname}</H.Nickname>

      <H.InfoText>
        어떤 집안일을 <H.HighlightText>좋아하시나요?</H.HighlightText>
      </H.InfoText>

      <H.TasksContainer>
        {tasks.map((task) => (
          <H.TaskButton
            key={task.id}
            onClick={() => toggleTaskSelection(task.id)}
          >
            <H.Overlay isSelected={selectedTasks.includes(task.id)} />
            <H.TaskImage
              src={task.img}
              alt={task.label}
              isSelected={selectedTasks.includes(task.id)} // 선택 여부 전달
            />
            <H.TaskLabel isSelected={selectedTasks.includes(task.id)}>
              {task.label}
            </H.TaskLabel>
          </H.TaskButton>
        ))}
      </H.TasksContainer>

      <H.SkipText>
        좋아하는 집안일을 모르겠어요.
        <span className="skip" onClick={goHousework3}>
          건너뛸래요
        </span>
      </H.SkipText>
      <H.NextBtn onClick={goHousework3} />
    </H.Container>
  );
}

export default Housework2;
