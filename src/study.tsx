import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function Timer() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("⏰ Interval 실행");
      setCount((c) => c + 1);
    }, 1000);

    return () => {
      console.log("cleanup 🧹 : 이전 타이머 제거");
      clearInterval(id);
    };
  }, []);

  return <div>카운트: {count}</div>;
}

function Study() {
  // useState
  // 리액트에서 가장 기본적인 훅(Hook)이며, 함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다.
  // => 파라미터에는 기본값/초기값을 넣어주고 이 함수가 호출되면 배열을 반환한다.
  // => 반환된 배열의 첫 번째 요소는 상태 값, 두 번째 요소는 상태 값을 설정하는 함수이다.

  const [value, setValue] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("홍길동");

  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value + 1);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // useEffect
  // 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 훅(Hook)이다.
  // 1. 특정 값이 업데이트 될 때만 실행
  // 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어준다.
  useEffect(() => {
    // 해당 컴포넌트가 최초 렌더링 될 때, useEffect가 실행이 되고
    // 선언한 state의 상태 값이 변화할 때도 useEffect가 실행되는 것으로 보아
    // state 즉, 상태 값이 변화하면 해당 컴포넌트는 재렌더링이 된다는 것을 알 수 있다.
    console.log("name이라는 상태 값이 변할 경우에만 수행합니다.");
  }, [name]);

  // 2. 마운트 될 때만 실행
  // 컴포넌트가 화면에 맨 처음 렌더링 될 때(최초 1회)만 실행하려면, 두 번째 파라미터로 빈 배열을 넣어준다.
  useEffect(() => {
    console.log("마운트가 될 때만 수행합니다.");
  }, []);

  // 3. 컴포넌트 언마운트 될 때는 cleanup 실행
  // 언마운트 된 컴포넌트에서 개별적으로 동작하는 로직을 정리하려면, useEffect의 return을 사용한다.
  const [visible, setVisible] = useState<boolean>(true);

  // useMemo (*Vue의 computed 속성과 유사한 기능)
  const [list, setList] = useState<number[]>([]);
  const [number, setNumber] = useState<string>("");

  // const onInsert = () => {
  //   const newList = list.concat(parseInt(number));
  //   setList(newList);
  //   setNumber("");
  // };

  // useMemo를 사용하지 않고 getAverage 함수를 통해 평균값을 바로 구하게 되면,
  // number 상태값이 변할 때마다 렌더링이 되어 getAverage 함수가 실행된다.
  // useMemo를 통해 실행 함수와 감시하고 싶은 값을 배열에 넣어주면, 해당 값이 변할 때만 함수가 동작하면서 렌더링이 된다.
  const getAverage = (numbers: number[]) => {
    console.log("평균 값을 계산 중입니다.");
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, cur) => acc + cur);
    return sum / numbers.length;
  };
  const average = useMemo(() => getAverage(list), [list]);

  // useCallback
  // 만들어 놓았던 함수를 재사용할 수 있어, 주로 렌더링 성능을 최적화해야 하는 상황에서 사용한다.
  // => 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열(의존성 주입)을 넣는다.
  const onInsert = useCallback(() => {
    const newList = list.concat(parseInt(number));
    setList(newList);
    setNumber("");
  }, [number, list]);

  // useRef
  // 함수 컴포넌트에서 ref라는 속성을 쉽게 사용할 수 있도록 도와주는 도구이다.
  // 컴포넌트 내에서 변하지 않는 값을 유지하거나 DOM 요소에 직접 접근할 때 사용하는 훅(Hook)이다.
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <div>
        <h2>useState</h2>
        <p>
          현재 카운터 값은 : <b>{value}</b>
        </p>
        <button onClick={increment}>증가</button>
        <button onClick={decrement}>감소</button>
        <div>
          <input type="text" onChange={onChangeName} />
          <b>이름 : {name}</b>
        </div>
        <div>
          <input type="text" value={nickname} onChange={onChangeNickname} />
          <b>별명 : {nickname}</b>
        </div>
      </div>

      <div>
        <h2>useEffect</h2>
        {visible && <Timer />}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "숨기기" : "보이기"}
        </button>
      </div>

      <div>
        <h2>useMemo</h2>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={onInsert}>등록</button>
        <ul>
          {list.map((item: number, index: number) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
        {/* <b>평균 값: {getAverage(list)}</b> */}
        <b>평균 값: {average}</b>
      </div>

      <div>
        <h2>useRef</h2>
        <input type="text" ref={inputRef} />
        <button onClick={handleClick}>버튼</button>
      </div>
    </>
  );
}

export default Study;
